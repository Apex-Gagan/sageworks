"""Resize + optimise the curated client photos into the Next.js project.
Usage: python -I importimgs.py <selection.json> <sagework_src_root> <sheets_root> <project_root>
selection.json: { "category/name": "S12" | "D45" | "CR2:<relative path>" }
Writes public/images/<category>/<name>.jpg and src/data/images.json (w, h, blur placeholder).
"""
import sys, os, json, io, base64
from PIL import Image, ImageOps

sel_path, src_root, sheets_root, proj = sys.argv[1:5]
sel = json.load(open(sel_path, encoding="utf-8"))
idx = {
    "S": (os.path.join(src_root, "Selected Photos"), json.load(open(os.path.join(sheets_root, "sheets_sel", "index.json")))),
    "D": (os.path.join(src_root, "drive-download-20261111T164617Z-1-001"), json.load(open(os.path.join(sheets_root, "sheets_drv", "index.json")))),
}
MAXEDGE, Q = 2000, 80
Image.MAX_IMAGE_PIXELS = None


def open_cr2(path):
    data = open(path, "rb").read()
    best, pos = None, 0
    while True:
        i = data.find(b"\xff\xd8\xff", pos)
        if i < 0:
            break
        try:
            im = Image.open(io.BytesIO(data[i:]))
            im.load()
            if best is None or im.size[0] * im.size[1] > best.size[0] * best.size[1]:
                best = im
        except Exception:
            pass
        pos = i + 3
    return best


out = {}
for key, ref in sorted(sel.items()):
    if ref.startswith("CR2:"):
        p = os.path.join(src_root, ref[4:])
        im = open_cr2(p)
    else:
        root, items = idx[ref[0]]
        p = os.path.join(root, items[int(ref[1:])]["path"])
        im = Image.open(p)
    im = ImageOps.exif_transpose(im).convert("RGB")
    if max(im.size) > MAXEDGE:
        im.thumbnail((MAXEDGE, MAXEDGE), Image.LANCZOS)
    dst = os.path.join(proj, "public", "images", key + ".jpg")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "JPEG", quality=Q, optimize=True, progressive=True)
    tiny = im.copy()
    tiny.thumbnail((16, 16))
    b = io.BytesIO()
    tiny.save(b, "JPEG", quality=50)
    out[key] = {
        "src": "/images/" + key + ".jpg",
        "w": im.size[0],
        "h": im.size[1],
        "blur": "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode(),
    }
    print(f"{key:42s} {im.size[0]}x{im.size[1]} {os.path.getsize(dst)//1024}kb  <- {os.path.basename(p)}")

os.makedirs(os.path.join(proj, "src", "data"), exist_ok=True)
json.dump(out, open(os.path.join(proj, "src", "data", "images.json"), "w"), indent=1)
print(len(out), "images")
