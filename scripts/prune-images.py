"""Remove photographs the site no longer uses.
Usage: python -I scripts/prune-images.py <project_root> [--apply]
A key is in use when it appears as a string in any file under src/ other than
captions.ts and images.json. Without --apply this only lists what would go.
Unused keys are removed from public/images, src/data/images.json,
src/content/captions.ts and scripts/image-selection.json.
"""
import sys, os, json, io, re

proj = sys.argv[1]
apply = "--apply" in sys.argv
manifest_path = os.path.join(proj, "src", "data", "images.json")
manifest = json.load(open(manifest_path, encoding="utf-8"))

text = []
for d, _, fs in os.walk(os.path.join(proj, "src")):
    for f in fs:
        if f.endswith((".ts", ".tsx")) and f != "captions.ts":
            text.append(io.open(os.path.join(d, f), encoding="utf-8").read())
text = "\n".join(text)

unused = sorted(k for k in manifest if ('"%s"' % k) not in text)
print(len(manifest), "photographs,", len(unused), "unused")
for k in unused:
    print("  ", k)
if not apply:
    sys.exit(0)

for k in unused:
    p = os.path.join(proj, "public", "images", k + ".jpg")
    if os.path.exists(p):
        os.remove(p)
    del manifest[k]
json.dump(manifest, open(manifest_path, "w", encoding="utf-8"), indent=1)

cap_path = os.path.join(proj, "src", "content", "captions.ts")
lines = io.open(cap_path, encoding="utf-8").read().split("\n")
keep = [l for l in lines if not any(l.strip().startswith('"%s":' % k) for k in unused)]
out = re.sub(r"\n{3,}", "\n\n", "\n".join(keep))
io.open(cap_path, "w", encoding="utf-8", newline="\n").write(out)

sel_path = os.path.join(proj, "scripts", "image-selection.json")
if os.path.exists(sel_path):
    sel = json.load(open(sel_path, encoding="utf-8"))
    sel = {k: v for k, v in sel.items() if k not in unused}
    json.dump(sel, open(sel_path, "w", encoding="utf-8"), indent=1)
print("removed", len(unused), "; kept", len(manifest))
