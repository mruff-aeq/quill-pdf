# quill-pdf

## 🔥 GO HERE. OPEN PDF. EDIT. 🔥

# 👉 **https://mruff-aeq.github.io/quill-pdf/** 👈

No install. No upload. No account. Open link. Drop PDF. Edit. Save. Done.

---

## What this?

Cave need fix PDF. Contract. Invoice. Resume. Cave not want send PDF to stranger server. Stranger server bad.

Quill PDF run in browser only. File never leave machine. Close tab, file gone. No backend. Nothing to leak.

Look like Word. Work on phone too.

---

## What it do?

### ✏️ Edit text already in PDF

Click **Edit text**. Click any line. Type. Done.

- Keep font, size, bold, colour. Even bold word in middle of line stay bold.
- Keep where it was. Centre stay centre. Bullet stay bullet.
- Table too. Click table, tools appear. Click cell, type. Add row. Add column. Delete row. Click away, tools hide.
- Table wrong place? Drag frame, table move. Drag edge of row or column, it grow or shrink.
- Too long? Text shrink little to fit. Not shrink too much. Cave can read.
- Box wrong size? Grab any corner. Pull. Box change shape, text wrap to fit.

### 🧱 Edit object

Click **Edit object**. Now anything on page can be grabbed. Text line. Shape. Line. Picture. Even thing hiding behind page.

- Every thing get box around it. Cave see what can grab.
- Click to pick. Picked thing show tools: ✥ move, round handle rotate, corner resize, red × delete.
- Drag thing itself also move. ⟲ ⟳ buttons turn 90°. Delete key also remove.
- Thing hide behind other thing? ▲ ▼ ⤒ ⤓, or Bring to front / Send to back, or Ctrl+] Ctrl+[. Page thing step in front of (or behind) next thing it touch. Added thing change layer number, same as always.
- Things stacked? Click again. Get thing underneath.
- Arrow keys nudge. Shift nudge more.
- Real change inside PDF, not paint on top. Deleted text gone from file.
- On phone: tap to pick, then drag inside box.

### 🖍️ Mark up

Pick colour. Drag across words.

- **Highlighter** — thick, see-through. Text under stay sharp.
- **Underline** — thin line under.
- **Strikethrough** — thin line through.

Snap to text line. Cave not need steady hand.

### ➕ Add things

- Text box. Picture. Drawn signature. Box.
- Drag to move. Any corner to resize. Handle to rotate.
- Every thing has layer number. Page itself is layer 1. New thing start on layer 1, in front of page. Smaller number go behind page: page ink print over it. Bigger number sit in front.
- Thing hide behind other thing? Click it. Type layer number, or ▲ up one, ▼ down one, ⤒ above all, ⤓ below all. Ctrl+] and Ctrl+[ same. Shift for above all and below all.
- On phone: pick thing, open menu, Home, Markup. Bring to front. Send to back.

### 📄 Pages

- Open many PDF. Merge. Reorder by drag.
- Rotate. Duplicate. Delete. Insert blank page.
- Pick many pages at once. Do thing to all.
- Pull out pages into new PDF. Pull out all text into `.txt`.

### ↩️ Undo

Ctrl+Z. Ctrl+Y. Cave make mistake, cave fix.

---

## Who use?

- **Cave with contract**: fix date, sign, save. Nothing uploaded.
- **Cave with resume**: fix typo in bullet, bold stay bold.
- **Cave on phone**: open link, tap, highlight, save. Same thing, smaller rock.

---

## Cave want run own copy?

```
git clone https://github.com/mruff-aeq/quill-pdf.git
cd quill-pdf
npm start
```

Open `http://localhost:5173`. Nothing to `npm install`. Node 18 or newer.

Static files only. Put `index.html` and `vendor/` on any web server. Work.

---

## What it not do?

- **Scan PDF** (picture of page) have no text to edit. Need OCR. Not here.
- **Password PDF** not open.
- Edit text not re-wrap whole paragraph. Line you edit only.
- Old text covered, not always deleted from file. Real redaction not here. Cave honest.

---

That all. Cave simple. 🦴
