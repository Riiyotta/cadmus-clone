#!/usr/bin/env python3
"""Generate schema/pagespec.schema.json and schema/section-contract.schema.json from the registries.

    python3 schema/build_schema.py            write both files
    python3 schema/build_schema.py --check    exit 1 if either file differs from a fresh generation

Inputs (all inside this folder): sections/*.json, templates/templates.json, assets/asset-roles.json,
tokens/00-foundation/motion-patterns.json, tokens/themes/*.json. Nothing is hand-edited in the two outputs:
extraction/verify_all.py regenerates them in memory and fails on any difference (SCHEMAS check).
Stdlib only; the repo root is derived from this file.
"""
import json
import sys
from pathlib import Path

sys.dont_write_bytecode = True
REPO = Path(__file__).resolve().parent.parent
PAGESPEC_VERSION = "1.0.0"
CATEGORIES = ["SHELL", "HERO", "CONTENT", "PROOF", "MEDIA", "PRICING", "CONVERSION", "LISTING", "ARTICLE", "UTILITY"]


def jl(rel):
    return json.loads((REPO / rel).read_text())


def build():
    contracts = {p.stem: json.loads(p.read_text()) for p in sorted((REPO / "sections").glob("*.json"))}
    templates = jl("templates/templates.json")["templates"]
    roles = jl("assets/asset-roles.json")["roles"]
    patterns = jl("tokens/00-foundation/motion-patterns.json")["patterns"]
    themes = sorted(p.stem for p in (REPO / "tokens/themes").glob("*.json"))
    role_enum = lambda kind: sorted(r for r, d in roles.items() if d["kind"] == kind)
    text = {"type": "string", "minLength": 1}

    defs = {
        "text": text,
        "assetRole": {"type": "string", "enum": role_enum("media")},
        "linkRole": {"type": "string", "enum": role_enum("link")},
        "href": {"type": "string", "pattern": "^(https://[A-Za-z0-9.-]+(/[^\\s]*)?|/[^\\s]*|#[A-Za-z0-9_-]*|mailto:[^\\s]+)$"},
        "action": {"type": "object", "additionalProperties": False, "required": ["label", "href", "linkRole"],
                   "properties": {"label": {"$ref": "#/definitions/text"}, "href": {"$ref": "#/definitions/href"}, "linkRole": {"$ref": "#/definitions/linkRole"}}},
        "motionEntry": {"oneOf": [{"type": "object", "additionalProperties": False, "required": ["pattern", "reducedMotionFallback"],
                                   "properties": {"pattern": {"const": p}, "reducedMotionFallback": {"const": d["reducedMotionFallback"]}}} for p, d in sorted(patterns.items())]},
        "motion": {"type": "object", "additionalProperties": False, "required": ["pattern", "reducedMotionFallback"],
                   "properties": {"pattern": {"type": "string", "enum": sorted(patterns)}, "reducedMotionFallback": {"type": "string"},
                                  "additional": {"type": "array", "maxItems": 4, "items": {"$ref": "#/definitions/motionEntry"}}},
                   "allOf": [{"if": {"properties": {"pattern": {"const": p}}}, "then": {"properties": {"reducedMotionFallback": {"const": d["reducedMotionFallback"]}}}} for p, d in sorted(patterns.items())]},
    }

    def tf(c, name):
        f = c["content"]["fields"][name]
        return {"type": "string", "minLength": 1, "maxLength": f["maxChars"]}

    for sid, c in contracts.items():
        fields, lists = c["content"]["fields"], c["content"]["listSizes"]
        props = {}
        for k in ("eyebrow", "heading", "lead", "note", "attribution"):
            if k in fields:
                props[k] = tf(c, k)
        if "items" in lists:
            ip = {}
            for k in ("title", "text"):
                if f"items[].{k}" in fields:
                    ip[k] = tf(c, f"items[].{k}")
            props["items"] = {"type": "array", "maxItems": lists["items"][1], "items": {"type": "object", "additionalProperties": False, "minProperties": 1, "properties": ip}}
        if "bullets" in lists:
            props["bullets"] = {"type": "array", "maxItems": lists["bullets"][1], "items": tf(c, "bullets[]")}
        if "actions" in lists:
            props["actions"] = {"type": "array", "maxItems": lists["actions"][1], "items": {"$ref": "#/definitions/action"}}
        if "media" in lists:
            mp = {"assetRole": {"$ref": "#/definitions/assetRole"}, "ref": {"type": "string", "minLength": 1}}
            if "media[].alt" in fields:
                mp["alt"] = tf(c, "media[].alt")
            props["media"] = {"type": "array", "maxItems": lists["media"][1], "items": {"type": "object", "additionalProperties": False, "required": ["assetRole", "ref"], "properties": mp}}
        defs[f"content.{sid}"] = {"type": "object", "additionalProperties": False, "required": sorted(c["content"]["requiredFields"]), "properties": props}

    node_all = []
    for sid, c in contracts.items():
        style = {"type": "object", "additionalProperties": False, "properties": {p: {"type": "string"} for p in sorted(c["style"]["props"])}}
        node_all.append({"if": {"properties": {"section": {"const": sid}}, "required": ["section"]},
                         "then": {"properties": {"variant": {"enum": sorted(c["variants"])}, "content": {"$ref": f"#/definitions/content.{sid}"}, "style": style}}})
    defs["node"] = {"type": "object", "additionalProperties": False, "required": ["section", "variant", "content", "motion"],
                    "properties": {"section": {"type": "string", "enum": sorted(contracts)}, "variant": {"type": "string"}, "content": {"type": "object"},
                                   "motion": {"$ref": "#/definitions/motion"}, "style": {"type": "object"}, "retrievalEligible": {"type": "boolean"}},
                    "allOf": node_all}
    pagespec = {
        "$schema": "http://json-schema.org/draft-07/schema#", "$id": "pagespec.schema.json", "title": "Cadmus-clone design-repo PageSpec",
        "description": "A page composition built from this design-repo. mode=reference reconstructs a served route (structure, budgets, real asset paths as evidence; copy is neutral placeholder because source copy is never stored); mode=generated is a new page for someone else and may contain nothing that identifies or reproduces the source (schema/semantic_validate.py GENERATED_MODE_* rules).",
        "type": "object", "additionalProperties": False,
        "required": ["pageSpecVersion", "mode", "template", "route", "theme", "brand", "copyRole", "nodes"],
        "properties": {
            "pageSpecVersion": {"const": PAGESPEC_VERSION},
            "mode": {"type": "string", "enum": ["reference", "generated"]},
            "template": {"type": "string", "enum": sorted(t for t, d in templates.items() if d.get("instantiable", True))},
            "route": {"type": "string", "pattern": "^/[A-Za-z0-9/_-]*$"},
            "theme": {"type": "string", "enum": themes},
            "brand": {"type": "object", "additionalProperties": False, "required": ["name"], "properties": {"name": {"type": "string", "minLength": 1, "maxLength": 40}}},
            "copyRole": {"type": "string", "enum": role_enum("copy")},
            "nodes": {"type": "array", "minItems": 3, "items": {"$ref": "#/definitions/node"}},
        },
        "definitions": defs,
    }

    asset_enum = {"enum": sorted(r for r, d in roles.items() if d["kind"] == "media")}
    src_obj = {"type": "object", "additionalProperties": False, "required": ["id", "file", "tag", "lines", "tagLine", "tagLineSha1", "anchor", "anchorLine"],
               "properties": {"id": {"type": "string"}, "file": {"type": "string", "pattern": "^src/"}, "tag": {"type": ["string", "null"]}, "lines": {"type": "string", "pattern": "^\\d+-\\d+$"},
                              "tagLine": {"type": ["integer", "null"]}, "tagLineSha1": {"type": ["string", "null"], "pattern": "^[0-9a-f]{16}$", "description": "sha1 of the stripped source line at tagLine (pins the exact line without copying it)"},
                              "anchor": {"type": "string"}, "anchorLine": {"type": "integer"}}}
    contract_schema = {
        "$schema": "http://json-schema.org/draft-07/schema#", "$id": "section-contract.schema.json", "title": "Section contract", "type": "object", "additionalProperties": False,
        "required": ["id", "title", "semantic", "source", "additionalSources", "purpose", "retrievalEligible", "placement", "variants", "content", "assets", "generatedAssetRoles", "style", "constraints", "motion", "responsive", "runtimeUi", "measuredHeightsPx", "usedByTemplates", "evidence"],
        "properties": {
            "id": {"type": "string", "pattern": "^[a-z-]+\\.[a-z0-9-]+$"}, "title": {"type": "string"},
            "semantic": {"type": "object", "additionalProperties": False, "required": ["id", "category"], "properties": {"id": {"type": "string"}, "category": {"enum": CATEGORIES}}},
            "source": src_obj,
            "additionalSources": {"type": "array", "items": src_obj},
            "purpose": {"type": "string", "minLength": 20}, "notes": {"type": "string"}, "referenceOnly": {"type": "boolean"},
            "retrievalEligible": {"type": "boolean"}, "retrievalIneligibleReason": {"type": "string", "minLength": 30},
            "placement": {"enum": ["main", "overlay"]},
            "variants": {"type": "object", "minProperties": 1, "additionalProperties": {"type": "object", "additionalProperties": False, "required": ["description", "requiredFields", "forbiddenFields", "observedOn"],
                         "properties": {"description": {"type": "string"}, "requiredFields": {"type": "array"}, "forbiddenFields": {"type": "array"}, "observedOn": {"type": "array"}, "observedOnCount": {"type": "integer"}}}},
            "content": {"type": "object", "additionalProperties": False, "required": ["budgetRule", "requiredFields", "fields", "listSizes"], "properties": {
                "budgetRule": {"type": "string"}, "requiredFields": {"type": "array"},
                "fields": {"type": "object", "additionalProperties": {"type": "object", "additionalProperties": False, "required": ["type", "maxWords", "maxChars", "observedIn"],
                           "properties": {"type": {"const": "text"}, "maxWords": {"type": "integer", "minimum": 1}, "maxChars": {"type": "integer", "minimum": 1}, "maxLines1440": {"type": "integer"}, "observedIn": {"type": "integer", "minimum": 1}, "basis": {"type": "string"}}}},
                "listSizes": {"type": "object", "additionalProperties": {"type": "array", "minItems": 2, "maxItems": 2, "items": {"type": "integer"}}}}},
            "assets": {"type": "object", "additionalProperties": False, "required": ["fields", "note"], "properties": {"note": {"type": "string"}, "fields": {"type": "object", "additionalProperties": {
                "type": "object", "additionalProperties": False, "required": ["type", "referenceRoles", "generatedRoles"],
                "properties": {"type": {"const": "asset"}, "referenceRoles": {"type": "array", "items": asset_enum}, "generatedRoles": {"type": "array", "items": asset_enum}}}}}},
            "generatedAssetRoles": {"type": "array", "items": asset_enum},
            "style": {"type": "object", "additionalProperties": False, "required": ["props", "note"], "properties": {"note": {"type": "string"}, "props": {"type": "object", "additionalProperties": {
                "type": "object", "additionalProperties": False, "required": ["allowed", "evidence"], "properties": {"allowed": {"type": "array"}, "evidence": {"type": "string"}}}}}},
            "constraints": {"type": "object", "additionalProperties": False, "required": ["maxPerPage", "consecutiveVariants"], "properties": {"maxPerPage": {"type": "integer", "minimum": 1}, "consecutiveVariants": {"type": "array"}}},
            "motion": {"type": "object", "additionalProperties": False, "required": ["allowedPatterns", "requiredPatterns", "reducedMotionFallback"], "properties": {
                "allowedPatterns": {"type": "array", "minItems": 1, "items": {"enum": sorted(patterns)}}, "requiredPatterns": {"type": "array", "items": {"enum": sorted(patterns)}},
                "reducedMotionFallback": {"type": "object"}}},
            "responsive": {"type": "array", "items": {"type": "object", "additionalProperties": False, "required": ["range", "behavior", "cite"], "properties": {"range": {"type": "string"}, "behavior": {"type": "string"}, "cite": {"type": "string"}}}},
            "runtimeUi": {"type": "array", "items": {"type": "string"}}, "measuredHeightsPx": {"type": "object"},
            "usedByTemplates": {"type": "array", "items": {"type": "string"}},
            "evidence": {"type": "array", "minItems": 1, "items": {"type": "string", "pattern": "^[\\w./()\\[\\]-]+:\\d+(-\\d+)?$"}},
        },
    }
    return pagespec, contract_schema


def dumps(d):
    return json.dumps(d, indent=1, ensure_ascii=False) + "\n"


if __name__ == "__main__":
    ps, cs = build()
    targets = {"schema/pagespec.schema.json": dumps(ps), "schema/section-contract.schema.json": dumps(cs)}
    if "--check" in sys.argv:
        bad = [rel for rel, s in targets.items() if (REPO / rel).read_text() != s]
        print("schemas differ from a fresh generation: " + ", ".join(bad) if bad else "schemas match a fresh generation")
        sys.exit(1 if bad else 0)
    for rel, s in targets.items():
        (REPO / rel).write_text(s)
        print("wrote", rel)
