#!/usr/bin/env python3
"""Semantic validator for Cadmus-clone PageSpecs: everything JSON Schema cannot express.

    python3 schema/semantic_validate.py <pagespec.json> [...] [--json]

Layers (in order):
  1. Draft-07 schema (schema/pagespec.schema.json) when `jsonschema` is importable (else a warning; the rest still runs).
  2. Registry pins: asset-role availability and the policy of compliance-critical roles, forbidden-in-all-modes roles,
     retrieval eligibility and the hero-less template list are pinned in THIS file; a registry/contract/allowlist edit
     that loosens them is an error.
  3. Template linkage + compatibility/graph.json rules (GRAPH_RULES_IMPLEMENTED): the node sequence is matched against
     the DECLARED template's real node list (reference-only nodes dropped in generated mode), plus shell order, hero,
     overlay, adjacency, scheme and route rules.
  4. Contract rules: variants, required/forbidden fields, list sizes, maxWords/maxChars, motion, style tokens, asset and
     link roles.
  5. Mode rules: generated mode may contain nothing that identifies or reproduces the source (GENERATED_MODE_* rules;
     every string is NFKC-normalised, stripped of zero-width characters, curly quotes straightened and whitespace
     collapsed first); live form endpoints are rejected in every mode.
Detection is STRING-BASED: a paraphrase, a translation, a homoglyph that survives NFKC or text inside an image passes.

Stdlib only (jsonschema optional). The repo root is derived from this file's location.
"""
import hashlib, json, re, sys, unicodedata
from pathlib import Path

sys.dont_write_bytecode = True
REPO = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------------ pins (independent of the registries)
PINNED_AVAILABILITY = {
    "brand.wordmark": "reference-only", "product.screenshot": "reference-only", "icon.source": "reference-only", "illustration.source": "reference-only",
    "customer.logo": "blocked-for-generation", "partner.logo": "blocked-for-generation", "person.photo": "blocked-for-generation",
    "photo.source-scene": "blocked-for-generation", "media.third-party-embed": "blocked-for-generation",
    "brand.placeholder-mark": "generation-safe", "brand.user-supplied-mark": "generation-safe", "customer.placeholder-logo": "generation-safe",
    "partner.placeholder-icon": "generation-safe", "person.fictional-avatar": "generation-safe", "rating.placeholder": "generation-safe",
    "product.generated-visual": "generation-safe", "photo.generated-scene": "generation-safe", "illustration.generated": "generation-safe",
    "video.placeholder-poster": "generation-safe", "icon.generic": "generation-safe",
    "link.site-route": "reference-only", "link.source-external": "blocked-for-generation", "link.live-endpoint": "blocked-for-generation", "link.placeholder": "generation-safe",
    "copy.source-verbatim": "blocked-for-generation", "copy.clone-stand-in": "reference-only", "copy.neutral-placeholder": "reference-only", "copy.original": "generation-safe",
}
PINNED_POLICY = {
    "customer.logo": "must-not-fabricate", "partner.logo": "must-not-fabricate", "person.photo": "must-not-fabricate", "photo.source-scene": "must-not-fabricate",
    "link.live-endpoint": "must-not-reuse-live-endpoint", "link.source-external": "must-not-reproduce", "copy.source-verbatim": "must-not-reproduce",
    "brand.wordmark": "reference-evidence-only", "media.third-party-embed": "reference-evidence-only",
}
PINNED_FORBIDDEN_ALL_MODES = {"link.live-endpoint"}
RETRIEVAL_INELIGIBLE = {"listing.study-popup", "utility.not-built"}
RUNTIME_UI_HINT = re.compile(r"(cookie|consent|modal|dialog|drawer|overlay|preloader|cursor|ticker|toast|popover|lightbox|popup|panel|not-found|not-built|exit-intent)", re.I)
HEROLESS_TEMPLATES = {"template.video-detail", "template.not-built-fallback"}
HOME_TEMPLATE = "template.home"
FALLBACK_TEMPLATE = "template.not-built-fallback"
HEAD, FOOT = "shell.header", "shell.footer"
AUTOPLAY = {"marquee.loop", "carousel.fade-autoplay", "media.loop-video", "timeline.loop"}
SCHEME_SECTIONS = {"hero.product-split", "proof.study-preview", "proof.quote-carousel", "conversion.cta-band"}
SCHEMES = {"lavender", "pink", "blue", "green", "yellow", "maroon", "brand"}
GRAPH_RULES_IMPLEMENTED = {"TEMPLATE_SEQUENCE", "FALLBACK_NOT_INSTANTIABLE", "SHELL_ORDER", "ONE_HERO", "HERO_FIRST_CONTENT", "SECTION_MAX_PER_PAGE", "NO_ADJACENT_IDENTICAL",
                           "OVERLAY_LAST", "HOME_ROUTE_ONLY", "REFERENCE_ROUTE_IN_TEMPLATE", "REFERENCE_ONLY_NODE", "RUNTIME_UI_INELIGIBLE", "SCHEME_CONSISTENT", "AUTOPLAY_BUDGET"}
GENERATED_MODE_RULES = ["GENERATED_MODE_BRAND", "GENERATED_MODE_CTA", "GENERATED_MODE_COPY", "GENERATED_MODE_URL", "GENERATED_MODE_ASSET",
                        "GENERATED_MODE_PERSON", "GENERATED_MODE_RATING", "GENERATED_MODE_STORE"]
GENERATED_REF = re.compile(r"^(generate:[a-z0-9-]+|user-supplied:[a-z0-9-]+|https://([a-z0-9-]+\.)+(example|invalid)(/\S*)?)$")
RESERVED_URL = re.compile(r"^https://([a-z0-9-]+\.)*[a-z0-9-]+\.(example|invalid)(/\S*)?$")
ZERO_WIDTH = re.compile("[​-‏⁠﻿]")


def _load(rel):
    return json.loads((REPO / rel).read_text())


def load_repo():
    """Everything the validator reads, as one dict (tests deep-copy and mutate it)."""
    return {
        "schema": _load("schema/pagespec.schema.json"),
        "contracts": {p.stem: json.loads(p.read_text()) for p in sorted((REPO / "sections").glob("*.json"))},
        "templates": _load("templates/templates.json")["templates"],
        "routes": _load("templates/routes.json"),
        "graph": _load("compatibility/graph.json"),
        "roles": _load("assets/asset-roles.json"),
        "brand": _load("schema/source-brand.json"),
        "hashes": _load("schema/source-identity-hashes.json"),
        "catalog": _load("tokens/llm/token-catalog.json")["tokens"],
        "policy": _load("tokens/llm/token-policy.json"),
        "allowlist": _load("tokens/llm/component-allowlist.json"),
        "motion": _load("tokens/00-foundation/motion-patterns.json")["patterns"],
    }


# ------------------------------------------------------------------ helpers
def leaves(v, path=""):
    if isinstance(v, dict):
        for k, x in v.items():
            yield from leaves(x, f"{path}.{k}" if path else k)
    elif isinstance(v, list):
        for x in v:
            yield from leaves(x, path + "[]")
    else:
        yield path, path.split(".")[-1].replace("[]", ""), v


def nwords(s):
    return len(re.findall(r"\S+", s))


def norm_text(s):
    """NFKC, zero-width removal, straight quotes, collapsed whitespace (applied before every pattern and hash)."""
    s = unicodedata.normalize("NFKC", s)
    s = ZERO_WIDTH.sub("", s)
    s = s.replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s)


def norm_words(s):
    return re.findall(r"[a-z0-9']+", norm_text(s).lower())


def h16(s):
    return hashlib.sha1(s.encode()).hexdigest()[:16]


def windows(s, kmax=4):
    w = norm_words(s)
    for i in range(len(w)):
        for k in range(1, kmax + 1):
            if i + k <= len(w):
                yield h16(" ".join(w[i:i + k]))


def host_of(url):
    m = re.match(r"^https?://([^/:?#]+)", url)
    if not m:
        return None
    h = m.group(1).lower()
    return h[4:] if h.startswith("www.") else h


def node_pattern(n, mode="reference"):
    v = "|".join(re.escape(x) for x in n.get("variants") or []) or r"[a-z0-9-]+"
    body = rf"(?:{re.escape(n['section'])}#(?:{v});)"
    if n.get("repeatable"):
        lo = n.get("minCount", 1) if n["required"] else 0
        if mode == "reference" and "referenceMinCount" in n:
            lo = n["referenceMinCount"]
        return body + "{%d,%d}" % (lo, n.get("maxCount", 99))
    return body if n["required"] else body + "?"


def registry_pin_errors(repo):
    errs = []
    roles = repo["roles"]["roles"]
    for rid, av in PINNED_AVAILABILITY.items():
        if rid not in roles:
            errs.append(("REGISTRY_PIN_MISMATCH", f"pinned role {rid} missing from assets/asset-roles.json"))
        elif roles[rid].get("availability") != av:
            errs.append(("REGISTRY_PIN_MISMATCH", f"role {rid}: registry availability {roles[rid].get('availability')!r} != pinned {av!r}"))
    for rid in roles:
        if rid not in PINNED_AVAILABILITY:
            errs.append(("REGISTRY_PIN_MISMATCH", f"role {rid} is not pinned in code"))
    for rid, pol in PINNED_POLICY.items():
        if roles.get(rid, {}).get("generationPolicy") != pol:
            errs.append(("REGISTRY_PIN_MISMATCH", f"role {rid}: generationPolicy {roles.get(rid, {}).get('generationPolicy')!r} != pinned {pol!r}"))
    if roles.get("brand.wordmark", {}).get("generationPolicy") == "must-reuse-exact":
        errs.append(("REGISTRY_PIN_MISMATCH", "the source wordmark may never be must-reuse-exact"))
    forb = {r for r, d in roles.items() if d.get("forbiddenInAllModes")}
    if forb != PINNED_FORBIDDEN_ALL_MODES or set(repo["roles"].get("forbiddenInAllModes", [])) != PINNED_FORBIDDEN_ALL_MODES:
        errs.append(("REGISTRY_PIN_MISMATCH", f"forbiddenInAllModes drift: registry {sorted(forb)} vs pinned {sorted(PINNED_FORBIDDEN_ALL_MODES)}"))
    for sid, c in repo["contracts"].items():
        want = sid not in RETRIEVAL_INELIGIBLE
        if c.get("retrievalEligible") is not want:
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"contract {sid}: retrievalEligible {c.get('retrievalEligible')} != pinned {want}"))
        if RUNTIME_UI_HINT.search(sid + " " + c.get("title", "")) and sid not in RETRIEVAL_INELIGIBLE:
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"contract {sid} looks like runtime/utility UI but is not in RETRIEVAL_INELIGIBLE"))
        for g in c.get("generatedAssetRoles", []):
            if PINNED_AVAILABILITY.get(g) != "generation-safe":
                errs.append(("REGISTRY_PIN_MISMATCH", f"contract {sid}: generatedAssetRoles has non-generation-safe {g}"))
    for e in repo["allowlist"]["entries"]:
        if e["kind"] == "section" and e.get("retrievalEligible") is not (e["id"] not in RETRIEVAL_INELIGIBLE):
            errs.append(("RETRIEVAL_PIN_MISMATCH", f"allowlist {e['id']}: retrievalEligible {e.get('retrievalEligible')} contradicts the pin"))
    return errs


_RX = {}


def compile_brand(b):
    j = lambda pats: re.compile("|".join(f"(?:{p})" for p in pats), re.I)
    return {"brand": j(b["sourceBrand"]["patterns"]), "domain": j(b["sourceDomains"]["patterns"]), "store": j(b["storeAndMarketplace"]["patterns"]),
            "rating": j(b["rating"]["patterns"]), "endpoint": j(b["liveEndpoints"]["patterns"]), "embed": j(b["thirdPartyEmbeds"]["patterns"]),
            "verbs": set(b["cta"]["verbs"])}


# ------------------------------------------------------------------ main entry
def validate(spec, repo=None, use_schema=True):
    """returns (errors, warnings): lists of (RULE_ID, message)."""
    repo = repo or load_repo()
    E, W = [], []
    err = lambda r, m: E.append((r, m))
    warn = lambda r, m: W.append((r, m))

    # 1. schema
    if use_schema:
        try:
            from jsonschema import Draft7Validator
            for e in sorted(Draft7Validator(repo["schema"]).iter_errors(spec), key=lambda e: list(e.path)):
                err("SCHEMA", f"{'/'.join(str(p) for p in e.path) or '<root>'}: {e.message[:200]}")
        except ImportError:
            warn("SCHEMA_SKIPPED", "jsonschema not installed; Draft-07 layer skipped (pip install jsonschema)")
    if not isinstance(spec, dict) or not isinstance(spec.get("nodes"), list):
        err("SCHEMA", "spec must be an object with a nodes array")
        return E, W

    # 2. pins
    E.extend(registry_pin_errors(repo))
    contracts, templates, roles = repo["contracts"], repo["templates"], repo["roles"]["roles"]
    mode = spec.get("mode")
    if mode not in ("reference", "generated"):
        err("MODE", f"mode must be 'reference' or 'generated', got {mode!r}")
    if spec.get("theme") not in repo["policy"]["themes"]:
        err("THEME_UNSUPPORTED", f"theme {spec.get('theme')!r} not in token-policy themes {repo['policy']['themes']}")
    cr = spec.get("copyRole")
    if cr == "copy.source-verbatim":
        err("COPY_ROLE", "copy.source-verbatim is never stored or reproduced in this repo (any mode)")
    if mode == "generated" and cr != "copy.original":
        err("GENERATED_MODE_COPY", f"generated pages must declare copyRole copy.original, got {cr!r}")
    nodes = [n for n in spec["nodes"] if isinstance(n, dict)]
    for i, n in enumerate(nodes):
        if n.get("section") not in contracts:
            err("UNKNOWN_SECTION", f"node {i}: section {n.get('section')!r} has no contract")
    nodes = [n for n in nodes if n.get("section") in contracts]
    cat = lambda n: contracts[n["section"]]["semantic"]["category"]
    place = lambda n: contracts[n["section"]]["placement"]
    ids = [n["section"] for n in nodes]

    # 3. template linkage + graph rules
    tid, route = spec.get("template"), spec.get("route")
    t = templates.get(tid)
    if t is None:
        err("TEMPLATE_SEQUENCE", f"unknown template {tid!r}")
    else:
        if tid == FALLBACK_TEMPLATE or not t.get("instantiable", True):
            err("FALLBACK_NOT_INSTANTIABLE", f"{tid} documents the router catch-all state and may not be declared by a PageSpec")
        elif mode == "generated" and not t.get("generatedModeAllowed", True):
            err("TEMPLATE_SEQUENCE", f"{tid} is not generation-allowed")
        seq = "".join(f"{n['section']}#{n.get('variant')};" for n in nodes)
        tn = [n for n in t["nodes"] if not (mode == "generated" and n.get("modes") == ["reference"])]
        if not re.fullmatch("".join(node_pattern(x, mode) for x in tn), seq):
            err("TEMPLATE_SEQUENCE", f"node sequence does not match template {tid} ({t['name']}). got: {[n['section'] + '#' + str(n.get('variant')) for n in nodes]}")
        if mode == "generated":
            for n in t["nodes"]:
                if n.get("modes") == ["reference"] and n["section"] in ids:
                    err("REFERENCE_ONLY_NODE", f"{n['section']} is a reference-only node and may not appear in a generated page")
    if mode == "reference" and t is not None:
        rmap = {r["path"]: r for r in repo["routes"]["routes"]}
        r = rmap.get(route)
        if r is None:
            err("REFERENCE_ROUTE_IN_TEMPLATE", f"reference route {route!r} is not a served route in templates/routes.json")
        elif r["template"] != tid:
            err("REFERENCE_ROUTE_IN_TEMPLATE", f"route {route!r} is mapped to {r['template']} in templates/routes.json, not {tid}")
    if (tid == HOME_TEMPLATE) != (route == "/"):
        err("HOME_ROUTE_ONLY", f"{HOME_TEMPLATE} is only valid on '/', and '/' only on it (got {tid} on {route})")
    if not ids or ids[0] != HEAD:
        err("SHELL_ORDER", f"the page must open with {HEAD}; got {ids[:2]}")
    if FOOT in ids:
        j = ids.index(FOOT)
        tail_bad = [s for s in ids[j + 1:] if place({"section": s}) != "overlay"]
        if tail_bad:
            err("SHELL_ORDER", f"only overlays may follow the footer; found {tail_bad}")
        if ids.count(FOOT) > 1:
            err("SHELL_ORDER", "more than one footer")
    else:
        err("SHELL_ORDER", "the page has no shell.footer")
    seen_overlay = False
    for n in nodes:
        if place(n) == "overlay":
            seen_overlay = True
        elif seen_overlay and n["section"] != FOOT:
            err("OVERLAY_LAST", f"{n['section']} follows an overlay node; only the footer or other overlays may")
            break
    heroes = [i for i, n in enumerate(nodes) if cat(n) == "HERO"]
    if tid in HEROLESS_TEMPLATES:
        if heroes:
            err("ONE_HERO", f"{tid} is a hero-less template but has a HERO node")
    elif len(heroes) != 1:
        err("ONE_HERO", f"expected exactly one HERO node on {tid}, found {len(heroes)}")
    content_nodes = [n for n in nodes if cat(n) != "SHELL" and place(n) != "overlay"]
    allowed_before = set(repo["graph"].get("heroAllowedBefore", []))
    if heroes and tid not in HEROLESS_TEMPLATES and nodes[heroes[0]] in content_nodes:
        pre = [n["section"] for n in content_nodes[:content_nodes.index(nodes[heroes[0]])]]
        if any(s not in allowed_before for s in pre):
            err("HERO_FIRST_CONTENT", f"content before the hero: {pre}")
    counts = {}
    for n in nodes:
        counts[n["section"]] = counts.get(n["section"], 0) + 1
    for sid, k in counts.items():
        if k > contracts[sid]["constraints"]["maxPerPage"]:
            err("SECTION_MAX_PER_PAGE", f"{sid} appears {k} times (maxPerPage {contracts[sid]['constraints']['maxPerPage']})")
    for a, b in zip(nodes, nodes[1:]):
        if (a["section"], a.get("variant")) == (b["section"], b.get("variant")) and a.get("variant") not in contracts[a["section"]]["constraints"]["consecutiveVariants"]:
            err("NO_ADJACENT_IDENTICAL", f"adjacent identical nodes {a['section']}#{a.get('variant')}")
    schemes = {n.get("variant") for n in nodes if n["section"] in SCHEME_SECTIONS and n.get("variant") in SCHEMES}
    if len(schemes) > 1:
        err("SCHEME_CONSISTENT", f"scheme-coloured sections mix schemes {sorted(schemes)}; one page uses one scheme")
    budget = next((r.get("max") for r in repo["graph"]["rules"] if r["id"] == "AUTOPLAY_BUDGET"), 99)
    auto = [n["section"] for n in nodes if ({(n.get("motion") or {}).get("pattern")} | {x.get("pattern") for x in (n.get("motion") or {}).get("additional", [])}) & AUTOPLAY]
    if len(auto) > budget:
        warn("AUTOPLAY_BUDGET", f"{len(auto)} autoplaying sections (> {budget}): {auto}")

    # 4. per-node contract rules
    catalog, policy = repo["catalog"], repo["policy"]
    for i, n in enumerate(nodes):
        sid, c = n["section"], contracts[n["section"]]
        where = f"node {i} ({sid})"
        content = n.get("content") or {}
        if "retrievalEligible" in n and n["retrievalEligible"] is not (sid not in RETRIEVAL_INELIGIBLE):
            err("RUNTIME_UI_INELIGIBLE", f"{where}: retrievalEligible {n['retrievalEligible']} contradicts the pinned value {sid not in RETRIEVAL_INELIGIBLE}")
        v = n.get("variant")
        vd = c["variants"].get(v)
        if vd is None:
            err("VARIANT_UNKNOWN", f"{where}: variant {v!r} not in {sorted(c['variants'])}")
        else:
            for f in vd["requiredFields"]:
                if f not in content:
                    err("VARIANT_REQUIRED_FIELD", f"{where}: variant {v} requires content.{f}")
            for f in vd["forbiddenFields"]:
                if f in content:
                    err("VARIANT_FORBIDDEN_FIELD", f"{where}: variant {v} never renders content.{f}")
        for f in c["content"]["requiredFields"]:
            if f not in content:
                err("CONTENT_REQUIRED_FIELD", f"{where}: content.{f} is required")
        for lk, (lo, hi) in c["content"]["listSizes"].items():
            if lk in content and isinstance(content[lk], list) and not lo <= len(content[lk]) <= hi:
                err("LIST_SIZE", f"{where}: content.{lk} takes {lo}-{hi} items (observed range), got {len(content[lk])}")
        fields = c["content"]["fields"]
        for path, key, val in leaves(content):
            if key in ("ref", "assetRole", "href", "linkRole") or not isinstance(val, str):
                continue
            fd = fields.get(path)
            if fd is None:
                err("CONTENT_FIELD_UNKNOWN", f"{where}: content.{path} is not a contract field")
                continue
            if nwords(val) > fd["maxWords"]:
                err("MAX_WORDS", f"{where}: content.{path} has {nwords(val)} words (maxWords {fd['maxWords']})")
            if len(val) > fd["maxChars"]:
                err("MAX_CHARS", f"{where}: content.{path} has {len(val)} chars (maxChars {fd['maxChars']})")
        m = n.get("motion") or {}
        pats = [m.get("pattern")] + [x.get("pattern") for x in m.get("additional", [])]
        for p in pats:
            if p not in c["motion"]["allowedPatterns"]:
                err("MOTION_PATTERN_NOT_ALLOWED", f"{where}: motion {p!r} not allowed (allowed {c['motion']['allowedPatterns']})")
        for p in c["motion"]["requiredPatterns"]:
            if p not in pats:
                err("MOTION_REQUIRED_PATTERN", f"{where}: motion must include {p}")
        for entry in [m] + list(m.get("additional", [])):
            p = entry.get("pattern")
            if p in repo["motion"] and entry.get("reducedMotionFallback") != repo["motion"][p]["reducedMotionFallback"]:
                err("MOTION_FALLBACK", f"{where}: {p} requires reducedMotionFallback {repo['motion'][p]['reducedMotionFallback']!r}")
        for prop, val in (n.get("style") or {}).items():
            sp = c["style"]["props"].get(prop)
            pol = policy["styleProps"].get(prop)
            sval = str(val)
            if sp is None or pol is None:
                err("STYLE_PROP_UNKNOWN", f"{where}: style.{prop} is not a settable style prop for {sid}")
                continue
            if re.search(r"#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklab|oklch|color-mix)\(", sval):
                err("TOKEN_RAW_COLOR", f"{where}: style.{prop}={sval!r} is a raw colour; use a catalog token")
            elif re.search(r"^-?[0-9.]+(px|rem|em|%|vw|vh|svh|dvh)$", sval.strip()):
                err("TOKEN_ARBITRARY_SPACING", f"{where}: style.{prop}={sval!r} is a raw length; use a catalog token")
            elif any(fn.lower() in sval.lower() for fn in policy["unsupportedFonts"]) or (sval.startswith("font.family.") and sval not in catalog) or "'" in sval or '"' in sval:
                err("TOKEN_UNSUPPORTED_FONT", f"{where}: style.{prop}={sval!r} names an unsupported font or font token")
            elif sval not in catalog:
                err("TOKEN_UNKNOWN", f"{where}: style.{prop}={sval!r} is not in tokens/llm/token-catalog.json")
            elif catalog[sval]["category"] not in pol["categories"] or sval not in pol["allowedBySection"].get(sid, []) or sval not in sp["allowed"]:
                err("TOKEN_INVALID_COMBINATION", f"{where}: style.{prop}={sval!r} (category {catalog[sval]['category']}) not allowed for {sid} on theme {spec.get('theme')!r}; allowed {pol['allowedBySection'].get(sid)}")
        afd = c["assets"]["fields"].get("media[]")
        for k, a in enumerate(content.get("media", []) if isinstance(content.get("media"), list) else []):
            role = a.get("assetRole")
            if role not in roles:
                err("ASSET_ROLE_UNKNOWN", f"{where}: media[{k}] role {role!r} not in assets/asset-roles.json")
                continue
            if role in PINNED_FORBIDDEN_ALL_MODES:
                err("ASSET_FORBIDDEN_ALL_MODES", f"{where}: media[{k}] uses {role}, forbidden in every mode")
            if afd is None or role not in set(afd["referenceRoles"]) | set(afd["generatedRoles"]):
                err("ASSET_ROLE_NOT_ALLOWED_FOR_FIELD", f"{where}: media[{k}] role {role} not allowed here ({sorted(set(afd['referenceRoles']) | set(afd['generatedRoles'])) if afd else 'no media field'})")
            if mode == "generated":
                if PINNED_AVAILABILITY.get(role) != "generation-safe":
                    rule = "GENERATED_MODE_PERSON" if role == "person.photo" else "GENERATED_MODE_ASSET"
                    err(rule, f"{where}: media[{k}] uses {role} ({PINNED_AVAILABILITY.get(role)}); use one of {roles[role].get('generationSafeSubstitutes')}")
                if not GENERATED_REF.match(str(a.get("ref", ""))):
                    err("GENERATED_MODE_ASSET", f"{where}: media[{k}].ref {a.get('ref')!r} reuses a source file or URL; use generate:/user-supplied:/https://*.example")
        for k, a in enumerate(content.get("actions", []) if isinstance(content.get("actions"), list) else []):
            lr, href = a.get("linkRole"), str(a.get("href", ""))
            if lr in PINNED_FORBIDDEN_ALL_MODES:
                err("LIVE_ENDPOINT_ALL_MODES", f"{where}: actions[{k}] linkRole {lr} is forbidden in every mode")
            if mode == "generated" and PINNED_AVAILABILITY.get(lr) != "generation-safe":
                err("GENERATED_MODE_URL", f"{where}: actions[{k}] linkRole {lr} is not generation-safe (use link.placeholder)")
            if mode == "reference":
                want = "link.site-route" if href.startswith(("/", "#")) else None
                if want and lr != want:
                    err("LINK_ROLE_MISMATCH", f"{where}: actions[{k}] href {href!r} is a site route/anchor but linkRole is {lr}")
                if not want and lr == "link.site-route":
                    err("LINK_ROLE_MISMATCH", f"{where}: actions[{k}] absolute href {href!r} cannot be link.site-route")

    # 5. identity / leakage
    key = id(repo["brand"])
    rx = _RX.get(key) or _RX.setdefault(key, compile_brand(repo["brand"]))
    hs = repo["hashes"]
    persons, orgs, doms, ctas = set(hs["persons"]), set(hs["orgs"]), set(hs["customerDomains"]), set(hs["ctaLabels"])
    cp = hs["copy"]
    shingles, fulls, K, MINW = set(cp["shingles"]), set(cp["fullStrings"]), cp["shingleSize"], cp["fullStringMinWords"]
    route_paths = {r["path"] for r in repo["routes"]["routes"]}
    strings = [("brand.name", "name", (spec.get("brand") or {}).get("name", "")), ("route", "route", route or "")]
    for i, n in enumerate(nodes):
        for path, k2, val in leaves(n.get("content") or {}):
            if isinstance(val, str):
                strings.append((f"node {i} ({n['section']}).{path}", k2, val))
    for where, k2, raw in strings:
        if k2 in ("assetRole", "linkRole"):
            continue
        val = norm_text(raw)
        if k2 in ("href", "ref", "route") and rx["endpoint"].search(val):
            err("LIVE_ENDPOINT_ALL_MODES", f"{where}: {raw!r} is a live third-party form endpoint (forbidden in every mode)")
        if mode != "generated":
            continue
        if rx["store"].search(val):
            err("GENERATED_MODE_STORE", f"{where}: {raw!r} is an app-store / marketplace mark or link")
        if k2 in ("href", "ref", "route"):
            if val.startswith(("https://", "http://")) and not RESERVED_URL.match(val):
                err("GENERATED_MODE_URL", f"{where}: absolute URL {raw!r} must use a reserved .example/.invalid host")
            if val.startswith("mailto:") and not re.search(r"@[a-z0-9.-]+\.(example|invalid)$", val):
                err("GENERATED_MODE_URL", f"{where}: mail link {raw!r} must use a reserved .example/.invalid domain")
            if rx["domain"].search(val) or rx["brand"].search(val) or rx["embed"].search(val):
                err("GENERATED_MODE_URL", f"{where}: {raw!r} points at a source / third-party domain")
            h = host_of(val)
            if h and h16(h) in doms:
                err("GENERATED_MODE_URL", f"{where}: {raw!r} is a real customer domain from the source")
            if val.startswith("/") and val != "/" and val.rstrip("/") in route_paths:
                err("GENERATED_MODE_URL", f"{where}: {raw!r} reuses a source-site route")
            continue
        if rx["brand"].search(val):
            err("GENERATED_MODE_BRAND", f"{where}: {raw!r} names the source brand, a source product or its credited studio")
        if rx["domain"].search(val):
            err("GENERATED_MODE_URL", f"{where}: {raw!r} mentions a source domain")
        wins = set(windows(val))
        if wins & orgs:
            err("GENERATED_MODE_BRAND", f"{where}: {raw!r} names a real organisation / partner brand from the source")
        if wins & persons:
            err("GENERATED_MODE_PERSON", f"{where}: {raw!r} reuses a real person's name from the source")
        if rx["rating"].search(val):
            err("GENERATED_MODE_RATING", f"{where}: {raw!r} looks like a review handle/date, a rating score or the source's rating claim; use rating.placeholder and original copy")
        w = norm_words(val)
        hit = len(w) >= MINW and h16(" ".join(w)) in fulls
        hit = hit or any(h16(" ".join(w[j:j + K])) in shingles for j in range(len(w) - K + 1))
        if hit:
            err("GENERATED_MODE_COPY", f"{where}: copy reproduces source copy ({raw[:60]!r}...)")
    if mode == "generated":
        generic = set(repo["brand"]["cta"].get("genericLabels", []))
        for n in nodes:
            for a in (n.get("content") or {}).get("actions", []) or []:
                lab = norm_text(str(a.get("label", ""))).strip()
                w = norm_words(lab)
                if w and w[0] in rx["verbs"] and rx["brand"].search(lab):
                    err("GENERATED_MODE_CTA", f"{n['section']}: action {lab!r} is a source-brand CTA")
                if len(w) >= 3 and " ".join(w) not in generic and h16(" ".join(w)) in ctas:
                    err("GENERATED_MODE_CTA", f"{n['section']}: action {lab!r} reuses a source CTA label")
    return E, W


def main(argv):
    as_json = "--json" in argv
    files = [a for a in argv if not a.startswith("--")]
    if not files:
        print(__doc__)
        return 2
    repo = load_repo()
    bad, report = 0, {}
    for f in files:
        E, W = validate(json.loads(Path(f).read_text()), repo)
        report[f] = {"errors": E, "warnings": W}
        bad += bool(E)
        if not as_json:
            print(f"{'FAIL' if E else 'ok  '}  {f}  errors={len(E)} warnings={len(W)}")
            for r, m in E:
                print(f"   ERROR {r}: {m}")
            for r, m in W:
                print(f"   warn  {r}: {m}")
    if as_json:
        print(json.dumps(report, indent=1))
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
