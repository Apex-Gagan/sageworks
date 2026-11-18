"""Bring back photographs that were pruned, from an earlier commit.
Usage: python -I scripts/restore-images.py <project_root> <commit> <key> [<key> ...]
Restores public/images/<key>.jpg, its entry in src/data/images.json and its caption
in src/content/captions.ts exactly as they were in <commit>.
"""
import sys, os, json, io, re, subprocess

proj, commit = sys.argv[1], sys.argv[2]
keys = sys.argv[3:]


def show(path, binary=False):
    out = subprocess.run(["git", "-C", proj, "show", "%s:%s" % (commit, path)], capture_output=True, check=True).stdout
    return out if binary else out.decode("utf-8")


old_manifest = json.loads(show("src/data/images.json"))
old_caps = show("src/content/captions.ts")
manifest_path = os.path.join(proj, "src", "data", "images.json")
manifest = json.load(open(manifest_path, encoding="utf-8"))
cap_path = os.path.join(proj, "src", "content", "captions.ts")
caps = io.open(cap_path, encoding="utf-8").read()

add = []
for k in keys:
    if k in manifest:
        print("already present:", k)
        continue
    assert k in old_manifest, "not in %s: %s" % (commit, k)
    dst = os.path.join(proj, "public", "images", k + ".jpg")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "wb").write(show("public/images/%s.jpg" % k, binary=True))
    manifest[k] = old_manifest[k]
    m = re.search(r'^\s*"%s": .*$' % re.escape(k), old_caps, re.M)
    assert m, "no caption for " + k
    add.append(m.group(0).rstrip())
    print("restored", k, "%dx%d" % (manifest[k]["w"], manifest[k]["h"]))

json.dump(dict(sorted(manifest.items())), open(manifest_path, "w", encoding="utf-8"), indent=1)
if add:
    marker = "} as const;"
    assert caps.count(marker) == 1
    caps = caps.replace(marker, "\n" + "\n".join(add) + "\n" + marker)
    io.open(cap_path, "w", encoding="utf-8", newline="\n").write(caps)
print(len(manifest), "images in manifest")
