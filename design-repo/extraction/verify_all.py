#!/usr/bin/env python3
"""One-shot verification of this design-repo. Exit 1 on any failed check.

    python3 extraction/verify_all.py [--quiet]

Checks (each prints PASS/FAIL/WARN):
  SCHEMAS            Draft-07 meta-validation of the PageSpec + section-contract schemas, both byte-identical to a fresh schema/build_schema.py
                     generation; every contract validates; id/semantic/source split
  SOURCE_BRAND       generated-mode registry: patterns match their own samples, pins in code, (sibling) re-derived byte for byte
  EXAMPLES           every reference + generated example passes schema + semantic validator with 0 errors; a reference example per
                     served route; a generated example per template (so every template family is covered)
  ROUTE_COVERAGE     every served route mapped exactly once; (sibling) routes.json == the router (src/routes.jsx + the three group routes
                     files) plus the slugs of src/pages/content/data/*.js, with page files re-derived
  TEMPLATES          routeCount/routes == routes.json; node sections/variants exist in the contracts
  ALLOWLIST_PARITY   allowlist ids == primitives/components/sections files; section 'settable' == contract + schema; version parity
  GRAPH_AGREEMENT    compatibility/graph.json rule ids/severity == semantic_validate.GRAPH_RULES_IMPLEMENTED and its err()/warn() calls
  PINS               availability / policy / forbidden-all-modes / retrieval / hero-less pins: this file == semantic_validate == registries
  TOKENS             catalog == regenerated from tokens/ files; policy categories/props/themes consistent; (sibling) every colour in the
                     clone's config colour block exists as a token
  MOTION             every contract motion pattern exists with the same fallback; schema motion enum == motion-patterns.json
  SOURCE_PROVENANCE  (sibling) every contract/primitive source: <tag> at tagLine and the anchor at anchorLine of the real file
  CITATIONS          (sibling) every path:line[-line] citation resolves in range; every token/motion `match` text is on its cited line
  ASSET_REFS         (sibling) every local asset ref in the reference examples exists under public/
  NO_SOURCE_COPY     no string in this package reproduces hashed source copy, a real person's name or a hashed organisation name
  COUNTS             registry.manifest.json counts == recomputed; README counts block == manifest; status flags
  ENTRYPOINTS        every entry point exists and is inside this folder
  WRAPPER_GATE       extraction/wrapper_gate.py (R9)
  HYGIENE            no absolute machine paths, no junk files
"(sibling)" checks need the clone project around this folder; standalone they WARN instead of failing.
"""
import hashlib, importlib.util, json, re, sys, urllib.parse

sys.dont_write_bytecode = True  # never leave __pycache__ inside the package
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
PROJECT = REPO.parent
SIBLING = (PROJECT / "src").is_dir() and (PROJECT / "package.json").exists() and (PROJECT / "tailwind.config.cjs").exists()
QUIET = "--quiet" in sys.argv

# pins, duplicated on purpose (independent of the registries and of semantic_validate.py)
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
# minimum source-identity registry pinned in code: deleting or loosening a pattern/hash bucket below this is caught
MIN_BRAND_PATTERNS = {"sourceBrand": [r"\bcadmus\b"], "sourceDomains": [r"(^|[/.@])cadmus\.io"], "liveEndpoints": [r"hsforms\.(com|net)", r"apply\.workable\.com"], "thirdPartyEmbeds": [r"vimeo\.com"]}
MIN_HASHES = {"persons": 30, "orgs": 30, "ctaLabels": 5, "fullStrings": 400, "shingles": 2000}

RESULTS = []


def rec(name, errors, warnings=(), info=""):
    RESULTS.append((name, "FAIL" if errors else ("WARN" if warnings else "PASS"), list(errors), list(warnings), info))


def J(rel):
    return json.loads((REPO / rel).read_text())


def import_file(name, rel):
    spec = importlib.util.spec_from_file_location(name, REPO / rel)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


sv = import_file("semantic_validate", "schema/semantic_validate.py")
wg = import_file("wrapper_gate", "extraction/wrapper_gate.py")
repo = sv.load_repo()
contracts, templates, schema = repo["contracts"], repo["templates"], repo["schema"]
routes_doc = repo["routes"]
manifest = J("registry.manifest.json")
mv = J("extraction/measured-values.json")
slug = lambda r: "home" if r == "/" else r.strip("/").replace("/", "--")
rd = lambda rel: (PROJECT / rel).read_text()

# ---------------------------------------------------------------- SCHEMAS
errs = []
bs = import_file("build_schema", "schema/build_schema.py")
ps_new, cs_new = bs.build()
for rel, new in (("schema/pagespec.schema.json", ps_new), ("schema/section-contract.schema.json", cs_new)):
    if (REPO / rel).read_text() != bs.dumps(new):
        errs.append(f"{rel} differs from a fresh generation by schema/build_schema.py (edit the registries, then regenerate)")
try:
    from jsonschema import Draft7Validator
    Draft7Validator.check_schema(schema)
    cs = J("schema/section-contract.schema.json")
    Draft7Validator.check_schema(cs)
    cv = Draft7Validator(cs)
    for sid, c in contracts.items():
        for e in cv.iter_errors(c):
            errs.append(f"sections/{sid}.json: {'/'.join(map(str, e.path))}: {e.message[:160]}")
        if c["id"] != sid or c["semantic"]["id"] != sid:
            errs.append(f"sections/{sid}.json: id/semantic.id must equal the file stem")
        if c["source"]["id"] == sid or any(s["id"] == sid for s in c["additionalSources"]):
            errs.append(f"sections/{sid}.json: source.id must not equal the semantic id")
    rec("SCHEMAS", errs, info=f"{len(contracts)} contracts validated against section-contract.schema.json; both schemas are valid Draft-07 and match a fresh generation")
except ImportError:
    rec("SCHEMAS", errs + ["jsonschema not installed (pip install jsonschema)"])

# ---------------------------------------------------------------- EXAMPLES
errs, warns = [], []
ex_files = sorted((REPO / "schema/examples").rglob("*.json")) + [REPO / "schema/example.pagespec.json"]
modes = {"reference": 0, "generated": 0}
ref_routes, gen_t, ref_t = set(), set(), set()
for f in ex_files:
    spec = json.loads(f.read_text())
    E, W = sv.validate(spec, repo)
    modes[spec.get("mode")] = modes.get(spec.get("mode"), 0) + 1
    errs += [f"{f.relative_to(REPO)}: {r}: {m}" for r, m in E]
    warns += [f"{f.relative_to(REPO)}: {r}: {m}" for r, m in W]
    if "generated" in f.parts:
        gen_t.add(spec.get("template"))
        if spec.get("mode") != "generated":
            errs.append(f"{f.relative_to(REPO)} is under examples/generated but mode != generated")
    elif "reference" in f.parts:
        ref_routes.add(spec.get("route"))
        ref_t.add(spec.get("template"))
        if spec.get("mode") != "reference" or f.stem.replace(".pagespec", "") != slug(spec["route"]):
            errs.append(f"{f.name}: reference example must be mode reference and named after its route")
served = {r["path"] for r in routes_doc["routes"]}
singles = {r["path"] for r in routes_doc["routes"] if "routerPattern" not in r}
if singles - ref_routes:
    errs.append(f"served non-collection routes without a reference example: {sorted(singles - ref_routes)}")
inst = {t for t, d in templates.items() if d.get("instantiable", True)}
if inst - ref_t:
    errs.append(f"templates without a reference example: {sorted(inst - ref_t)}")
if inst - gen_t:
    errs.append(f"templates without a generation-safe example: {sorted(inst - gen_t)}")
if gen_t - inst:
    errs.append(f"generated examples for non-instantiable templates: {sorted(gen_t - inst)}")
if {templates[t]["family"] for t in gen_t if t in templates} != {t["family"] for t in templates.values() if t.get("instantiable", True)}:
    errs.append("some template family has no generated example")
rec("EXAMPLES", errs, warns, info=f"{len(ex_files)} examples ({modes}); {len(ref_routes)} routes and {len(ref_t)} templates with a reference example, {len(gen_t)} templates with a generated example")

# ---------------------------------------------------------------- ROUTE_COVERAGE
errs, warns = [], []
paths = [r["path"] for r in routes_doc["routes"]]
dups = {p for p in paths if paths.count(p) > 1}
if dups:
    errs.append(f"routes mapped more than once: {sorted(dups)}")
for r in routes_doc["routes"]:
    if r["template"] not in templates:
        errs.append(f"{r['path']} -> unknown template {r['template']}")
fb = routes_doc["fallback"]
if fb["template"] not in templates or templates[fb["template"]].get("instantiable", True):
    errs.append("fallback template must exist and be non-instantiable")
if routes_doc.get("routeCount") != len(paths):
    errs.append(f"routes.json routeCount {routes_doc.get('routeCount')} != {len(paths)}")
if SIBLING:
    GROUPS = ["src/pages/product/", "src/pages/company/", "src/pages/content/"]
    expected = {"/": "src/pages/Home.jsx"}
    patterns = {}
    for base in GROUPS:
        t = rd(base + "routes.jsx")
        imports = dict(re.findall(r"import (\w+) from '\./(\w+)\.jsx'", t))
        for path, comp in re.findall(r"\{ path: '([^']+)', element: <(\w+)", t):
            if comp == "ProductPage":
                f = base + "ProductPage.jsx"
            elif comp in imports:
                f = base + imports[comp] + ".jsx"
            else:
                m = re.search(r"import \{[^}]*\b%s\b[^}]*\} from '\./(\w+)\.jsx'" % comp, t)
                f = base + m.group(1) + ".jsx"
            if ":slug" in path:
                patterns[path] = f
            else:
                expected[path] = f
    COLL = {"/news/:slug": ("src/pages/content/data/news.js", "/news/"), "/study/:slug": ("src/pages/content/data/studies.js", "/study/"),
            "/guides/:slug": ("src/pages/content/data/guides.js", "/guides/"), "/video/:slug": ("src/pages/content/data/videos.js", "/video/")}
    if set(patterns) != set(COLL):
        errs.append(f"router param routes {sorted(patterns)} != the collections this check knows {sorted(COLL)}")
    for pat, (rel, prefix) in COLL.items():
        for sl in re.findall(r'"slug":\s*"([^"]+)"', rd(rel)):
            expected[prefix + sl] = patterns.get(pat)
    got = {r["path"]: r["pageFile"] for r in routes_doc["routes"]}
    if set(got) != set(expected):
        errs.append(f"routes.json drifted from the router + data slugs: missing {sorted(set(expected) - set(got))[:6]}, extra {sorted(set(got) - set(expected))[:6]}")
    for p_, f in got.items():
        if p_ in expected and expected[p_] != f:
            errs.append(f"{p_}: pageFile {f} != router component file {expected[p_]}")
    for tid_, t_ in templates.items():
        col = t_.get("collection")
        if not col:
            continue
        slugs_ = re.findall(r'"slug":\s*"([^"]+)"', rd(col["source"]))
        if col["items"] != len(slugs_) or t_["routeCount"] != len(slugs_):
            errs.append(f"{tid_}: collection.items {col['items']} / routeCount {t_['routeCount']} != {len(slugs_)} slugs in {col['source']}")
        if "unlisted" in col:
            unl = re.findall(r'"slug":\s*"([^"]+)"[^}]*?"guideType":\s*"unlisted"|"guideType":\s*"unlisted"[^}]*?"slug":\s*"([^"]+)"', rd(col["source"]), re.S)
            unl = sorted("/video/" + (a or b) for a, b in unl)
            if sorted(col["unlistedRoutes"]) != unl or col["unlisted"] != len(unl) or col["listed"] + col["unlisted"] != col["items"]:
                errs.append(f"{tid_}: unlisted routes {col['unlistedRoutes']} != {unl} derived from guideType in {col['source']}")
    if not re.search(r'path="\*"', rd("src/App.jsx")):
        errs.append("src/App.jsx has no catch-all route but routes.json documents one")
else:
    warns.append("no sibling clone source: route table drift not checked")
rec("ROUTE_COVERAGE", errs, warns, info=f"{len(paths)} routes (+ the catch-all fallback), each mapped once")

# ---------------------------------------------------------------- TEMPLATES
errs = []
for tid, t in templates.items():
    rts = [r["path"] for r in routes_doc["routes"] if r["template"] == tid]
    if t["routeCount"] != len(rts):
        errs.append(f"{tid}.routeCount {t['routeCount']} != routes.json {len(rts)}")
    if "routePattern" in t and not t.get("instantiable", True):
        if t["routes"] != [] or t["routeCount"] != 0:
            errs.append(f"{tid}: the catch-all lists no routes")
    elif "routePattern" in t:
        if t["routes"] != [] or not t.get("collection"):
            errs.append(f"{tid}: a collection template lists no routes and names its collection")
    elif sorted(t["routes"]) != sorted(rts):
        errs.append(f"{tid}.routes {t['routes']} != routes.json {rts}")
    for nd in t["nodes"]:
        if nd["section"] not in contracts:
            errs.append(f"{tid} references unknown section {nd['section']}")
            continue
        if not nd.get("variants"):
            errs.append(f"{tid}: {nd['section']} lists no variants")
        for v in nd.get("variants", []):
            if v not in contracts[nd["section"]]["variants"]:
                errs.append(f"{tid}: {nd['section']} has no variant {v}")
        if nd.get("repeatable") and nd.get("maxCount", 99) > contracts[nd["section"]]["constraints"]["maxPerPage"]:
            errs.append(f"{tid}: {nd['section']} maxCount exceeds the contract maxPerPage")
        if nd.get("modes") == ["reference"] and not contracts[nd["section"]].get("referenceOnly"):
            errs.append(f"{tid}: reference-only node {nd['section']} is not flagged referenceOnly in its contract")
    if t["nodes"][0]["section"] != "shell.header" or t["nodes"][-1]["section"] != "shell.footer":
        errs.append(f"{tid}: must open with shell.header and close with shell.footer")
    hl = not any(contracts.get(n["section"], {}).get("semantic", {}).get("category") == "HERO" for n in t["nodes"])
    if hl != (tid in HEROLESS_TEMPLATES):
        errs.append(f"{tid}: hero-less computed {hl} != pinned")
    for sid_, cc in contracts.items():
        pass
for sid, c in contracts.items():
    used = sorted(tid for tid, t in templates.items() if any(n["section"] == sid for n in t["nodes"]))
    if c["usedByTemplates"] != used:
        errs.append(f"sections/{sid}.json usedByTemplates {c['usedByTemplates']} != templates.json {used}")
    if not used:
        errs.append(f"section {sid} is used by no template")
rec("TEMPLATES", errs, info=f"{len(templates)} templates, {len({t['family'] for t in templates.values()})} families")

# ---------------------------------------------------------------- ALLOWLIST_PARITY
errs = []
al = repo["allowlist"]
files = {}
for d, kind in (("primitives", "primitive"), ("components", "component"), ("sections", "section")):
    for p in (REPO / d).glob("*.json"):
        files[json.loads(p.read_text())["id"]] = (kind, f"{d}/{p.name}")
ids = [e["id"] for e in al["entries"]]
if len(ids) != len(set(ids)):
    errs.append("duplicate allowlist ids")
for e in al["entries"]:
    if e["id"] not in files:
        errs.append(f"phantom allowlist entry {e['id']} (no contract file)")
    elif files[e["id"]] != (e["kind"], e["file"]):
        errs.append(f"allowlist {e['id']}: kind/file {e['kind']}/{e['file']} != {files[e['id']]}")
for i in files:
    if i not in ids:
        errs.append(f"orphan contract {i} has no allowlist entry")
for e in al["entries"]:
    if e["kind"] != "section" or e["id"] not in contracts:
        continue
    c = contracts[e["id"]]
    want = {"variant": sorted(c["variants"]), "content": sorted(schema["definitions"][f"content.{e['id']}"]["properties"]), "style": sorted(c["style"]["props"]),
            "motion": c["motion"]["allowedPatterns"], "assetRoles": c["generatedAssetRoles"]}
    if e.get("settable") != want:
        errs.append(f"allowlist {e['id']} settable drifted from contract/schema: {e.get('settable')} != {want}")
    if e.get("retrievalEligible") != c["retrievalEligible"]:
        errs.append(f"allowlist {e['id']} retrievalEligible != contract")
if set(schema["properties"]["nodes"]["items"]["$ref"].split("/")[-1:]) != {"node"} or sorted(schema["definitions"]["node"]["properties"]["section"]["enum"]) != sorted(contracts):
    errs.append("schema node.section enum != section contract files")
if manifest.get("allowlistVersion") != al.get("version"):
    errs.append(f"manifest allowlistVersion {manifest.get('allowlistVersion')} != allowlist version {al.get('version')}")
if manifest.get("pageSpecVersion") != schema["properties"]["pageSpecVersion"]["const"]:
    errs.append("manifest pageSpecVersion != schema const")
rec("ALLOWLIST_PARITY", errs, info=f"{len(ids)} entries == {len(files)} contract files")

# ---------------------------------------------------------------- GRAPH_AGREEMENT
gids = {r["id"] for r in repo["graph"]["rules"]}
errs = []
if gids != sv.GRAPH_RULES_IMPLEMENTED:
    errs.append(f"graph rules not implemented: {sorted(gids - sv.GRAPH_RULES_IMPLEMENTED)}; implemented but undocumented: {sorted(sv.GRAPH_RULES_IMPLEMENTED - gids)}")
src_sv = (REPO / "schema/semantic_validate.py").read_text()
for r in repo["graph"]["rules"]:
    if f'err("{r["id"]}"' not in src_sv and f'warn("{r["id"]}"' not in src_sv:
        errs.append(f"graph rule {r['id']} has no err()/warn() call in semantic_validate.py")
        continue
    sev = "warn" if f'warn("{r["id"]}"' in src_sv else "error"
    if sev != r.get("severity"):
        errs.append(f"rule {r['id']}: graph severity {r.get('severity')} != validator {sev}")
one = next((r for r in repo["graph"]["rules"] if r["id"] == "ONE_HERO"), {})
if set(one.get("exceptions", [])) != HEROLESS_TEMPLATES:
    errs.append("graph ONE_HERO exceptions != pinned hero-less templates")
sch = next((r for r in repo["graph"]["rules"] if r["id"] == "SCHEME_CONSISTENT"), {})
if set(sch.get("sections", [])) != sv.SCHEME_SECTIONS or set(sch.get("schemes", [])) != sv.SCHEMES:
    errs.append("graph SCHEME_CONSISTENT sections/schemes != semantic_validate SCHEME_SECTIONS/SCHEMES")
ap = next((r for r in repo["graph"]["rules"] if r["id"] == "AUTOPLAY_BUDGET"), {})
if not isinstance(ap.get("max"), int):
    errs.append("graph AUTOPLAY_BUDGET needs an integer max")
for sid in sv.SCHEME_SECTIONS:
    if sid not in contracts or not (sv.SCHEMES & set(contracts[sid]["variants"])):
        errs.append(f"scheme section {sid} has no scheme variant in its contract")
rec("GRAPH_AGREEMENT", errs, info=f"{len(gids)} rules, ids and severities agree with the validator")

# ---------------------------------------------------------------- PINS
errs = []
roles = repo["roles"]["roles"]
for a, b, name in ((PINNED_AVAILABILITY, sv.PINNED_AVAILABILITY, "PINNED_AVAILABILITY"), (PINNED_POLICY, sv.PINNED_POLICY, "PINNED_POLICY"),
                   (PINNED_FORBIDDEN_ALL_MODES, sv.PINNED_FORBIDDEN_ALL_MODES, "PINNED_FORBIDDEN_ALL_MODES"),
                   (RETRIEVAL_INELIGIBLE, sv.RETRIEVAL_INELIGIBLE, "RETRIEVAL_INELIGIBLE"), (HEROLESS_TEMPLATES, sv.HEROLESS_TEMPLATES, "HEROLESS_TEMPLATES")):
    if a != b:
        errs.append(f"{name} differs between verify_all and semantic_validate")
hero_less = {tid for tid, t in templates.items() if not any(contracts[n["section"]]["semantic"]["category"] == "HERO" for n in t["nodes"] if n["section"] in contracts)}
if hero_less != HEROLESS_TEMPLATES:
    errs.append(f"hero-less templates computed from templates.json {sorted(hero_less)} != pinned {sorted(HEROLESS_TEMPLATES)}")
for rid, av in PINNED_AVAILABILITY.items():
    if roles.get(rid, {}).get("availability") != av:
        errs.append(f"asset role {rid}: registry {roles.get(rid, {}).get('availability')!r} != pinned {av!r}")
for rid, pol in PINNED_POLICY.items():
    if roles.get(rid, {}).get("generationPolicy") != pol:
        errs.append(f"asset role {rid}: generationPolicy {roles.get(rid, {}).get('generationPolicy')!r} != pinned {pol!r}")
for rid, d in roles.items():
    if rid not in PINNED_AVAILABILITY:
        errs.append(f"asset role {rid} not pinned")
    if d.get("availability") != "generation-safe":
        subs = d.get("generationSafeSubstitutes") or []
        if not subs or any(PINNED_AVAILABILITY.get(s) != "generation-safe" for s in subs):
            errs.append(f"asset role {rid}: generationSafeSubstitutes must be non-empty and generation-safe")
    if bool(d.get("forbiddenInAllModes")) != (rid in PINNED_FORBIDDEN_ALL_MODES):
        errs.append(f"asset role {rid}: forbiddenInAllModes drift")
if set(schema["definitions"]["assetRole"]["enum"]) != {r for r, d in roles.items() if d["kind"] == "media"}:
    errs.append("schema assetRole enum != media roles in assets/asset-roles.json")
if set(schema["definitions"]["linkRole"]["enum"]) != {r for r, d in roles.items() if d["kind"] == "link"}:
    errs.append("schema linkRole enum != link roles in assets/asset-roles.json")
if set(schema["properties"]["copyRole"]["enum"]) != {r for r, d in roles.items() if d["kind"] == "copy"}:
    errs.append("schema copyRole enum != copy roles in assets/asset-roles.json")
for sid, c in contracts.items():
    for gr in c["generatedAssetRoles"]:
        if PINNED_AVAILABILITY.get(gr) != "generation-safe":
            errs.append(f"{sid}: generatedAssetRoles contains non-generation-safe {gr}")
    if c["retrievalEligible"] is not (sid not in RETRIEVAL_INELIGIBLE):
        errs.append(f"{sid}: retrievalEligible {c['retrievalEligible']} contradicts the pin")
    if RUNTIME_UI_HINT.search(sid + " " + c["title"]) and sid not in RETRIEVAL_INELIGIBLE:
        errs.append(f"{sid} looks like runtime UI but is not pinned retrieval-ineligible")
errs += [f"{r}: {m}" for r, m in sv.registry_pin_errors(repo)]
rec("PINS", errs, info=f"{len(PINNED_AVAILABILITY)} roles pinned ({len(PINNED_POLICY)} with pinned policy), {len(RETRIEVAL_INELIGIBLE)} retrieval-ineligible sections, hero-less {sorted(HEROLESS_TEMPLATES)}")

# ---------------------------------------------------------------- TOKENS
errs, warns = [], []
cat = repo["catalog"]
regen = {}
for p in sorted((REPO / "tokens/00-foundation").glob("*.json")):
    if p.name == "motion-patterns.json":
        continue
    for k, v in json.loads(p.read_text())["tokens"].items():
        regen[k] = {"value": v["value"], "category": v["category"]}
for k, v in J("tokens/30-layout/layout.json")["tokens"].items():
    regen[k] = {"value": v["value"], "category": v["category"]}
SEM = J("tokens/10-semantic/semantic.json")["tokens"]
for rel in ("tokens/10-semantic/semantic.json", "tokens/20-component/component.json"):
    for k, ref in J(rel)["tokens"].items():
        tgt = regen.get(ref) or regen.get(SEM.get(ref, ""))
        if tgt is None:
            errs.append(f"{rel}: {k} -> {ref} does not resolve to a foundation token")
            continue
        regen[k] = {"value": "{" + ref + "}", "category": tgt["category"]}
for th in (REPO / "tokens/themes").glob("*.json"):
    for k, ref in json.loads(th.read_text())["tokens"].items():
        if k not in SEM or ref not in regen:
            errs.append(f"{th.name}: {k} -> {ref} is not a semantic role resolving to a foundation token")
if {k: {"value": v["value"], "category": v["category"]} for k, v in cat.items()} != regen:
    diff = sorted(set(cat) ^ set(regen)) or sorted(k for k in cat if regen.get(k) != {"value": cat[k]["value"], "category": cat[k]["category"]})
    errs.append(f"token-catalog drifted from tokens/ files: {diff[:8]}")
if J("tokens/llm/token-catalog.json").get("count") != len(cat):
    errs.append("token-catalog count field != number of tokens")
pol = repo["policy"]
cats = {v["category"] for v in cat.values()}
if set(pol["categories"]) != cats:
    errs.append(f"policy categories {sorted(pol['categories'])} != catalog categories {sorted(cats)}")
for ck in pol["rawValueRestrictions"]:
    if ck not in cats:
        errs.append(f"policy rawValueRestrictions key {ck!r} is not a catalog category")
for prop, d in pol["styleProps"].items():
    for ck in d["categories"]:
        if ck not in cats:
            errs.append(f"styleProps.{prop} category {ck} not in catalog")
    for sid, vals in d["allowedBySection"].items():
        if sid not in contracts or contracts[sid]["style"]["props"].get(prop, {}).get("allowed") != vals:
            errs.append(f"styleProps.{prop}.{sid} != contract style props")
        for v in vals:
            if v not in cat or cat[v]["category"] not in d["categories"]:
                errs.append(f"styleProps.{prop}: {v} not a catalog token of {d['categories']}")
    for sid, c in contracts.items():
        if prop in c["style"]["props"] and sid not in d["allowedBySection"]:
            errs.append(f"{sid} exposes style.{prop} but the policy does not list it")
if pol["themes"] != manifest["schemaValidatedThemes"] or schema["properties"]["theme"]["enum"] != pol["themes"] or sorted(p.stem for p in (REPO / "tokens/themes").glob("*.json")) != sorted(pol["themes"]):
    errs.append("themes differ between token-policy, manifest, schema and tokens/themes/")
for key in ("token-catalog.json", "token-policy.json", "component-allowlist.json", "motion-patterns.json"):
    if not any(str(v).endswith(key) for v in manifest["entryPoints"].values()):
        errs.append(f"{key} not registered in registry.manifest.json entryPoints")
if SIBLING:
    tw = rd("tailwind.config.cjs").split("\n")
    a = next(i for i, l in enumerate(tw) if "colors: {" in l)
    depth, i, vals = 1, a + 1, set()
    while depth > 0:
        line = re.sub(r"\s//.*$", "", tw[i])
        depth += line.count("{") - line.count("}")
        vals |= {v.lower() for v in re.findall(r"'(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))'", line)}
        i += 1
    have = {str(v["value"]).lower() for k, v in cat.items() if v["category"] == "color"}
    if vals - have:
        errs.append(f"colours in tailwind.config.cjs with no color token: {sorted(vals - have)}")
else:
    warns.append("no sibling tailwind.config.cjs: token-completeness drift not checked")
rec("TOKENS", errs, warns, info=f"{len(cat)} catalog tokens, {len(cats)} categories")

# ---------------------------------------------------------------- MOTION
errs = []
mp = repo["motion"]
for sid, c in contracts.items():
    for p in c["motion"]["allowedPatterns"]:
        if p not in mp:
            errs.append(f"{sid}: motion pattern {p} not in motion-patterns.json")
        elif c["motion"]["reducedMotionFallback"].get(p) != mp[p]["reducedMotionFallback"]:
            errs.append(f"{sid}: reducedMotionFallback for {p} != motion-patterns.json")
    for p in c["motion"]["requiredPatterns"]:
        if p not in c["motion"]["allowedPatterns"]:
            errs.append(f"{sid}: required pattern {p} not allowed")
md = schema["definitions"]["motion"]
if set(md["properties"]["pattern"]["enum"]) != set(mp) or md.get("additionalProperties") is not False:
    errs.append("schema motion enum != motion-patterns.json, or the motion object is not closed")
entry = {o["properties"]["pattern"]["const"]: o["properties"]["reducedMotionFallback"]["const"] for o in schema["definitions"]["motionEntry"]["oneOf"]}
if entry != {p: d["reducedMotionFallback"] for p, d in mp.items()}:
    errs.append("schema motionEntry fallbacks != motion-patterns.json")
rec("MOTION", errs, info=f"{len(mp)} patterns; motion object closed")

# ---------------------------------------------------------------- SOURCE_PROVENANCE + CITATIONS + ASSET_REFS
CITE = re.compile(r"((?:src/|specs/|public/)[\w./()\[\]-]+|CLONE_SPEC\.md|BUILD_NOTES\.md|tailwind\.config\.cjs|package\.json|index\.html):(\d+)(?:-(\d+))?")
if SIBLING:
    errs, n = [], 0
    def check_src(owner, s, need_tag=True):
        f = PROJECT / s["file"]
        if not f.exists():
            return [f"{owner}: source file {s['file']} missing"]
        ls = f.read_text().split("\n")
        a, b = map(int, s["lines"].split("-"))
        out = []
        if not (1 <= a <= b <= len(ls)):
            out.append(f"{owner}: source range {s['lines']} outside {s['file']} ({len(ls)} lines)")
            return out
        if need_tag and (not (a <= s["tagLine"] <= b) or f"<{s['tag']}" not in ls[s["tagLine"] - 1]
                         or hashlib.sha1(ls[s["tagLine"] - 1].strip().encode()).hexdigest()[:16] != s["tagLineSha1"]):
            out.append(f"{owner}: <{s['tag']}> root line (sha {s['tagLineSha1']}) not at {s['file']}:{s['tagLine']}")
        if s["anchor"] not in ls[s["anchorLine"] - 1]:
            out.append(f"{owner}: anchor {s['anchor']!r} not at {s['file']}:{s['anchorLine']}")
        return out
    for sid, c in contracts.items():
        for s in [c["source"]] + c["additionalSources"]:
            n += 1
            errs += check_src(sid, s, need_tag=bool(s.get("tag")))
    for d in ("primitives", "components"):
        for p in (REPO / d).glob("*.json"):
            n += 1
            errs += check_src(p.name, json.loads(p.read_text())["source"], need_tag=False)
    rec("SOURCE_PROVENANCE", errs, info=f"{n} source anchors re-read from the clone")
    errs, total = [], 0
    for p in REPO.rglob("*"):
        if p.suffix not in (".json", ".md") or not p.is_file() or p.name == "source-identity-hashes.json":
            continue
        for m in CITE.finditer(p.read_text()):
            total += 1
            f = PROJECT / m.group(1)
            if not f.exists():
                errs.append(f"{p.relative_to(REPO)}: cites missing file {m.group(1)}")
                continue
            nl = len(f.read_text().split("\n"))
            a, b = int(m.group(2)), int(m.group(3) or m.group(2))
            if not (1 <= a <= b <= nl):
                errs.append(f"{p.relative_to(REPO)}: {m.group(0)} out of range ({nl} lines)")
    matched = 0
    for p in list((REPO / "tokens/00-foundation").glob("*.json")) + [REPO / "tokens/30-layout/layout.json"]:
        d = json.loads(p.read_text())
        for k, v in (d.get("tokens") or d.get("patterns") or {}).items():
            pairs = [(v["cite"], v["match"])] if "cite" in v and "match" in v else []
            pairs += [(x["cite"], x["match"]) for x in (v.get("responsive") or {}).values()]
            for c_, m_ in pairs:
                rel, ln = c_.rsplit(":", 1)
                ls = (PROJECT / rel).read_text().split("\n")
                matched += 1
                if not (1 <= int(ln) <= len(ls)) or m_ not in ls[int(ln) - 1]:
                    errs.append(f"{p.name}: {k} cites {c_} but that line does not contain {m_[:50]!r}")
    rec("CITATIONS", errs, info=f"{total} path:line citations resolved, {matched} token/motion citations matched to their line text")
    errs, total = [], 0
    for f in sorted((REPO / "schema/examples/reference").glob("*.json")) + [REPO / "schema/example.pagespec.json"]:
        for nd in json.loads(f.read_text())["nodes"]:
            for a in nd["content"].get("media", []):
                ref = urllib.parse.unquote(a["ref"].split("?")[0])
                if ref.startswith("/assets/"):
                    total += 1
                    if not (PROJECT / "public" / ref.lstrip("/")).exists():
                        errs.append(f"{f.name}: asset {ref} not found under public/")
    rec("ASSET_REFS", errs, info=f"{total} local asset refs found under public/")
else:
    for name in ("SOURCE_PROVENANCE", "CITATIONS", "ASSET_REFS"):
        rec(name, [], ["no sibling clone source tree: skipped (degrades gracefully)"])

# ---------------------------------------------------------------- NO_SOURCE_COPY
errs, nstr = [], 0
hs = repo["hashes"]
cp = hs["copy"]
fulls, shingles, K, MINW = set(cp["fullStrings"]), set(cp["shingles"]), cp["shingleSize"], cp["fullStringMinWords"]
names = set(hs["persons"]) | set(hs["orgs"])


def strings_of(v, key=""):
    if isinstance(v, dict):
        for k, x in v.items():
            yield from strings_of(x, k)
    elif isinstance(v, list):
        for x in v:
            yield from strings_of(x, key)
    elif isinstance(v, str):
        yield key, v


for p in REPO.rglob("*"):
    if not p.is_file() or p.name == "source-identity-hashes.json" or p.suffix not in (".json", ".md"):
        continue
    items = list(strings_of(json.loads(p.read_text()))) if p.suffix == ".json" else [("md", x) for x in re.split(r"(?<=[.!?])\s+|\n", p.read_text())]
    for key, s in items:
        if key in ("ref", "href", "file", "cite", "match", "anchor", "id", "value", "lines", "tag", "pattern", "patterns", "mustMatch", "genericLabels", "verbs") or re.match(r"^(https?:|/|[\w./-]+:\d)", s):
            continue
        nstr += 1
        w = sv.norm_words(s)
        if (len(w) >= MINW and sv.h16(" ".join(w)) in fulls) or any(sv.h16(" ".join(w[j:j + K])) in shingles for j in range(len(w) - K + 1)):
            errs.append(f"{p.relative_to(REPO)}: string reproduces source copy: {s[:50]!r}")
        if set(sv.windows(s)) & names:
            errs.append(f"{p.relative_to(REPO)}: string names a real person/organisation from the source: {s[:50]!r}")
rec("NO_SOURCE_COPY", errs[:20], info=f"{nstr} strings checked against {len(fulls)} full-string + {len(shingles)} shingle copy hashes and {len(names)} name hashes")

# ---------------------------------------------------------------- SOURCE_BRAND
errs, warns = [], []
brand, hs0 = repo["brand"], repo["hashes"]
for grp in ("sourceBrand", "sourceDomains", "storeAndMarketplace", "rating", "liveEndpoints", "thirdPartyEmbeds"):
    g = brand[grp]
    rx = re.compile("|".join(f"(?:{x})" for x in g["patterns"]), re.I)
    for sample in g["mustMatch"]:
        if not rx.search(sv.norm_text(sample)):
            errs.append(f"source-brand {grp}: pattern group does not match its own sample {sample!r}")
    for need in MIN_BRAND_PATTERNS.get(grp, []):
        if need not in g["patterns"]:
            errs.append(f"source-brand {grp}: pinned pattern {need!r} was removed or loosened")
    if not g.get("evidence"):
        errs.append(f"source-brand {grp}: no evidence rows")
    if SIBLING and not g.get("precautionary"):
        hit = False
        for ev in g.get("evidence", []):
            f_, ln = ev.rsplit(":", 1)
            if rx.search(sv.norm_text((PROJECT / f_).read_text().split("\n")[int(ln) - 1])):
                hit = True
        if not hit:
            errs.append(f"source-brand {grp}: none of its evidence lines matches one of its patterns")
for k, lo in MIN_HASHES.items():
    n = len(hs0["copy"][k]) if k in ("fullStrings", "shingles") else len(hs0[k])
    if n < lo:
        errs.append(f"source-identity-hashes {k}: {n} entries < pinned minimum {lo}")
for probe, want in (("\uff23\uff41\uff44\uff4d\uff55\uff53", "Cadmus"), ("Cad\u200bmus", "Cadmus"), ("It\u2019s", "It's")):
    if sv.norm_text(probe) != want:
        errs.append(f"semantic_validate.norm_text({probe!r}) != {want!r} (NFKC / zero-width / curly-quote normalisation broken)")
if SIBLING:
    bsb = import_file("build_source_brand", "extraction/build_source_brand.py")
    b_new, h_new, _ = bsb.derive()
    if (REPO / "schema/source-brand.json").read_text() != bsb.dumps(b_new) or (REPO / "schema/source-identity-hashes.json").read_text() != bsb.dumps(h_new):
        errs.append("schema/source-brand.json or source-identity-hashes.json differs from a fresh derivation (run extraction/build_source_brand.py)")
else:
    warns.append("no sibling clone source: registry re-derivation skipped")
rec("SOURCE_BRAND", errs, warns, info=f"{len(brand['sourceBrand']['patterns'])} brand patterns, {len(hs0['persons'])} person / {len(hs0['orgs'])} organisation / {len(hs0['ctaLabels'])} CTA / {len(hs0['copy']['fullStrings'])} copy hashes")

# ---------------------------------------------------------------- COUNTS
errs = []
want = {
    "tokensInCatalog": len(cat), "foundationTokens": sum(len(json.loads(p.read_text())["tokens"]) for p in (REPO / "tokens/00-foundation").glob("*.json") if p.name != "motion-patterns.json"),
    "layoutTokens": len(J("tokens/30-layout/layout.json")["tokens"]), "semanticTokens": len(SEM), "componentTokens": len(J("tokens/20-component/component.json")["tokens"]),
    "motionPatterns": len(mp), "primitives": len(list((REPO / "primitives").glob("*.json"))), "components": len(list((REPO / "components").glob("*.json"))),
    "sections": len(contracts), "sectionsRetrievalIneligible": sum(1 for c in contracts.values() if not c["retrievalEligible"]),
    "templates": len(templates), "templateFamilies": len({t["family"] for t in templates.values()}), "routes": len(paths),
    "assetRoles": len(roles), "assetRolesGenerationSafe": sum(1 for d in roles.values() if d["availability"] == "generation-safe"),
    "graphRules": len(repo["graph"]["rules"]), "allowlistEntries": len(al["entries"]), "referenceExamples": len(list((REPO / "schema/examples/reference").glob("*.json"))),
    "generatedExamples": len(list((REPO / "schema/examples/generated").glob("*.json"))), "themes": len(list((REPO / "tokens/themes").glob("*.json"))),
    "measuredRoutes1440": len(mv["sectionHeights"]["routes"]), "wrapperWhitelistEntries": len(mv["wrapperGateWhitelist"]),
}
if manifest["counts"] != want:
    errs.append("manifest counts drifted: " + ", ".join(f"{k} {manifest['counts'].get(k)}!={v}" for k, v in want.items() if manifest["counts"].get(k) != v)
                + (f" (keys {sorted(set(manifest['counts']) ^ set(want))})" if set(manifest["counts"]) != set(want) else ""))
m = re.search(r"<!-- counts:start -->\s*```json\s*(\{.*?\})\s*```\s*<!-- counts:end -->", (REPO / "README.md").read_text(), re.S)
if not m or json.loads(m.group(1)) != manifest["counts"]:
    errs.append("README counts block != manifest counts")
if manifest.get("status") != "design-review-pending" or manifest.get("productionApproved") is not False:
    errs.append("manifest must stay design-review-pending / productionApproved false")
rec("COUNTS", errs, info=f"{len(want)} counts recomputed from disk")

# ---------------------------------------------------------------- ENTRYPOINTS
errs = []
for k, v in manifest["entryPoints"].items():
    if v.startswith("..") or v.startswith("/") or ":" in v or "\\" in v:
        errs.append(f"entryPoint {k} points outside the package: {v}")
    elif not (REPO / v).exists():
        errs.append(f"entryPoint {k} missing: {v}")
rec("ENTRYPOINTS", errs, info=f"{len(manifest['entryPoints'])} entry points, all inside this folder")

# ---------------------------------------------------------------- WRAPPER_GATE
E, W, S = wg.run(REPO)
E = list(E)
for k, v in (("HERO_WARN_PX", 1800), ("HERO_FAIL_PX", 3000), ("SHARE_WARN", 0.50), ("SHARE_FAIL", 0.60), ("REQUIRED_VIEWPORT", 1440), ("MIN_SECTIONS", 3)):
    if getattr(wg, k) != v:
        E.append(f"WRAPPER_THRESHOLD: wrapper_gate.{k} = {getattr(wg, k)} but the baseline pins {v}")
rec("WRAPPER_GATE", E, W, info=str(S))

# ---------------------------------------------------------------- HYGIENE
errs = []
WIN_HOME = re.escape("C:" + "\\" + "Users" + "\\")  # built from pieces so this line never matches itself
HOMES = "|".join("/" + d + r"/[A-Za-z0-9._-]+/" for d in ("Users", "home"))
TMP = "/" + "tmp" + "/"  # built from pieces so this line never matches itself
PRIV = "/" + "private" + "/(tmp|var)/"
ABS = re.compile(HOMES + "|" + PRIV + "|" + re.escape(TMP) + "|" + WIN_HOME)
for p in REPO.rglob("*"):
    if p.is_file():
        if p.name in (".DS_Store", "Thumbs.db", "desktop.ini") or "__MACOSX" in p.parts or "__pycache__" in p.parts or p.suffix == ".pyc":
            errs.append(f"junk file {p.relative_to(REPO)}")
        elif p.suffix in (".json", ".md", ".py", ".mjs", ".txt") and ABS.search(p.read_text(errors="ignore")):
            errs.append(f"absolute machine path in {p.relative_to(REPO)}")
rec("HYGIENE", errs)

fails = 0
for name, status, e, w, info in RESULTS:
    fails += status == "FAIL"
    print(f"{status:4}  {name:18} {info}")
    if not QUIET or status == "FAIL":
        for x in e[:12]:
            print(f"        ERROR {x}")
        for x in w[:4]:
            print(f"        warn  {x}")
print(f"\nverify_all: {len(RESULTS) - fails} passed/warned, {fails} failed  (sibling clone source: {'present' if SIBLING else 'absent'})")
sys.exit(1 if fails else 0)
