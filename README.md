# Bubble Grader

A phone-only web app (PWA) that scans and grades 100-item, A-D answer sheets with your
phone camera. No app store, no accounts, no scan limits, works offline after the first load.
Everything runs on your phone; nothing is uploaded anywhere.

## What is in this folder

- `index.html` - the grader app
- `answer-sheet.html` - the printable answer sheet (open it, press Print)
- `template.js` - shared geometry; the sheet and the scanner both read this so they always agree
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` - PWA files (install + offline)

## Put it online (free, one time)

The app must be served over HTTPS for the camera to work. GitHub Pages is the simplest free host.

1. Create a free GitHub account, then a new public repository (for example `bubble-grader`).
2. Upload all the files in this folder to the repository root (drag and drop works).
3. In the repo: Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/root`. Save.
4. Wait about a minute. Your app is at `https://YOURNAME.github.io/bubble-grader/`.
5. Open that link on your phone in Chrome (Android) or Safari (iOS). Use the browser menu to
   "Add to Home Screen". It now behaves like an installed app and runs offline.

First load needs internet (it downloads the scanner engine once). After that it works offline.

## Print the answer sheet

Open `answer-sheet.html` and print it. Two rules that matter:

- Print at 100% scale. Turn OFF "Fit to page" / "Shrink to fit".
- The four solid black corner squares must print fully and dark. They are how the scanner
  locks onto the sheet and corrects for the camera angle.

Plain white A4, single-sided. Photocopies are fine as long as the corners stay solid black.

## Grade a class

1. Open the app, go to **Answer key**, tap the correct letter for each item. Set "Questions
   in this exam" if it is fewer than 100. The key is saved on the phone.
   (Shortcut: fill one sheet yourself as the key, scan it, then tap "Use last scan as key".)
2. Go to **Scan** > "Open camera / choose photo" and photograph a filled sheet.
3. Drag the four handles onto the centres of the black corner squares (or press Auto-detect,
   then nudge). Press **Read sheet**.
4. Check the overlay: green = detected answer matches the key, red = wrong, amber = blank or
   double mark. Confirm it against the paper, type the student's name, press **Save result**.
5. Repeat for each paper. In **Results**, press **Export CSV** to open the grades in Excel or
   Google Sheets.

## If marks are misread

Under the result, open "Reading sensitivity" and move the Fill threshold slider, then
"Re-read":

- Bubbles that are clearly shaded but read as blank -> lower the threshold.
- Faint stray marks read as answers -> raise it.

Most misreads are actually alignment: make sure the handles sit on the corner-square centres,
the sheet is flat, and the light is even with no shadow line across the page.

## Honest limitations

- Accuracy depends on print quality, lighting, and how fully students shade bubbles. Tell
  students to fill each circle completely with a dark pen or pencil and to erase cleanly.
- Always trust the overlay over the number. It is there so you can catch a misread before it
  becomes a wrong grade. Spot-check a few papers by hand the first time you use it.
- The scanner engine (OpenCV) loads from a public CDN on first use. That single first load
  needs internet; everything after is on-device.

## Changing the layout later

Edit `template.js` only. Because the printed sheet and the scanner both compute bubble
positions from that one file, changing it keeps them in sync. If you change bubble positions,
reprint the sheet before scanning again.
