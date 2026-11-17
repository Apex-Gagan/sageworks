"""Add single photographs to the site without re-running the whole import.
Usage: python -I scripts/add-images.py <project_root> <key>=<source file> [<key>=<source file> ...]
Resizes to 2000px on the long edge, writes public/images/<key>.jpg and merges the
entry (size and blur placeholder) into src/data/images.json. Add the caption for each
new key to src/content/captions.ts afterwards, or the build fails on the missing key.
"""
import sys, os, json, io, base64
from PIL import Image, ImageOps

proj = sys.argv[1]
MAXEDGE, Q = 2000, 82
Image.MAX_IMAGE_PIXELS = None
manifest_path = os.path.join(proj, "src", "data", "images.json")
manifest = json.load(open(manifest_path, encoding="utf-8"))

for pair in sys.argv[2:]:
    key, src = pair.split("=", 1)
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    if max(im.size) > MAXEDGE:
        im.thumbnail((MAXEDGE, MAXEDGE), Image.LANCZOS)
    dst = os.path.join(proj, "public", "images", key + ".jpg")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "JPEG", quality=Q, optimize=True, progressive=True)
    tiny = im.copy()
    tiny.thumbnail((16, 16))
    b = io.BytesIO()
    tiny.save(b, "JPEG", quality=50)
    manifest[key] = {
        "src": "/images/" + key + ".jpg",
        "w": im.size[0],
        "h": im.size[1],
        "blur": "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode(),
    }
    print(f"{key:36s} {im.size[0]}x{im.size[1]}  <- {os.path.basename(src)}")

json.dump(dict(sorted(manifest.items())), open(manifest_path, "w", encoding="utf-8"), indent=1)
print(len(manifest), "images in manifest")
