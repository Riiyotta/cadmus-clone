#!/usr/bin/env python3
"""Whole-page-wrapper quality gate (R9). Called by extraction/verify_all.py; also runnable alone.

Reads measured 1440px heights from extraction/measured-values.json -> sectionHeights (every served route).
  - HERO taller than HERO_WARN_PX warns; taller than HERO_FAIL_PX fails unless whitelisted.
  - one in-flow section holding > SHARE_WARN of its page (document height) warns; > SHARE_FAIL fails unless whitelisted
    (pages with fewer than MIN_SECTIONS in-flow sections are skipped; SHELL and fixed/overlay UI take no share).
  - every served route must be measured, at REQUIRED_VIEWPORT, with a node sequence that matches its template, and
    the route's reference example must list the same in-flow nodes.
  - whitelist entries need reviewedBy, a justification of >= 30 chars and maxHeightPx above the measured height;
    stale entries fail; a whitelisted hit still warns; an agent reviewer must say it is an agent attestation.
Thresholds are pinned here, not read from JSON.
"""
import json, re, sys
from pathlib import Path

sys.dont_write_bytecode = True
HERO_WARN_PX = 1800
HERO_FAIL_PX = 3000
SHARE_WARN = 0.50
SHARE_FAIL = 0.60
REQUIRED_VIEWPORT = 1440
MIN_SECTIONS = 3
AGENT_PHRASE = "agent attestation, not a human sign-off"
REPO = Path(__file__).resolve().parent.parent


def _pat(n):
    v = "|".join(re.escape(x) for x in n.get("variants") or []) or r"[a-z0-9-]+"
    b = rf"(?:{re.escape(n['section'])}#(?:{v});)"
    if n.get("repeatable"):
        lo = n.get("minCount", 1) if n["required"] else 0
        lo = n.get("referenceMinCount", lo)
        return b + "{%d,%d}" % (lo, n.get("maxCount", 99))
    return b if n["required"] else b + "?"


def run(repo=REPO, mv=None):
    """returns (errors, warnings, stats)"""
    repo = Path(repo)
    E, W = [], []
    mv = mv if mv is not None else json.loads((repo / "extraction/measured-values.json").read_text())
    rdoc = json.loads((repo / "templates/routes.json").read_text())
    probe = (rdoc.get("fallback") or {}).get("probePath")
    served = list(rdoc["routes"]) + ([{"path": probe, "template": rdoc["fallback"]["template"]}] if probe else [])
    templates = json.loads((repo / "templates/templates.json").read_text())["templates"]
    contracts = {p.stem: json.loads(p.read_text()) for p in (repo / "sections").glob("*.json")}
    sh = mv.get("sectionHeights") or {}
    if sh.get("viewport") != REQUIRED_VIEWPORT:
        E.append(f"WRAPPER_VIEWPORT: sectionHeights measured at {sh.get('viewport')!r}, required {REQUIRED_VIEWPORT}")
    measured = sh.get("routes") or {}
    wl = mv.get("wrapperGateWhitelist", [])
    used = set()
    for i, w in enumerate(wl):
        for k in ("route", "section", "reviewedBy", "justification", "maxHeightPx"):
            if k not in w:
                E.append(f"WRAPPER_WHITELIST: entry {i} missing {k}")
        if len(str(w.get("justification", ""))) < 30:
            E.append(f"WRAPPER_WHITELIST: entry {i} justification shorter than 30 chars")
        if "agent" in str(w.get("reviewedBy", "")).lower() and AGENT_PHRASE not in str(w.get("reviewedBy", "")):
            E.append(f"WRAPPER_WHITELIST: entry {i} reviewedBy is an agent but does not say '{AGENT_PHRASE}'")

    def whitelisted(route, sid, h):
        for i, w in enumerate(wl):
            if w.get("route") == route and w.get("section") == sid:
                used.add(i)
                if not isinstance(w.get("maxHeightPx"), (int, float)) or w["maxHeightPx"] <= h:
                    E.append(f"WRAPPER_WHITELIST: {route} {sid} measured {h}px exceeds whitelisted maxHeightPx {w.get('maxHeightPx')}")
                    return False
                return True
        return False

    stats = {"pages": 0, "maxHeroPx": 0, "maxSharePct": 0.0, "whitelistHits": 0}
    for r in served:
        route = r["path"]
        m = measured.get(route)
        if m is None:
            E.append(f"WRAPPER_MISSING_MEASUREMENT: served route {route} has no {REQUIRED_VIEWPORT} measurement")
            continue
        t = templates.get(m.get("template"))
        if t is None or m.get("template") != r["template"]:
            E.append(f"WRAPPER_UNKNOWN_TEMPLATE: {route} measured as {m.get('template')!r}, routes.json says {r['template']}")
            continue
        seq = "".join(f"{n['section']}#{n['variant']};" for n in m["nodes"])
        if not re.fullmatch("".join(_pat(n) for n in t["nodes"]), seq):
            E.append(f"WRAPPER_STRUCTURE_MISMATCH: {route} measured nodes do not match template {m['template']}")
        stats["pages"] += 1
        inflow = [n for n in m["nodes"] if not n.get("overlay") and not n.get("fixed") and contracts.get(n["section"], {}).get("semantic", {}).get("category") != "SHELL"]
        page_h = m.get("docHeightPx")
        for n in m["nodes"]:
            if n["section"] not in contracts:
                E.append(f"WRAPPER_UNKNOWN_SECTION: {route} measured {n['section']} has no contract")
            elif not isinstance(n.get("heightPx"), (int, float)):
                E.append(f"WRAPPER_MISSING_MEASUREMENT: {route} {n['section']} has no heightPx")
        for n in inflow:
            sid, h = n["section"], n.get("heightPx")
            c = contracts.get(sid)
            if c is None or not isinstance(h, (int, float)):
                continue
            if c["semantic"]["category"] == "HERO":
                stats["maxHeroPx"] = max(stats["maxHeroPx"], h)
                if h > HERO_FAIL_PX:
                    if whitelisted(route, sid, h):
                        W.append(f"WRAPPER_HERO: {route} {sid} {h}px > {HERO_FAIL_PX} (whitelisted)")
                    else:
                        E.append(f"WRAPPER_HERO: {route} {sid} is {h}px (> {HERO_FAIL_PX}px): a HERO is the page-opening composition only")
                elif h > HERO_WARN_PX:
                    W.append(f"WRAPPER_HERO: {route} {sid} is {h}px (> {HERO_WARN_PX}px)")
            if len(inflow) >= MIN_SECTIONS and page_h:
                share = h / page_h
                stats["maxSharePct"] = max(stats["maxSharePct"], round(share * 100, 1))
                if share > SHARE_FAIL:
                    if whitelisted(route, sid, h):
                        stats["whitelistHits"] += 1
                        W.append(f"WRAPPER_SHARE: {route} {sid} holds {share:.0%} of the page (whitelisted)")
                    else:
                        E.append(f"WRAPPER_SHARE: {route} {sid} holds {share:.0%} of the page (> {SHARE_FAIL:.0%}): decompose it")
                elif share > SHARE_WARN:
                    W.append(f"WRAPPER_SHARE: {route} {sid} holds {share:.0%} of the page (> {SHARE_WARN:.0%})")
    for f in sorted((repo / "schema/examples/reference").glob("*.json")):
        spec = json.loads(f.read_text())
        m = measured.get(spec["route"])
        if m is None:
            E.append(f"WRAPPER_MISSING_MEASUREMENT: reference example {f.name} route {spec['route']} not measured")
            continue
        a = [(n["section"], n["variant"]) for n in spec["nodes"]]
        b = [(n["section"], n["variant"]) for n in m["nodes"]]
        if a != b:
            E.append(f"WRAPPER_STRUCTURE_MISMATCH: {f.name} nodes != measured nodes of {spec['route']}")
    for i, w in enumerate(wl):
        if i not in used:
            E.append(f"WRAPPER_WHITELIST: entry {i} ({w.get('route')} {w.get('section')}) is stale: no measured hit uses it")
    return E, W, stats


if __name__ == "__main__":
    E, W, S = run()
    for e in E:
        print("ERROR", e)
    for w in W[:40]:
        print("warn ", w)
    print(f"wrapper gate: {len(E)} errors, {len(W)} warnings, {S}")
    sys.exit(1 if E else 0)
