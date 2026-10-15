# Flex Log 02 — folder readiness and editing (2.6.0)

Offline-first HTML, CSS and JavaScript PWA. All workout data stays in localStorage. No accounts, backend, analytics, external fonts or build step.

Machine Dips now use Tier 2 / 2 points, 3 × 8–10 and 1 RIR. Reverse Curls default to 2 × 10–15 and 0 RIR. Existing reverse-curl sessions and drafts retain their original set target to avoid losing third sets; untouched future sessions use two. All saved history remains intact. The supplied final table is reproduced in `EXERCISES.md`, and the app uses its exercise order.

## Update your existing app

1. Export a backup from the existing app’s Settings.
2. Replace the deployed files at the **same URL and path**, including `sw.js` and `icons/`. Do not clear browser data.
3. Visit while online, close all app tabs and installed-app windows, then reopen. The updated service worker waits for open workouts to close.

Existing V2 state migrates automatically. Exercise IDs, logs, seat memory, station links, timers and settings remain connected. Migration updates the requested exercise prescriptions and grouping once; later user renames and deletions persist. Old JM Press and combined wrist histories remain separate legacy records when present.

## Files and deployment

- `index.html`: app shell
- `styles.css`: mobile OLED-black layout
- `app.js`: model, 30 active seeded exercises, UI, logging, editing and graphs
- `sw.js`: repository-relative offline cache
- `manifest.json`: standalone installation
- `icons/`: required application icons
- `tests/`: model and simulated service-worker tests

For local use, run `python3 -m http.server 8080` inside `flex-log-v2`, then open `http://localhost:8080/`. Do not open index.html directly.

For GitHub Pages, upload all contents of `flex-log-v2` to the repository root, then choose Settings → Pages → Deploy from a branch → main → / (root). Visit the returned HTTPS URL. Once Settings says offline app files are ready, use the browser’s Install / Add to Home Screen command. On iPhone use Safari → Share → Add to Home Screen. No dependency install is needed. This package has not been deployed to your account.

The complete current list with sets, reps, rest and fatigue points is in `EXERCISES.md`. Target RIR is displayed in each exercise logger and can be edited through Edit exercise. Each seed uses the exact supplied target, including exceptions to tier defaults.

## Lower-body matrix

The lower-body filter contains exactly these three master folders. Within each, exercises appear in the order below.

| Folder | Exercise | Tier / points | Sets × reps | Rest |
| --- | --- | --- | --- | --- |
| Quads | Hack Squat | 1 / 3 | 3 × 6–10 | 3–5 min |
| Quads | Bulgarian Split Squat | 2 / 2 | 3 × 8–12 | 2–3 min |
| Quads | Seated Leg Extensions | 2 / 2 | 3 × 10–15 | 2 min |
| Posterior Chain | Romanian Deadlift (Barbell or Dumbbells) | 1 / 3 | 3 × 6–8 | 3–5 min |
| Posterior Chain | 45-Degree Back Extension | 2 / 2 | 3 × 10–15 | 2 min |
| Posterior Chain | Barbell Hip Thrust | 2 / 2 | 3 × 8–12 | 2–3 min |
| Posterior Chain | Seated Machine Leg Curl | 2 / 2 | 3 × 8–12 | 2 min |
| Calves & Adductors | Seated Adductor Machine | 2 / 2 | 3 × 10–15 | 2 min |
| Calves & Adductors | Standing Machine Calf Raise | 3 / 1 | 3 × 8–12 | 90–120 sec |

Machine Dips are in Chest. Front Delts & Triceps combines Machine Shoulder Press, overhead cable extension and cable pushdown. Chest and Core remain combined. Reverse curls and cable wrist curls remain separate movements. Cable wrist extensions are removed from active lists; any old history is retained.

## Two-tier readiness

Every master muscle folder becomes visually Ready after **three local calendar midnights** since the latest set logged for any active exercise in that folder. Before then, its label shows the remaining days. A folder with no logged sets in the current readiness block is Ready. Partial workouts update the date too.

Individual exercise rows show their own “Last: N days ago” timestamps; expanded entries show exact dates. They are not dimmed or locked according to individual three-/seven-day targets. Choose rotations using those dates; there is no forced A/B schedule. Previous targetCooldown fields remain in backups for compatibility, but do not control the interface or block logging.

Monday evening to Tuesday morning counts as one calendar day. DST does not change that count. Calendar readiness is a scheduling cue, not a physiological recovery measurement. Station folders link exercises across muscle groups and do not impose their own cooldown.

## Press-and-hold editing

Hold a category header, exercise header, active exercise card or open exercise title for about half a second. Moving your finger to scroll cancels the hold. A short tap still opens/closes the item. Right-click or use F2 / Shift+F10 on a focused header for the same editor.

- **Exercise:** rename, move to another category, or delete.
- **Category:** rename, delete, add a new exercise with tier/set/rep/rest settings, or move an existing exercise into it.
- **Station:** rename, change linked exercises, or delete the station.

Visible Edit controls are also available on categories and inside exercise loggers.

Deleting an exercise archives it and its alternates, removes active pins/station links and stops its timers. Deleting a master category archives its exercises. Historical sets and the work already counted today remain saved. A three-second Undo restores the previous state. Deleted exercises can be restored into an active category using its existing-exercise selector; deleted category names stay hidden. Station deletion only removes links, not the exercises themselves.

## Existing features retained

- Up to three pinned superset exercises with individual × removal and independent rest timers.
- Automatic timer starts on checked sets, midpoint rest defaults, ±30-second controls and adjustable future rest duration.
- Workout stopwatch and End workout. Ending stops timers, clears pins and preserves logs/final elapsed duration.
- Completion-only fatigue points. Tier 1 = 3, Tier 2 = 2, Tier 3 = 1. The 6–7 exercise label is a planning benchmark.
- Previous-session weight/reps, copy-last/swipe, partial flags, seat memory, load buttons and plate calculator.
- Independent custom alternates and per-exercise volume/e1RM graphs.
- Separate Reset Daily Fatigue and Reset All Cooldowns controls with undo. Fatigue reset retains completed sets; cooldown reset starts a new readiness block without deleting historical performances.
- JSON export/import. Import validates and replaces data, rather than merging it.
- Best-effort audio, vibration and wake lock. Background/locked-screen alerts depend on browser and device support.

For unilateral exercises, finish both sides before checking a set. Keep a consistent load convention for dumbbells. Cable wrist curls are logged separately from reverse curls.

## Validation

Run `npm test` with Node.js 20+. No npm dependencies are needed. **49 automated tests pass**, covering the exact lower-body matrix, midnight/DST arithmetic, folder readiness, edit persistence, history-preserving deletion/restoration, migration, fatigue, timers, graphs, backup validation and simulated offline cache lifecycle. Migration was also checked directly against the previous downloadable app’s model.

Browser/phone visual and touch verification remains untested: the browser runtime could not be downloaded in this environment. Before gym use, check long-press versus scrolling, deletion/undo, adding an exercise, offline reopening and device timer alerts on your phone.
