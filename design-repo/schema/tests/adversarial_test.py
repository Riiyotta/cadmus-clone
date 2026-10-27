#!/usr/bin/env python3
"""Adversarial suite: every mutation must be rejected with its expected rule, every control must pass.

    python3 schema/tests/adversarial_test.py

Controls: every reference example (real asset paths, neutral placeholder copy), every generation-safe example, the bundled
example, AND generated-mode controls synthesised per template from templates/templates.json by schema/synthesize.py
(minimal and rich), so a new or split template is covered with zero new control code.

Leakage of hashed identities (real people, organisations, customer domains, CTA labels, copy) is proven twice:
  - mechanism cases (always run): a fictional string is added to the in-memory hash registry, then injected;
  - real-source cases (need the clone project around this folder): a real string is read from the clone source AT RUN
    TIME and injected. This repo never stores those strings; standalone, these cases are reported as SKIPPED.
Normalisation evasions (zero-width characters, full-width letters, curly quotes) are proven the same way.
Mutations are applied to deep copies; registry-level mutations are applied to an in-memory copy of the loaded repo.
"""
import copy, importlib.util, json, re, sys

sys.dont_write_bytecode = True
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
PROJECT = REPO.parent
SIBLING = (PROJECT / "src/pages/content/data/news.js").exists()


def mod(name, rel):
    s = importlib.util.spec_from_file_location(name, REPO / rel)
    m = importlib.util.module_from_spec(s)
    s.loader.exec_module(m)
    return m


sv = mod("semantic_validate", "schema/semantic_validate.py")
sy = mod("synthesize", "schema/synthesize.py")
BASE = sv.load_repo()
J = lambda rel: json.loads((REPO / rel).read_text())
REF = lambda name: J(f"schema/examples/reference/{name}.pagespec.json")
GEN = lambda name: J(f"schema/examples/generated/{name}.generated.pagespec.json")

R_PRICING, R_HOME, R_EXAMS, R_ABOUT, R_TRUST = REF("pricing"), REF("home"), REF("product--exams"), REF("about"), REF("trust-centre")
R_CASES, R_VIDEO, R_PRIVACY, R_NEWS_LIST, R_EDU = REF("case-studies"), REF("video-tutorials"), REF("information--privacy-policy-au"), REF("news"), REF("solutions--educators")
R_ORAL, R_CONTACT = REF("product--oral_assessment"), REF("contact")
R_NEWSART = next(J(str(p.relative_to(REPO))) for p in sorted((REPO / "schema/examples/reference").glob("news--*.pagespec.json")))
R_VIDEOART = next(J(str(p.relative_to(REPO))) for p in sorted((REPO / "schema/examples/reference").glob("video--*.pagespec.json")))
G_HOME, G_PRICE, G_NEWS, G_PRODUCT, G_CONTACT = GEN("home"), GEN("pricing"), GEN("news-detail"), GEN("product"), GEN("contact")


def idx(s, section, nth=0):
    return [i for i, n in enumerate(s["nodes"]) if n["section"] == section][nth]


def node(s, section, nth=0):
    return s["nodes"][idx(s, section, nth)]


CASES, SKIPPED = [], []


def case(name, base, fn, expect, repo_fn=None):
    s = copy.deepcopy(base)
    fn(s)
    r = BASE
    if repo_fn:
        r = copy.deepcopy(BASE)
        repo_fn(r)
    CASES.append((name, s, expect, r))


def setp(path, value):
    def f(s):
        cur = s
        for k in path[:-1]:
            cur = cur[k]
        cur[path[-1]] = value
    return f


def inject_hash(kind, text):
    def f(r):
        h = sv.h16(" ".join(sv.norm_words(text)))
        if kind == "copy":
            r["hashes"]["copy"]["fullStrings"].append(h)
        else:
            r["hashes"][kind].append(h)
    return f


HERO_P = {"pattern": "static", "reducedMotionFallback": "none-needed"}
GACT = lambda s: next(n for n in s["nodes"] if n["content"].get("actions"))["content"]["actions"][0]
GHERO = lambda s: node(s, "hero.home-banner")["content"]
GMEDIA = lambda s: node(s, "hero.home-banner")["content"]["media"][0]

# ---------------------------------------------------------------- schema layer
case("unknown template id", R_PRICING, setp(["template"], "template.nope"), "SCHEMA")
case("missing mode", R_PRICING, lambda s: s.pop("mode"), "SCHEMA")
case("mode outside enum", R_PRICING, setp(["mode"], "draft"), "SCHEMA")
case("missing copyRole", R_PRICING, lambda s: s.pop("copyRole"), "SCHEMA")
case("invented section id", R_PRICING, lambda s: s["nodes"].insert(3, {"section": "hero.video", "variant": "default", "content": {}, "motion": HERO_P}), "SCHEMA")
case("missing reducedMotionFallback", R_PRICING, lambda s: node(s, "content.faq")["motion"].pop("reducedMotionFallback"), "SCHEMA")
case("wrong reducedMotionFallback for pattern", R_PRICING, lambda s: node(s, "content.faq")["motion"].update(reducedMotionFallback="unchanged"), "SCHEMA")
case("invented motion field", R_PRICING, lambda s: node(s, "content.faq")["motion"].update(inventedAnimation="spin"), "SCHEMA")
case("invented content field", R_PRICING, lambda s: node(s, "pricing.plans-hero")["content"].update(subtitle="Extra line"), "SCHEMA")
case("invented asset role", R_PRICING, lambda s: node(s, "content.faq")["content"]["media"][0].update(assetRole="hero.photo"), "SCHEMA")
case("invented link role", R_PRICING, lambda s: node(s, "pricing.licence-row")["content"]["actions"][0].update(linkRole="link.anything"), "SCHEMA")
case("href scheme outside the allowed set", R_PRICING, lambda s: node(s, "pricing.licence-row")["content"]["actions"][0].update(href="javascript:alert(1)"), "SCHEMA")
case("maxChars overflow (schema layer)", R_PRICING, lambda s: node(s, "pricing.plans-hero")["content"].update(heading="x" * 900), "SCHEMA")
case("list over observed max", R_PRICING, lambda s: node(s, "content.faq")["content"]["items"].extend(copy.deepcopy(node(s, "content.faq")["content"]["items"]) * 6), "SCHEMA")
case("unknown variant", R_PRICING, lambda s: node(s, "content.faq").update(variant="carousel"), "SCHEMA")
case("unknown theme", R_PRICING, setp(["theme"], "sepia"), "THEME_UNSUPPORTED")

# ---------------------------------------------------------------- template linkage / graph rules
case("template/node mismatch (pricing page declared as about)", R_PRICING, setp(["template"], "template.about"), "TEMPLATE_SEQUENCE")
case("required section removed", R_PRICING, lambda s: s["nodes"].pop(idx(s, "pricing.getting-started")), "TEMPLATE_SEQUENCE")
case("sections reordered", R_PRICING, lambda s: s["nodes"].insert(idx(s, "pricing.licence-row"), s["nodes"].pop(idx(s, "content.faq"))), "TEMPLATE_SEQUENCE")
case("variant not observed at this template position", R_ABOUT, lambda s: node(s, "proof.logo-marquee").update(variant="white"), "TEMPLATE_SEQUENCE")
case("template removed from the registry", R_PRICING, lambda s: None, "TEMPLATE_SEQUENCE", lambda r: r["templates"].pop("template.pricing"))
case("router catch-all declared as a page (reference)", R_PRICING, setp(["template"], "template.not-built-fallback"), "FALLBACK_NOT_INSTANTIABLE")
case("second hero", R_EXAMS, lambda s: s["nodes"].insert(idx(s, "hero.product-split") + 1, copy.deepcopy(node(s, "hero.product-split"))), "ONE_HERO")
case("hero added to the hero-less video page", R_VIDEOART, lambda s: s["nodes"].insert(1, copy.deepcopy(node(R_EXAMS, "hero.product-split"))), "ONE_HERO")
case("hero removed", R_PRICING, lambda s: s["nodes"].pop(idx(s, "pricing.plans-hero")), "ONE_HERO")
case("content before the hero", R_EXAMS, lambda s: s["nodes"].insert(idx(s, "hero.product-split"), s["nodes"].pop(idx(s, "content.feature-grid"))), "HERO_FIRST_CONTENT")
case("section over maxPerPage", R_ORAL, lambda s: s["nodes"].insert(idx(s, "content.two-column-rows", 1) + 1, copy.deepcopy(node(s, "content.two-column-rows", 1))), "SECTION_MAX_PER_PAGE")
case("adjacent identical section+variant", R_TRUST, lambda s: node(s, "content.values", 1).update(variant="cream"), "NO_ADJACENT_IDENTICAL")
case("footer moved before content", R_PRICING, lambda s: s["nodes"].insert(2, s["nodes"].pop(idx(s, "shell.footer"))), "SHELL_ORDER")
case("header after the hero", R_EXAMS, lambda s: s["nodes"].insert(1, s["nodes"].pop(0)), "SHELL_ORDER")
case("in-flow content after an overlay panel", R_CASES, lambda s: s["nodes"].insert(idx(s, "listing.study-popup") + 1, copy.deepcopy(node(R_CASES, "conversion.image-cta-band"))), "OVERLAY_LAST")
case("home template on a non-home route", R_HOME, setp(["route"], "/pricing"), "HOME_ROUTE_ONLY")
case("non-home template on '/'", R_PRICING, setp(["route"], "/"), "HOME_ROUTE_ONLY")
case("reference route mapped to another template", R_PRICING, setp(["route"], "/about"), "REFERENCE_ROUTE_IN_TEMPLATE")
case("reference route that the clone does not serve", R_PRICING, setp(["route"], "/blog"), "REFERENCE_ROUTE_IN_TEMPLATE")
case("page mixes colour schemes (pink call to action on a lavender page)", R_EXAMS, lambda s: node(s, "conversion.cta-band").update(variant="pink"), "SCHEME_CONSISTENT")
case("reference-only node in a generated page", G_NEWS, lambda s: s["nodes"].insert(idx(s, "article.categories"), {"section": "article.original-link", "variant": "default", "content": copy.deepcopy(node(R_NEWSART, "article.original-link"))["content"], "motion": HERO_P}), "REFERENCE_ONLY_NODE")
case("too many autoplaying sections (budget lowered in the registry)", R_HOME, lambda s: None, "AUTOPLAY_BUDGET", lambda r: [x.update(max=1) for x in r["graph"]["rules"] if x["id"] == "AUTOPLAY_BUDGET"])

# ---------------------------------------------------------------- content contract
case("maxWords overflow on a real field", R_PRICING, lambda s: node(s, "content.faq")["content"]["items"][0].update(text=" ".join(["ab"] * 400)), "MAX_WORDS")
case("variant forbidden field (registry: lavender hero never renders an eyebrow)", R_EXAMS, lambda s: node(s, "hero.product-split")["content"].update(eyebrow="Short"), "VARIANT_FORBIDDEN_FIELD",
     lambda r: r["contracts"]["hero.product-split"]["variants"]["lavender"].update(forbiddenFields=["eyebrow"]))
case("variant required field missing (registry: lavender hero requires an eyebrow)", R_EXAMS, lambda s: node(s, "hero.product-split")["content"].pop("eyebrow", None), "VARIANT_REQUIRED_FIELD",
     lambda r: r["contracts"]["hero.product-split"]["variants"]["lavender"].update(requiredFields=["eyebrow"]))
case("contract-required field missing", R_PRICING, lambda s: node(s, "pricing.plans-hero")["content"].pop("heading"), "CONTENT_REQUIRED_FIELD")
case("list under observed minimum", R_PRICING, lambda s: node(s, "content.faq")["content"].update(items=[]), "LIST_SIZE")
case("content field the contract does not know (registry: field removed)", R_PRICING, lambda s: None, "CONTENT_FIELD_UNKNOWN", lambda r: r["contracts"]["pricing.plans-hero"]["content"]["fields"].pop("heading"))

# ---------------------------------------------------------------- motion
case("motion pattern not allowed for section", R_PRICING, lambda s: node(s, "pricing.plans-hero").update(motion={"pattern": "marquee.loop", "reducedMotionFallback": "paused-static-row"}), "MOTION_PATTERN_NOT_ALLOWED")
case("required motion pattern missing (logo strip without the loop)", R_PRICING, lambda s: node(s, "proof.logo-marquee").update(motion={"pattern": "static", "reducedMotionFallback": "none-needed"}), "MOTION_REQUIRED_PATTERN")
case("registry fallback edited (motion-patterns.json)", R_PRICING, lambda s: None, "MOTION_FALLBACK", lambda r: r["motion"]["accordion.expand"].update(reducedMotionFallback="keep-animating"))

# ---------------------------------------------------------------- retrieval eligibility (node / contract / allowlist)
case("study panel marked retrievable (node)", R_CASES, lambda s: node(s, "listing.study-popup").update(retrievalEligible=True), "RUNTIME_UI_INELIGIBLE")
case("content section marked ineligible (node)", R_PRICING, lambda s: node(s, "content.faq").update(retrievalEligible=False), "RUNTIME_UI_INELIGIBLE")
case("contract flipped to eligible (registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["listing.study-popup"].update(retrievalEligible=True))
case("allowlist flipped to eligible (registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: [e.update(retrievalEligible=True) for e in r["allowlist"]["entries"] if e["id"] == "utility.not-built"])
case("content contract marked ineligible (registry)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["content.faq"].update(retrievalEligible=False))
case("runtime-looking contract not pinned (dialog title)", R_PRICING, lambda s: None, "RETRIEVAL_PIN_MISMATCH", lambda r: r["contracts"]["pricing.licence-row"].update(title="Licence dialog"))

# ---------------------------------------------------------------- asset / link / copy registry pins
case("registry loosens customer.logo to generation-safe", G_HOME, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["customer.logo"].update(availability="generation-safe"))
case("registry loosens person.photo to reference-only", G_HOME, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["person.photo"].update(availability="reference-only"))
case("pinned policy changed to another valid value (person.photo may-generate-new)", G_HOME, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["person.photo"].update(generationPolicy="may-generate-new"))
case("pinned policy changed (live endpoint may-generate-new)", G_HOME, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["link.live-endpoint"].update(generationPolicy="may-generate-new"))
case("registry drops forbiddenInAllModes", R_PRICING, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["link.live-endpoint"].pop("forbiddenInAllModes"))
case("wordmark set to must-reuse-exact", R_PRICING, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"]["brand.wordmark"].update(generationPolicy="must-reuse-exact"))
case("new role missing from the code pins", R_PRICING, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["roles"]["roles"].update({"sponsor.mark": copy.deepcopy(r["roles"]["roles"]["customer.logo"])}))
case("contract lists a blocked role as generation-safe", G_HOME, lambda s: None, "REGISTRY_PIN_MISMATCH", lambda r: r["contracts"]["hero.home-banner"]["generatedAssetRoles"].append("person.photo"))
case("asset role not allowed for the field", R_EXAMS, lambda s: node(s, "hero.product-split")["content"]["media"][0].update(assetRole="person.photo"), "ASSET_ROLE_NOT_ALLOWED_FOR_FIELD")
case("live endpoint link role (reference mode)", R_PRICING, lambda s: node(s, "pricing.licence-row")["content"]["actions"][0].update(linkRole="link.live-endpoint"), "LIVE_ENDPOINT_ALL_MODES")
case("live form endpoint href (reference mode)", R_ORAL, lambda s: node(s, "conversion.webinar-image-card")["content"]["actions"][0].update(href="https://33l73.share.hsforms.com/2WbnvGYVES3-L7KmQseNTdw", linkRole="link.source-external"), "LIVE_ENDPOINT_ALL_MODES")
case("job-application endpoint href (reference mode)", R_PRICING, lambda s: node(s, "pricing.licence-row")["content"]["actions"][0].update(href="https://apply.workable.com/acme/j/ABC123", linkRole="link.source-external"), "LIVE_ENDPOINT_ALL_MODES")
case("site route labelled as external link", R_PRICING, lambda s: node(s, "pricing.licence-row")["content"]["actions"][0].update(href="#plans", linkRole="link.source-external"), "LINK_ROLE_MISMATCH")
case("source copy claimed verbatim", R_PRICING, setp(["copyRole"], "copy.source-verbatim"), "COPY_ROLE")

# ---------------------------------------------------------------- tokens / policy
SURF = lambda s: node(s, "proof.logo-marquee")
case("unknown token", R_PRICING, lambda s: SURF(s).update(style={"surface": "color.surface.violet"}), "TOKEN_UNKNOWN")
case("raw hex colour", R_PRICING, lambda s: SURF(s).update(style={"surface": "#7f2a23"}), "TOKEN_RAW_COLOR")
case("raw rgb colour", R_PRICING, lambda s: SURF(s).update(style={"surface": "rgb(127,42,35)"}), "TOKEN_RAW_COLOR")
case("arbitrary spacing value", R_PRICING, lambda s: SURF(s).update(style={"surface": "120px"}), "TOKEN_ARBITRARY_SPACING")
case("unsupported font", R_PRICING, lambda s: SURF(s).update(style={"surface": "Georgia"}), "TOKEN_UNSUPPORTED_FONT")
case("unknown font token", R_PRICING, lambda s: SURF(s).update(style={"surface": "font.family.comic"}), "TOKEN_UNSUPPORTED_FONT")
case("surface the section never renders (navy on a logo strip)", R_PRICING, lambda s: SURF(s).update(style={"surface": "color.surface.navy"}), "TOKEN_INVALID_COMBINATION")
case("token of the wrong category (radius as surface)", R_PRICING, lambda s: SURF(s).update(style={"surface": "radius.card"}), "TOKEN_INVALID_COMBINATION")
case("style prop the section does not expose", R_PRICING, lambda s: node(s, "content.faq").update(style={"surface": "color.surface.warm"}), "STYLE_PROP_UNKNOWN")

# ---------------------------------------------------------------- generated mode leakage (controls: the generated examples)
F_PERSON, F_ORG, F_DOMAIN, F_COPY, F_CTA = "Zed Quillfeather", "Marrowgate Analytics", "marrowgate-school.org", "the quiet promise isn't a slogan it's the plan we keep", "Claim your marrowgate seat"
case("source brand in a heading", G_HOME, lambda s: GHERO(s).update(heading="Cadmus for schools"), "GENERATED_MODE_BRAND")
case("source brand as page brand", G_HOME, setp(["brand", "name"], "Cadmus"), "GENERATED_MODE_BRAND")
case("source brand upper-cased", G_HOME, lambda s: GHERO(s).update(heading="CADMUS"), "GENERATED_MODE_BRAND")
case("source brand with a zero-width character inside", G_HOME, lambda s: GHERO(s).update(heading="Cad​mus"), "GENERATED_MODE_BRAND")
case("source brand in full-width letters (NFKC)", G_HOME, lambda s: GHERO(s).update(heading="Ｃａｄｍｕｓ"), "GENERATED_MODE_BRAND")
case("source brand in a handle", G_HOME, lambda s: GHERO(s).update(heading="Follow cadmus_io"), "GENERATED_MODE_BRAND")
case("credited studio named in the footer", G_HOME, lambda s: node(s, "shell.footer")["content"].update(note="Made by Lovework"), "GENERATED_MODE_BRAND")
case("source product name", G_PRODUCT, lambda s: node(s, "hero.product-split")["content"].update(heading="Learning Assurance Analytics"), "GENERATED_MODE_BRAND")
case("source tagline", G_HOME, lambda s: GHERO(s).update(heading="Uplifting Assessment"), "GENERATED_MODE_BRAND")
case("source brand in alt text", G_HOME, lambda s: GMEDIA(s).update(alt="Cadmus dashboard"), "GENERATED_MODE_BRAND")
case("hashed organisation name (mechanism)", G_HOME, lambda s: GHERO(s).update(lead=f"Trusted by {F_ORG} teams"), "GENERATED_MODE_BRAND", inject_hash("orgs", F_ORG))
case("hashed person name (mechanism)", G_HOME, lambda s: GHERO(s).update(lead=f"Says {F_PERSON}"), "GENERATED_MODE_PERSON", inject_hash("persons", F_PERSON))
case("real person photo role", G_HOME, lambda s: GMEDIA(s).update(assetRole="person.photo"), "GENERATED_MODE_PERSON")
case("real customer logo", G_HOME, lambda s: GMEDIA(s).update(assetRole="customer.logo", ref="/assets/1750938797-exeter.png"), "GENERATED_MODE_ASSET")
case("source wordmark reused", G_HOME, lambda s: node(s, "shell.header")["content"]["media"][0].update(assetRole="brand.wordmark", ref="inline:logo--main"), "GENERATED_MODE_ASSET")
case("proprietary screenshot reused", G_HOME, lambda s: GMEDIA(s).update(assetRole="product.screenshot"), "GENERATED_MODE_ASSET")
case("source file path behind a safe role", G_HOME, lambda s: GMEDIA(s).update(ref="/assets/1754544929-a-frame-1430106069.png"), "GENERATED_MODE_ASSET")
case("third-party embed role", G_HOME, lambda s: node(s, "media.featured-video")["content"]["media"][0].update(assetRole="media.third-party-embed", ref="https://player.vimeo.com/video/1"), "GENERATED_MODE_ASSET")
case("review handle and date line", G_HOME, lambda s: GHERO(s).update(lead="quill_reader • 03/04/2025"), "GENERATED_MODE_RATING")
case("review score claim", G_HOME, lambda s: GHERO(s).update(lead="Rated 4.9 out of 5"), "GENERATED_MODE_RATING")
case("source rating claim", G_HOME, lambda s: GHERO(s).update(lead="Rated excellent by students"), "GENERATED_MODE_RATING")
case("app-store mark text", G_HOME, lambda s: GHERO(s).update(lead="Get it on Google Play today"), "GENERATED_MODE_STORE")
case("app-store URL", G_HOME, lambda s: GACT(s).update(href="https://apps.apple.com/app/id1"), "GENERATED_MODE_STORE")
case("source domain URL", G_HOME, lambda s: GACT(s).update(href="https://cadmus.io/pricing"), "GENERATED_MODE_URL")
case("source help-centre URL", G_HOME, lambda s: GACT(s).update(href="https://support.cadmus.io"), "GENERATED_MODE_URL")
case("source social profile URL", G_HOME, lambda s: GACT(s).update(href="https://x.com/cadmus_io"), "GENERATED_MODE_URL")
case("non-reserved absolute URL", G_HOME, lambda s: GACT(s).update(href="https://fernhollow.io/start"), "GENERATED_MODE_URL")
case("source-site route reused", G_HOME, lambda s: GACT(s).update(href="/pricing"), "GENERATED_MODE_URL")
case("third-party embed URL as a link", G_HOME, lambda s: GACT(s).update(href="https://player.vimeo.com/video/1"), "GENERATED_MODE_URL")
case("blocked link role in generated mode", G_HOME, lambda s: GACT(s).update(linkRole="link.source-external"), "GENERATED_MODE_URL")
case("hashed customer domain (mechanism)", G_HOME, lambda s: GACT(s).update(href=f"https://{F_DOMAIN}/join"), "GENERATED_MODE_URL", lambda r: r["hashes"]["customerDomains"].append(sv.h16(F_DOMAIN)))
case("hashed source copy (mechanism)", G_HOME, lambda s: GHERO(s).update(lead=F_COPY.capitalize()), "GENERATED_MODE_COPY", inject_hash("copy", F_COPY))
case("hashed source copy with curly apostrophes and a zero-width character (mechanism)", G_HOME, lambda s: GHERO(s).update(lead="The quiet promise isn’t a slogan it’s the pl​an we keep"), "GENERATED_MODE_COPY", inject_hash("copy", F_COPY))
case("copyRole is not original", G_HOME, setp(["copyRole"], "copy.clone-stand-in"), "GENERATED_MODE_COPY")
case("source-brand CTA", G_HOME, lambda s: GACT(s).update(label="Get Cadmus"), "GENERATED_MODE_CTA")
case("hashed source CTA label (mechanism)", G_HOME, lambda s: GACT(s).update(label=F_CTA), "GENERATED_MODE_CTA", lambda r: r["hashes"]["ctaLabels"].append(sv.h16(" ".join(sv.norm_words(F_CTA)))))
case("live endpoint in a generated page", G_HOME, lambda s: GACT(s).update(href="https://33l73.share.hsforms.com/x"), "LIVE_ENDPOINT_ALL_MODES")
case("generated pricing page naming the brand in a plan", G_PRICE, lambda s: node(s, "pricing.plans-hero")["content"]["items"][0].update(title="Cadmus Pro"), "GENERATED_MODE_BRAND")


# ---------------------------------------------------------------- real-source leakage (strings read from the clone at run time, never stored)
def first_hit(texts, bucket):
    hs = BASE["hashes"]
    pool = set(hs["copy"]["fullStrings"]) if bucket == "copy" else set(hs[bucket])
    for t in texts:
        w = sv.norm_words(t)
        if bucket in ("persons", "orgs") and set(sv.windows(t)) & pool:
            return t
        if bucket == "copy" and len(w) >= hs["copy"]["fullStringMinWords"] and sv.h16(" ".join(w)) in pool:
            return t
        if bucket == "ctaLabels" and len(w) >= 3 and sv.h16(" ".join(w)) in pool:
            return t
        if bucket == "customerDomains":
            h = sv.host_of(t)
            if h and sv.h16(h) in pool:
                return t
    return None


if SIBLING:
    files = list((PROJECT / "src").rglob("*.js")) + list((PROJECT / "src").rglob("*.jsx"))
    src = {str(p): p.read_text() for p in files}
    alltext = list(src.values())
    lits = [x for t in alltext for x in re.findall(r"'([^'\n]{3,300})'", t) + re.findall(r'"([^"\n]{3,300})"', t)]
    jsx_text = [x.strip() for t in alltext for x in re.findall(r">\s*([A-Z][^<>{}\n]{6,120}?)\s*<", t)]
    names = [x for t in alltext for x in re.findall(r'"author":\s*"([A-Z][a-z]+ [A-Z][a-z]+)', t) + re.findall(r"name: '([A-Z][a-z]+ [A-Z][a-z]+)'", t)]
    orgs_t = [x for t in alltext for x in re.findall(r"institution: '([^']+)'", t) + re.findall(r"\b(University of [A-Z][a-z]+)", t)]
    ctas_t = [x for t in alltext for x in re.findall(r"text: '([^']+)', href", t) + re.findall(r'className="(?:button|arrow-button)[^"]*"[^>]*>\s*([^<{]+?)\s*<', t)]
    doms = [x for t in alltext for x in re.findall(r"https://[a-z0-9.-]+", t)]
    person, org = first_hit(names, "persons"), first_hit(orgs_t, "orgs")
    copy_real, cta_real, dom_real = first_hit(lits + jsx_text, "copy"), first_hit(ctas_t, "ctaLabels"), first_hit(doms, "customerDomains")
    for label, val, mk, rule in (("real person's name", person, lambda s, v: GHERO(s).update(lead=f"With {v}"), "GENERATED_MODE_PERSON"),
                                 ("real organisation name", org, lambda s, v: GHERO(s).update(lead=f"Works with {v}"), "GENERATED_MODE_BRAND"),
                                 ("real source copy", copy_real, lambda s, v: GHERO(s).update(lead=v), "GENERATED_MODE_COPY"),
                                 ("real source CTA label", cta_real, lambda s, v: GACT(s).update(label=v), "GENERATED_MODE_CTA"),
                                 ("real customer domain", dom_real, lambda s, v: GACT(s).update(href=v + "/"), "GENERATED_MODE_URL")):
        if val is None:
            SKIPPED.append(f"{label}: no source string matched its hash bucket")
        else:
            case(f"{label} (read from the clone at run time)", G_HOME, lambda s, v=val, mk=mk: mk(s, v), rule)
            if label == "real source copy":
                case("real source copy in curly quotes with zero-width characters (read at run time)", G_HOME, lambda s, v=val: GHERO(s).update(lead=v.replace("'", "’").replace(" ", " ​", 1)), rule)
else:
    SKIPPED.append("real-source leakage cases (person, organisation, copy, CTA, customer domain): no sibling clone source")

TM, CT = sy.load()
SYNTH = [(f"synthesised generated control {tid} ({t['name']})", sy.synthesize(tid, repo=(TM, CT))) for tid, t in TM.items() if t.get("instantiable", True)] + \
        [(f"synthesised rich generated control {tid} ({t['name']})", sy.synthesize(tid, rich=True, repo=(TM, CT), seed=101)) for tid, t in TM.items() if t.get("instantiable", True)]
CONTROLS = [(str(p.relative_to(REPO)), json.loads(p.read_text())) for p in sorted((REPO / "schema/examples").rglob("*.json"))] + \
           [("schema/example.pagespec.json", J("schema/example.pagespec.json"))] + SYNTH
# token control: a legal surface token on the section that owns it passes
_ok = copy.deepcopy(R_PRICING)
node(_ok, "proof.logo-marquee").update(style={"surface": "color.surface.white"})
CONTROLS.append(("control: legal surface token", _ok))


def main():
    fails = 0
    print(f"CONTROLS (must pass with 0 errors): {len(CONTROLS)} ({len(SYNTH)} synthesised from templates.json)")
    for name, s in CONTROLS:
        E, W = sv.validate(s, BASE)
        fails += bool(E)
        print(f"  {'pass' if not E else 'FAIL'}  {name}" + ("" if not E else f"  {E[:3]}"))
    print(f"\nMUTATIONS (must be rejected with the expected rule): {len(CASES)}")
    for name, s, expect, repo in CASES:
        E, W = sv.validate(s, repo)
        rules = {r for r, _ in E} | {r for r, _ in W}
        ok = expect in rules
        fails += not ok
        print(f"  {'rejected' if ok else 'MISSED  '}  [{expect}] {name}" + ("" if ok else f"  got {sorted(rules) or 'no errors'}"))
    for s in SKIPPED:
        print(f"  SKIPPED   {s}")
    gen = sum(1 for _, s in CONTROLS if s.get("mode") == "generated")
    print(f"\nadversarial: {len(CONTROLS)} controls ({gen} generated-mode), {len(CASES)} mutations, {len(SKIPPED)} skipped, {fails} failures")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
