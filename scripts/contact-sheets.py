"""Build labelled contact sheets for every image under SRC so they can be reviewed quickly.
Usage: python -I contact.py <src_root> <out_dir>
"""
import sys, os, hashlib, json
from PIL import Image, ImageOps, ImageDraw, ImageFont

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
EXT = {".jpg", ".jpeg", ".png"}
COLS, ROWS, TW, TH, PAD, LAB = 6, 5, 300, 225, 6, 18

files = []
for root, _, names in os.walk(src):
    for n in sorted(names):
        if os.path.splitext(n)[1].lower() in EXT:
            files.append(os.path.join(root, n))
files.sort(key=lambda p: (os.path.dirname(p).lower(), os.path.basename(p).lower()))

seen, items = {}, []
for p in files:
    h = hashlib.md5(open(p, "rb").read()).hexdigest()
    if h in seen:
        continue
    seen[h] = p
    items.append(p)

try:
    font = ImageFont.truetype("arial.ttf", 14)
except Exception:
    font = ImageFont.load_default()

index = []
per = COLS * ROWS
for s in range(0, len(items), per):
    chunk = items[s:s + per]
    W = COLS * (TW + PAD) + PAD
    H = ROWS * (TH + LAB + PAD) + PAD
    sheet = Image.new("RGB", (W, H), (24, 24, 24))
    d = ImageDraw.Draw(sheet)
    for i, p in enumerate(chunk):
        n = s + i
        rel = os.path.relpath(p, src)
        try:
            im = Image.open(p)
            w0, h0 = im.size
            im.draft("RGB", (TW * 2, TH * 2))
            im = ImageOps.exif_transpose(im).convert("RGB")
            if im.size[0] < im.size[1] and w0 > h0:
                w0, h0 = h0, w0
            im.thumbnail((TW, TH))
        except Exception as e:
            index.append({"id": n, "path": rel, "error": str(e)})
            continue
        x = PAD + (i % COLS) * (TW + PAD)
        y = PAD + (i // COLS) * (TH + LAB + PAD)
        sheet.paste(im, (x + (TW - im.size[0]) // 2, y + LAB + (TH - im.size[1]) // 2))
        d.text((x + 2, y), f"#{n}  {w0}x{h0}", fill=(255, 220, 120), font=font)
        index.append({"id": n, "path": rel, "w": w0, "h": h0, "kb": os.path.getsize(p) // 1024})
    sheet.save(os.path.join(out, f"sheet_{s // per:02d}.jpg"), quality=80)

json.dump(index, open(os.path.join(out, "index.json"), "w"), indent=0)
with open(os.path.join(out, "index.txt"), "w", encoding="utf-8") as f:
    last = None
    for it in index:
        dn = os.path.dirname(it["path"])
        if dn != last:
            f.write(f"\n## {dn}\n")
            last = dn
        f.write(f"{it['id']}\t{it.get('w','?')}x{it.get('h','?')}\t{it.get('kb','?')}kb\t{os.path.basename(it['path'])}\n")
print(len(files), "files,", len(items), "unique,", (len(items) + per - 1) // per, "sheets")
