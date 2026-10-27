#!/usr/bin/env python3
"""Synthesise a generation-safe PageSpec for any template, purely from templates/templates.json + section contracts.

    python3 schema/synthesize.py <template-id> [--rich] [--brand "Name"] [--domain name.example]

Used by schema/tests/adversarial_test.py (one generated-mode control per template, minimal and rich, so a new or split
template is covered with zero new test code) and to produce schema/examples/generated/*. Copy is neutral filler from a fixed
word list (never source copy), sized inside each field's maxWords/maxChars budget; assets use generation-safe roles with
`generate:` refs; links use a reserved `.example` host; reference-only nodes are skipped. Stdlib only; the repo root is
derived from this file. `content_for` is also what the reference examples were sized with (copy sizes per measured node).
"""
import json, sys
from pathlib import Path

sys.dont_write_bytecode = True
REPO = Path(__file__).resolve().parent.parent
LEX = ("lantern field ledger harbor sprout orbit meadow quarry signal thread compass pebble harvest beacon atlas "
       "willow ember cobalt tidal summit grove prism cinder marble falcon cedar delta nimbus juniper basil rowan fjord "
       "plan sort share notice tidy shape gather sketch weigh map trace bundle steer refine measure kettle lumen "
       "orchard velvet saffron current ribbon anchor pillar horizon thistle copper linen walnut mosaic ripple").split()


class Gen:
    def __init__(self, seed=7):
        self.i = seed

    def words(self, n):
        out = []
        for _ in range(n):
            self.i = (self.i * 1103515245 + 12345) % 2147483648
            out.append(LEX[self.i % len(LEX)])
        return out

    def text(self, max_words, max_chars, want=None):
        n = max(1, min(max_words, want if want else max(1, min(8, (max_words + 1) // 2))))
        s = " ".join(self.words(n))
        s = s[0].upper() + s[1:]
        while len(s) > max_chars and " " in s:
            s = s.rsplit(" ", 1)[0]
        return s[:max_chars]


def load():
    tm = json.loads((REPO / "templates/templates.json").read_text())["templates"]
    contracts = {p.stem: json.loads(p.read_text()) for p in sorted((REPO / "sections").glob("*.json"))}
    return tm, contracts


def motion_patterns():
    return json.loads((REPO / "tokens/00-foundation/motion-patterns.json").read_text())["patterns"]


def motion_for(c, mp):
    req = list(c["motion"]["requiredPatterns"])
    allowed = c["motion"]["allowedPatterns"]
    first = req[0] if req else ("static" if "static" in allowed else allowed[0])
    m = {"pattern": first, "reducedMotionFallback": mp[first]["reducedMotionFallback"]}
    rest = [p for p in req if p != first]
    if rest:
        m["additional"] = [{"pattern": p, "reducedMotionFallback": mp[p]["reducedMotionFallback"]} for p in rest]
    return m


def content_for(c, variant, g, rich, domain, want=None, generated=True):
    """want: optional {field path: words} / {list: count} targets (reference examples size copy to the measured length)."""
    want = want or {}
    f = c["content"]["fields"]
    vd = c["variants"][variant]
    ls = c["content"]["listSizes"]
    top = set(vd["requiredFields"]) | set(c["content"]["requiredFields"]) | {k for k in want if k in ("eyebrow", "heading", "lead", "note", "attribution", "items", "bullets", "actions", "media")}
    if rich:
        top |= {k.split("[")[0] for k in f} | set(ls)
    top -= set(vd["forbiddenFields"])
    out = {}
    T = lambda path: g.text(f[path]["maxWords"], f[path]["maxChars"], want.get(path))
    for key in ("eyebrow", "heading", "lead", "note", "attribution"):
        if key in top and key in f:
            out[key] = T(key)
    n = lambda k: max(1, min(ls[k][1], want.get(k, ls[k][0] if rich is False else min(ls[k][1], max(ls[k][0], 2)))))
    if "items" in top and "items" in ls:
        items = []
        for _ in range(n("items")):
            it = {}
            if "items[].title" in f:
                it["title"] = T("items[].title")
            if "items[].text" in f and (rich or "items[].title" not in f or want.get("items[].text")):
                it["text"] = T("items[].text")
            items.append(it)
        out["items"] = items
    if "bullets" in top and "bullets" in ls:
        out["bullets"] = [T("bullets[]") for _ in range(n("bullets"))]
    if "actions" in top and "actions" in ls:
        out["actions"] = [{"label": T("actions[].label"), "href": f"https://{domain}/{g.words(1)[0]}", "linkRole": "link.placeholder"} for _ in range(n("actions"))]
    if "media" in top and "media" in ls:
        roles = c["assets"]["fields"]["media[]"]["generatedRoles"]
        media = []
        for k in range(n("media")):
            m = {"assetRole": roles[k % len(roles)], "ref": f"generate:{'-'.join(g.words(3))}"}
            if "media[].alt" in f and rich:
                m["alt"] = T("media[].alt")
            media.append(m)
        out["media"] = media
    return out


def synthesize(tid, rich=False, brand="Fernhollow Studio", domain="fernhollow.example", repo=None, seed=11):
    tm, contracts = repo or load()
    mp = motion_patterns()
    t = tm[tid]
    g = Gen(seed)
    nodes = []
    for nd in t["nodes"]:
        if not nd["required"] or nd.get("modes") == ["reference"]:
            continue
        c = contracts[nd["section"]]
        count = nd.get("minCount", 1) if nd.get("repeatable") else 1
        for k in range(count):
            v = nd["variants"][k % len(nd["variants"])]
            nodes.append({"section": nd["section"], "variant": v, "content": content_for(c, v, g, rich, domain), "motion": motion_for(c, mp)})
    route = "/" if tid == "template.home" else f"/{t['family']}-{g.words(1)[0]}"
    return {"pageSpecVersion": json.loads((REPO / "schema/pagespec.schema.json").read_text())["properties"]["pageSpecVersion"]["const"],
            "mode": "generated", "template": tid, "route": route, "theme": t["theme"], "brand": {"name": brand}, "copyRole": "copy.original", "nodes": nodes}


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(2)
    kw = {"rich": "--rich" in a}
    if "--brand" in a:
        kw["brand"] = a[a.index("--brand") + 1]
    if "--domain" in a:
        kw["domain"] = a[a.index("--domain") + 1]
    print(json.dumps(synthesize(a[0], **kw), indent=1))
