#!/usr/bin/env python3
"""Derive schema/source-brand.json and schema/source-identity-hashes.json: the source-identity registry that PageSpec
`mode: "generated"` must not contain (GENERATED_MODE_* rules in schema/semantic_validate.py).

What it reads (the SIBLING clone project only, never the network): src/**/*.js|jsx string literals and JSX text, index.html.
What it writes:
  schema/source-brand.json             plain regex patterns for the brand itself, its domains/handles, store marks, rating
                                       phrasings, live form endpoints and third-party embeds. Every group carries `evidence`
                                       (path:line rows that resolve in the clone) and `mustMatch` samples re-checked by verify_all.
  schema/source-identity-hashes.json   sha1[:16] of normalised text only: real people, organisations, customer domains, CTA labels
                                       and source copy (full strings + 6-word shingles). Plain text is never stored here.
A seed that cannot be found in the source makes this script fail instead of writing an unevidenced pattern.

NO HUMAN HAS REVIEWED THE DERIVED PATTERNS. They are string heuristics over what the clone's source contains. Detection is
string-based: a paraphrase, a translation, a homoglyph that survives NFKC, text inside an image, or a person/organisation named
only by a first name passes. Normalisation (NFKC, zero-width removal, curly quotes straightened, whitespace collapsed) is applied
before every match.

    python3 extraction/build_source_brand.py            write both files
    python3 extraction/build_source_brand.py --check    exit 1 if either file differs from a fresh derivation
Standalone (no sibling src/) it prints a notice and exits 0.
"""
import hashlib
import json
import os
import re
import sys
import unicodedata

sys.dont_write_bytecode = True
DR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT = os.path.dirname(DR)
OUT_BRAND = os.path.join(DR, "schema", "source-brand.json")
OUT_HASH = os.path.join(DR, "schema", "source-identity-hashes.json")
K, MINW = 6, 4
STR_RE = re.compile(r"""(?P<q>['"`])(?P<t>(?:\\.|(?!(?P=q)).)*)(?P=q)""", re.S)
JSX_TEXT_RE = re.compile(r">([^<>{}]+)<")
BAD_CODE = re.compile(r"[{}=;<>\\]|=>|\$\{|https?://|\.(png|svg|webp|jpe?g|css|jsx?|mp4)\b")
CSS_WORDS = {"flex", "items", "center", "px", "rounded", "text", "bg", "grid", "gap", "mt", "mb", "pt", "pb", "col", "max", "min"}
TITLES = r"(?:Associate Professor|Assistant Professor|Professor|Prof\.?|Dr\.?|Mr\.?|Mrs\.?|Ms\.?)"
ROLE_WORDS = re.compile(r"\b(Chief|Officer|Director|Head|CEO|Founder|Chair|Dean|Vice|Lecturer|University|College|Institute|Cadmus|Board|Learning|Manager|Advisor|Executive|Coordinator|Deputy|Principal|Senior|Staff|Member|Teaching|Students|Education|School|Faculty|Strategy|Global|Support|Partnerships|Associate|Secondment)\b")
GENERIC_ORG_WORDS = {"the", "a", "an", "your", "our", "my", "this", "that", "at", "of", "and", "in", "for", "university", "college", "institute", "school", "technology"}
COMMON_ORG_WORDS = {"canvas", "gradebook", "university", "college", "institute", "school", "group", "studio"}
GENERIC_CTA = ["book a demo", "get a free trial", "request a demo", "contact us", "learn more", "see more", "load more", "show less", "read more", "view all"]
CTA_VERBS = ["start", "try", "get", "join", "explore", "see", "talk", "book", "watch", "download", "learn", "read", "request", "register", "apply", "discover"]


def norm_text(s):
    s = unicodedata.normalize("NFKC", s)
    s = re.sub("[​-‏⁠﻿]", "", s)
    s = s.replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s)


def words(s):
    return re.findall(r"[a-z0-9']+", norm_text(s).lower())


def h16(s):
    return hashlib.sha1(s.encode()).hexdigest()[:16]


def read(rel):
    with open(os.path.join(PROJECT, rel), encoding="utf-8", errors="replace") as fh:
        return fh.read()


def source_files():
    out = []
    for root, _, fs in os.walk(os.path.join(PROJECT, "src")):
        for fn in sorted(fs):
            if fn.endswith((".js", ".jsx")):
                out.append(os.path.relpath(os.path.join(root, fn), PROJECT))
    return sorted(out)


class Finder:
    def __init__(self):
        self.files = source_files() + ["index.html"]
        self.cache = {}

    def lines(self, rel):
        if rel not in self.cache:
            self.cache[rel] = read(rel).split("\n")
        return self.cache[rel]

    def find(self, rx, nth=1):
        seen = 0
        for rel in self.files:
            for i, ln in enumerate(self.lines(rel), 1):
                if re.search(rx, norm_text(ln), re.I):
                    seen += 1
                    if seen == nth:
                        return f"{rel}:{i}"
        raise SystemExit("build_source_brand: seed %r not found in the source tree; refusing to write an unevidenced pattern" % rx)


def literals():
    """[(file, line, text)] every string literal and JSX text of src/ (raw, unfiltered)."""
    out = []
    for rel in source_files():
        text = read(rel)
        starts = [0] + [m.end() for m in re.finditer("\n", text)]

        def line_of(pos):
            lo, hi = 0, len(starts) - 1
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if starts[mid] <= pos:
                    lo = mid
                else:
                    hi = mid - 1
            return lo + 1
        for m in STR_RE.finditer(text):
            out.append((rel, line_of(m.start("t")), m.group("t").replace("\\'", "'").replace('\\"', '"')))
        for m in JSX_TEXT_RE.finditer(text):
            out.append((rel, line_of(m.start(1)), m.group(1)))
    return out


def phrases(lits):
    """human-readable strings of >= 4 words (source copy), unique by word sequence."""
    found = {}
    for rel, ln, raw in lits:
        c = norm_text(raw).strip()
        if not c or BAD_CODE.search(c) or c.count(" ") < 3 or c[0] in ",)]}[(":
            continue
        w = words(c)
        if len(w) < 4:
            continue
        if sum(1 for x in w if re.fullmatch(r"[a-z']+", x)) / float(len(w)) < 0.7:
            continue
        if sum(1 for x in w if x in CSS_WORDS) >= 3:
            continue
        found.setdefault(tuple(w), (rel, ln, c))
    return sorted(found.values())


def clean_name(s):
    s = norm_text(s).strip().strip(",.;")
    s = re.sub(r"\b(CBS|OBE|AM|AO|PhD)\b", "", s).strip()
    return s


def person_candidates(lits, text_by_file):
    names = set()

    def add(raw):
        raw = clean_name(raw)
        for part in re.split(r"\s+and\s+|,", raw):
            part = clean_name(part)
            if not part or ROLE_WORDS.search(part):
                continue
            bare = re.sub(r"^" + TITLES + r"\s+", "", part)
            toks = bare.split()
            if 2 <= len(toks) <= 4 and all(re.match(r"^[A-Z][\w'’-]*$", t) for t in toks):
                names.add(bare)
                if bare != part:
                    names.add(part)
    for rel, t in text_by_file.items():
        for m in re.finditer(r'"?author"?\s*:\s*"([^"]*)"', t):
            add(m.group(1))
        for m in re.finditer(r"author\s*:\s*'([^']*)'", t):
            add(m.group(1))
        for m in re.finditer(r'"author"\s*:\s*\[\s*"([^"]*)"', t):
            add(m.group(1))
        for m in re.finditer(r"author=\"([^\"]+)\"", t):
            add(m.group(1))
        for m in re.finditer(r"\{\s*name:\s*'([^']+)',\s*(?:role|institution|bio)", t):
            add(m.group(1))
        for m in re.finditer(r"(?:Illustrations|Photography|Photos|Design|Words|Made with[^b]{0,40}) by (?:<[^>]+>)?\s*([A-Z][a-z]+ [A-Z][a-z]+)", t):
            add(m.group(1))
    return sorted(names)


ORG_RX = re.compile(r"\b((?:The )?University of [A-Z][A-Za-z'’]+(?: (?:of |the |and )?[A-Z][A-Za-z'’]+){0,3}|[A-Z][A-Za-z'’]+(?: [A-Z][A-Za-z'’]+){0,2} (?:University|College|Institute of Technology|Institute))\b")


def org_candidates(lits, text_by_file):
    orgs = set()
    for rel, ln, raw in lits:
        for m in ORG_RX.finditer(raw):
            orgs.add(m.group(1))
    for rel, t in text_by_file.items():
        for m in re.finditer(r"institution:\s*'([^']+)'", t):
            orgs.add(m.group(1))
        for m in re.finditer(r'"author"\s*:\s*\[\s*"[^"]*"\s*,\s*"([^"]+)"', t):
            orgs.add(m.group(1))
        for m in re.finditer(r"^\s*name:\s*'([^']+)',?\s*$", t, re.M):
            if rel.endswith(("universities.js", "CaseStudyCarousel.jsx")):
                orgs.add(m.group(1))
    t = text_by_file.get("src/components/Integrations.jsx", "")
    for m in re.finditer(r"\['([^'\n]+)', '/assets/", t):
        orgs.add(m.group(1))
    for rel, t in text_by_file.items():
        for m in re.finditer(r"\b(Nous Group|Lovework Studio|Emerge/Jisc|Jisc|Emerge|Vimeo|Marker\.io)\b", t):
            orgs.add(m.group(1))
    out = set()
    for o in orgs:
        o = norm_text(o).strip()
        for cand in {o, re.sub(r"^The ", "", o)}:
            w = words(cand)
            if 1 <= len(w) <= 4 and not (len(w) == 1 and w[0] in COMMON_ORG_WORDS) and any(x not in GENERIC_ORG_WORDS for x in w):
                out.add(" ".join(w))
    return sorted(out), sum(1 for o in orgs if len(words(o)) == 1 and words(o)[0] in COMMON_ORG_WORDS)


def cta_labels(text_by_file):
    labs = set()
    for rel, t in text_by_file.items():
        for m in re.finditer(r'className="(?:button|arrow-button|roi-button)[^"]*"[^>]*>\s*([^<{\n][^<{]*?)\s*<', t):
            labs.add(m.group(1))
        for m in re.finditer(r"\{\s*text:\s*'([^']+)',\s*href", t):
            labs.add(m.group(1))
        for m in re.finditer(r"button\s*[:=]\s*\{\s*text:\s*'([^']+)'", t):
            labs.add(m.group(1))
        for m in re.finditer(r"text: '([^']+)', style:", t):
            labs.add(m.group(1))
    out = set()
    for x in labs:
        w = words(x)
        if 3 <= len(w) <= 10 and " ".join(w) not in GENERIC_CTA:
            out.add(h16(" ".join(w)))
    return sorted(out)


def hosts(text_by_file):
    hs = set()
    for rel, t in text_by_file.items():
        for m in re.finditer(r"https?://([A-Za-z0-9.-]+)", t):
            h = m.group(1).lower()
            hs.add(h[4:] if h.startswith("www.") else h)
    return hs


def derive():
    f = Finder()
    text_by_file = {rel: read(rel) for rel in source_files()}
    lits = literals()
    ev = f.find
    brand = {
        "note": "Source identity registry used by schema/semantic_validate.py in generated mode. Only the brand itself, its domains, generic store/rating patterns and live endpoints are kept as plain patterns; real people, organisations, customer domains, CTA labels and copy are stored as hashes in schema/source-identity-hashes.json so this repo never transcribes them. DERIVED BY extraction/build_source_brand.py; no human has reviewed the set.",
        "normalization": "Before matching, every string is NFKC-normalised, zero-width characters (U+200B-200F, U+2060, U+FEFF) are removed, curly quotes become straight quotes and runs of whitespace collapse to one space. Patterns are matched case-insensitively with re.search.",
        "reviewStatus": "UNREVIEWED. Detection is string-based: a paraphrase, a translation, a homoglyph that survives NFKC, text inside an image, or a first-name-only reference passes.",
        "sourceBrand": {
            "patterns": [r"\bcadmus\b", r"cadmus[_.-]?io", r"\blovework\b", r"\blearning assurance analytics\b", r"\buplifting assessment\b"],
            "mustMatch": ["Cadmus", "CADMUS", "cadmus_io", "The Cadmus Chronicle", "Lovework", "Learning Assurance Analytics", "Uplifting Assessment"],
            "evidence": [ev(r"\bCadmus\b"), ev(r"cadmus_io|cadmus\.io"), ev(r"Lovework"), ev(r"Learning Assurance Analytics"), ev(r"Uplifting Assessment")],
            "note": "The ordinary Greek-mythology name Cadmus is blocked on purpose: it is the source brand. 'Lovework' is the studio credited in the footer; 'Learning Assurance Analytics' and 'Uplifting Assessment' are the source's product name and tagline.",
        },
        "sourceDomains": {
            "patterns": [r"(^|[/.@])cadmus\.io", r"cadmus[-_.]io", r"lovework\.studio", r"(linkedin|facebook)\.com/(company/)?cadmus", r"x\.com/cadmus"],
            "mustMatch": ["https://cadmus.io/pricing", "support.cadmus.io", "https://lovework.studio", "https://x.com/cadmus_io", "https://www.facebook.com/cadmus.io", "https://www.linkedin.com/company/cadmus-io"],
            "evidence": [ev(r"https://cadmus\.io"), ev(r"support\.cadmus\.io"), ev(r"lovework\.studio"), ev(r"x\.com/cadmus"), ev(r"linkedin\.com/company/cadmus")],
        },
        "storeAndMarketplace": {
            "patterns": [r"\bapp store\b", r"\bgoogle play\b", r"apps\.apple\.com", r"play\.google\.com", r"\btestflight\b"],
            "mustMatch": ["Download on the App Store", "Get it on Google Play", "https://apps.apple.com/app/id1", "TestFlight"],
            "evidence": [ev(r"https://cadmus\.io")],
            "precautionary": True,
            "note": "The clone renders no app-store mark or link; these generic patterns are precautionary (evidence row only shows the source's domain).",
        },
        "rating": {
            "patterns": [r"\S+ • \d{2}/(\d{2}/)?\d{4}", "★", r"\b[0-5](\.\d)?\s*(/\s*5|out of 5|stars?)\b", r"\brated (excellent|highly|\d)", r"\bnet promoter\b"],
            "mustMatch": ["reader_1 • 03/04/2025", "★★★★★", "4.9 out of 5", "Rated excellent by students"],
            "evidence": [ev(r"Rated excellent by students")],
            "note": "The source renders no review site rating; its nearest claim is the 'rated excellent by students' highlight on case studies, blocked together with generic score phrasings.",
        },
        "liveEndpoints": {
            "patterns": [r"hsforms\.(com|net)", r"forms\.hubspot\.com", r"apply\.workable\.com", r"typeform\.com"],
            "mustMatch": ["https://33l73.share.hsforms.com/x", "https://apply.workable.com/acme/j/1", "https://x.typeform.com/to/1"],
            "evidence": [ev(r"share\.hsforms\.com"), ev(r"apply\.workable\.com")],
            "note": "The webinar registration button and the job cards link to live third-party form / application endpoints. Forbidden in every mode; reference examples replace them with '#'.",
        },
        "thirdPartyEmbeds": {
            "patterns": [r"vimeo\.com", r"onelineplayer\.com", r"storylane\.io"],
            "mustMatch": ["https://player.vimeo.com/video/1"],
            "evidence": [ev(r"player\.vimeo\.com")],
        },
        "cta": {
            "verbs": CTA_VERBS,
            "genericLabels": GENERIC_CTA,
            "rule": "a generated action label is rejected when it starts with one of these verbs and names the source brand/product, or when it equals a source CTA label of 3+ words (hashed) that is not one of the generic labels.",
        },
    }
    for k in ("sourceBrand", "sourceDomains", "storeAndMarketplace", "rating", "liveEndpoints", "thirdPartyEmbeds"):
        rx = re.compile("|".join("(?:%s)" % p for p in brand[k]["patterns"]), re.I)
        for s in brand[k]["mustMatch"]:
            if not rx.search(norm_text(s)):
                raise SystemExit("build_source_brand: pattern group %s does not match its own mustMatch sample %r" % (k, s))
    persons = person_candidates(lits, text_by_file)
    orgs, excluded = org_candidates(lits, text_by_file)
    own = {"cadmus.io", "support.cadmus.io", "player.vimeo.com", "apply.workable.com", "x.com", "linkedin.com", "facebook.com", "lovework.studio", "w3.org"}
    cust = sorted(h for h in hosts(text_by_file) if h not in own and "hsforms" not in h and "cadmus" not in h)
    ph = phrases(lits)
    fulls, shingles = set(), set()
    for rel, ln, c in ph:
        w = words(c)
        if len(w) >= MINW:
            fulls.add(h16(" ".join(w)))
        for j in range(len(w) - K + 1):
            shingles.add(h16(" ".join(w[j:j + K])))
    hashes = {
        "algorithm": "sha1(normalised text) truncated to 16 hex chars",
        "normalisation": "NFKC; zero-width removed; curly quotes straightened; lowercase; words = regex [a-z0-9']+ joined by single spaces. Persons/orgs: every 1-4 word window of a candidate string is checked against the hashed full names. Copy: full strings of >= fullStringMinWords words and every shingleSize-word shingle.",
        "provenance": "persons, organisations, customer domains, CTA labels and copy hashed by extraction/build_source_brand.py from the string literals and JSX text of the clone's src/. Plain text is never stored. UNREVIEWED by a human; first-name-only references and paraphrases are not detected.",
        "persons": sorted(h16(" ".join(words(p))) for p in persons),
        "orgs": sorted({h16(o) for o in orgs}),
        "orgsExcludedAsCommonWords": excluded,
        "customerDomains": sorted(h16(h) for h in cust),
        "ctaLabels": cta_labels(text_by_file),
        "copy": {"shingleSize": K, "fullStringMinWords": MINW, "fullStrings": sorted(fulls), "shingles": sorted(shingles)},
    }
    return brand, hashes, {"persons": len(persons), "orgs": len(orgs), "domains": len(cust), "phrases": len(ph)}


def dumps(d):
    return json.dumps(d, indent=1, ensure_ascii=False) + "\n"


if __name__ == "__main__":
    if not os.path.isdir(os.path.join(PROJECT, "src")):
        print("build_source_brand: no sibling src/ (standalone copy of design-repo); nothing to derive")
        sys.exit(0)
    brand, hashes, stats = derive()
    if "--check" in sys.argv:
        bad = [p for p, d in ((OUT_BRAND, brand), (OUT_HASH, hashes)) if not os.path.exists(p) or open(p, encoding="utf-8").read() != dumps(d)]
        print("source-brand / identity hashes differ from a fresh derivation: " + ", ".join(os.path.basename(b) for b in bad) if bad else "source-brand + identity hashes match a fresh derivation")
        sys.exit(1 if bad else 0)
    for p, d in ((OUT_BRAND, brand), (OUT_HASH, hashes)):
        with open(p, "w", encoding="utf-8") as fh:
            fh.write(dumps(d))
    print("wrote schema/source-brand.json and schema/source-identity-hashes.json", stats)
