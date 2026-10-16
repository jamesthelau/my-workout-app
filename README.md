# Flex Log V3 — workflow, urgency and hardware controls

Offline HTML/CSS/JavaScript PWA. All workout data stays in localStorage. No accounts, backend, external scripts or build step.

## Update and deployment

Export a backup first. Replace all deployed files at the **same URL/path**, including `sw.js`, `manifest.json` and icons. Visit online, close every tab and installed-app window, then reopen to activate cache 3.0.0. Do not clear browser data. The existing storage key and ZIP folder name are retained deliberately so V2 history migrates in place.

For a new GitHub Pages deployment, upload the contents of `flex-log-v2` to the repository root, select Settings → Pages → Deploy from branch → main / root, and open the returned HTTPS URL. Install through Chrome’s Add to Home Screen / Install app. For local preview, run `python3 -m http.server 8080` inside the folder and visit http://localhost:8080/. Do not double-click index.html.

## Logging workflow

Blank weight/reps fields adopt the exact previous-session ghost values when you check a set. Each field falls back independently; typed values, including zero weight, take priority. Unit conversion matches the displayed ghost. Partials are never silently copied. With no prior baseline, enter weight and reps first.

A successfully saved set automatically pins its exercise, closes the logger and its parent folder, and returns to the captured pre-opening page Y offset. Search is cleared so folders remain collapsed. The page retains enough height to preserve that offset even near the bottom. Unchecking a set does not collapse the editor. Three-second Undo restores the previous workout state.

The active tray keeps the three most recently pinned exercises. Logging a fourth rotates the oldest pin out. Every still-running timer remains in the same top tray until it expires or is stopped, so automatic pinning cannot hide a countdown. Extra cards scroll horizontally on phones. Each timer belongs to its exercise and uses an absolute deadline. Unpinning never erases history or stops rest. The top of an open exercise dialog also exposes the active exercises and their countdowns.

The bottom timer bar and its +/- controls are removed. Prescribed rest defaults to the midpoint; the existing per-exercise rest setting changes future timers. End workout stops timers, clears pins and retains logs/final stopwatch duration.

## Urgency spectrum

The final explicit rest-cycle matrix in EXERCISES.md is authoritative. The earlier 76-point example and generic three-day folder rule are superseded.

Each exercise compares local calendar days since its latest set with its own restCycle:

- Cool blue: less than half the cycle elapsed.
- Muted green: at least halfway, but not due yet.
- Amber: cycle reached, less than 1.5 cycles elapsed.
- Coral: at least 1.5 cycles elapsed, considered overdue for planning.

Never-logged and cooldown-reset exercises show amber with a “Not logged” label, rather than pretending they have an overdue history. Text labels and dates supplement color. Nothing blocks logging.

Parent folders use muscle tags. For each represented muscle, the least-urgent related exercise determines that muscle’s signal; the most-urgent distinct muscle determines the folder’s signal. This lets recent Preacher Curls suppress the biceps parent even if Incline Curls are overdue, while overdue adductors can light up a folder containing recently trained calves. Aggregation uses the full muscle population, not just search results, and each candidate’s own 3-/7-day cycle.

The tags deliberately account for shared loading: curls share elbow flexors; RDLs and back extensions share hamstrings, glutes and lower back; Bulgarian split squats share quads and glutes. Other muscle regions are separated. These are conservative scheduling cues, not measured recovery or injury predictions. Custom alternates inherit their parent’s tags; new standalone exercises default to their category tag. Moving an exercise between folders retains its muscle identity.

Parent category cards have broad slate backgrounds, bold headings and thick heat edges. Exercises use inset dark rows with thinner edges and lighter typography. Hold either header to edit; visible Edit controls remain available.

## Dynamic fatigue goal

The 30 active seed exercises yield:

- 7-day exercises: 44 points, counted once per week.
- 3-day exercises: 11 points × 2 sessions = 22 points.
- Total: 66 weekly points / 4 workout days = 16.5, rounded up to **Daily Goal: 17 Pts**.

The numerator still increases only when all planned sets of an exercise are complete. The progress bar caps visually at the goal, while the numeric score continues above it. The goal recalculates from active standalone exercises, their tier and restCycle. Archived entries and alternates are excluded from the goal so alternatives do not double-count a planned slot; completing an alternate still contributes actual fatigue points. New standalone exercises count toward the goal. Edit exercise includes a 3-/7-day cycle selector. New standalone exercises default to three days; alternates inherit their parent’s cycle.

## Misc → Hardware Settings

- Audio toggle and 0–100% tone-volume slider.
- Haptics toggle and intensity slider controlling pulse duration/pattern, not physical motor amplitude.
- Test tone & vibration button plus AudioContext/API status.

The Web Audio context is created/unlocked during user interaction, resumed when suspended, and reused for rest alerts. Two short tones use a gain envelope to avoid sharp clicks. Vibration uses short bounded pulses; zero disables pulses. Hardware preferences persist across reloads and backups. Screen wake lock is requested during rest.

Designed for Android Chrome usage, including the Galaxy S10, but **not physically tested on that device**. Browser APIs cannot guarantee alerts in silent/DND mode, with media volume muted, during browser suspension, or with restrictive power settings. Timers reconcile their deadlines on return. Device motor strength is controlled by Android, not navigator.vibrate().

API references: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate and https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices

## Persistence and retained features

Migration adds restCycle, muscle tags and hardware preferences without replacing logs, RIR, seat positions, custom names, folders or timers. Separate Reset Daily Fatigue and Reset All Cooldowns controls remain, both preserving history. JSON backup import/export, progression graphs, partial flags, per-exercise seat memory, custom alternates, load tools and press-and-hold editing remain available. The full current prescription table is in EXERCISES.md.

## Verification

Run `npm test` with Node.js 20+. **57 automated tests** cover seed prescriptions, cycles/goal, muscle-aware urgency, midnight/DST boundaries, zero-type fallback, unit conversion, pin/timer retention, migration, hardware bounds, and earlier history/backup features. A mocked DOM event-flow test checks logging → collapse → scroll restoration → pinning, plus Hardware Settings rendering. Migration is also tested against the actual prior 2.6 source.

These are model, mocked DOM and mocked service-worker checks, **not real browser layout or Galaxy S10 hardware verification**. On the installed phone, check first-tap audio, test alerts, scroll restoration near the bottom, long-press versus scrolling, tray overflow, offline reopening and foreground/background timer behavior.
