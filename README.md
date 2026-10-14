# Flex Log 02 — grouping and workout controls (2.2.0)

An offline-first, intent-driven hypertrophy log. Plain HTML, CSS and JavaScript. No accounts, backend, analytics, CDN, external fonts or build step.

## Files

The five requested source files are complete and ready to deploy:

| File | Responsibility |
| --- | --- |
| `index.html` | Accessible application shell, PWA metadata and dialogs |
| `styles.css` | OLED black theme, mobile accordion, pinned tray and timer dock |
| `app.js` | 28-exercise seed, pure model functions, persistent state, all UI and graphs |
| `sw.js` | Offline app-shell cache and version lifecycle |
| `manifest.json` | Standalone installation configuration |

Also included: three required PNG app icons in `icons/`, `.nojekyll` for static hosting, `package.json` with no dependencies, and four optional test files in `tests/`.

`app.js` is organized into an exported, DOM-independent model followed by a browser-only `boot()` scope. The model can be tested without running the interface. Folders, pinning and muscle entries reference the same canonical exercise ID; they never own copied exercise data.

## Run or deploy

For a local desktop preview, open a terminal in the extracted `flex-log-v2` folder:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/`. Do not double-click `index.html`: JavaScript modules and service workers need HTTP/HTTPS.

For GitHub Pages:

1. Upload the contents of `flex-log-v2` to your repository root, including the `icons` directory. `index.html` should be directly at the selected publishing root.
2. In repository **Settings → Pages**, select **Deploy from a branch**, then `main` and `/ (root)`.
3. Open GitHub's returned HTTPS URL once the deployment completes.
4. In Settings inside Flex Log, wait for **Offline app files are ready on this device**.
5. Install using Chrome's **Install app / Add to Home screen**, or Safari's **Share → Add to Home Screen**.

All URLs are relative and work under a repository path. The manifest uses `"display": "standalone"`. No npm installation, environment variables or API keys are required. This source package has not been published to your GitHub account.

For changes, increment `2.2.0` in `sw.js`, redeploy, visit online and then close all app windows before reopening. The new worker deliberately waits instead of forcing a reload during a workout.

## Main interaction

### Muscles and stations

The latest update revises the existing app:

- **Chest** combines Upper Chest and Mid / Lower Chest.
- **Core** combines Flexion and Stability.
- **Misc Legs** contains Barbell Hip Thrust, the existing Seated Adductor Machine and Standing Machine Calf Raise.
- **Glutes** contains the new Bulgarian Split Squat. Initial defaults: Tier 1 / 3 points, 3 × 8–12 reps, 2–3 minutes rest, 3-day cooldown. Complete both sides before checking; keep a consistent dumbbell-per-hand or barbell load convention. These new defaults were chosen because no prescription was provided.


The master screen has 14 muscle / movement groups, with Upper body / Lower body / Core filters and exercise search. One muscle and one exercise are expanded at a time during normal browsing. Search opens relevant regions.

Each collapsed exercise row shows **Ready** or **Recovering: X days remaining**, its own **Last: N days ago**, set pips and a pin button. Ready exercise names are bright; recovering names are muted without disabling logging. Pinned cards show the same readiness state. Expanded exercises display exact dates and previous-session weight/reps. A collapsed muscle's **Latest** is only a summary of its most recent exercise; it does not assign one cooldown to the group.

The **Stations** tab links the same exercise records into custom folders. One editable **Cable Station** is provided as a starting point. Create, rename, populate or delete folders freely. Removing a folder never deletes exercises or history. Log from either view and all other references update from the same record.

### Active tray and rest

Pin up to three exercises with the diamond button. The sticky header holds the active tray and the day's fatigue score. Tapping a pin opens a focused logger; its A/B/C tabs jump directly between pinned exercises.

Every checked set starts or replaces **only that exercise's** rest timer. Other exercises' timers keep their own deadlines. Unpinning does not stop a timer. The bottom dock shows the next timer to finish. Expand it for each timer's independent −30s, +30s and stop controls. It remains available in folders and dialogs.

Rest defaults to the midpoint of the prescribed range. Examples: 3–4m → 3:30; 90s–2m → 1:45; 60s–90s → 1:15. Tap the exercise's rest setting to choose 15–900 seconds for future sets. Timers use saved absolute deadlines, so navigation, reloads and suspended intervals do not extend rest.

The stopwatch starts on the first logged set or manually from the header. Pause or resume it in its own small dialog. **End workout** is available beside the daily benchmark while a workout is active, and in the workout-clock dialog. Ending preserves the final elapsed duration, stops all rest timers and clears pins. It keeps history, checkmarks, cooldowns and daily fatigue. Use **Start new workout** or log a new set to begin a new clock from zero. Both End workout and the independent resets have a three-second Undo. A workout can continue across midnight while daily set accounting rolls over.

### Fast logging

- **Ghost values** show the previous calendar-day session, not another set you just logged today. They are placeholders, not silently accepted input.
- Tap **Use last**, or swipe a set row right from its number/history area, to copy the corresponding previous-session weight and reps. A visible button provides the same action without a gesture. If that set number did not exist in the previous session, the last set of that session is used.
- Checking a set saves it and focuses the next unfinished weight field. Invalid or empty values do not count. Use 0 for unweighted work.
- **P** marks lengthened partials after the recorded full reps. Enter only full reps in the reps field. Partial status is saved per set and shown in history. Copy-last deliberately leaves P unchecked so a past partial effort is not accidentally repeated in the record.
- Inputs glow green while their entered weight or reps exceed that prior set's value. This is a simple comparison, not an automatic strength assessment.
- **Pin/Seat Pos** is saved as you type and restored as the editable value when the exercise is reopened. Each alternate has its own seat memory.
- **Load tools** holds −5 / +5 / +10 buttons and a symmetrical plate calculator, keeping them off the normal set rows. Plate taps add the selected plate to both sides. The starting bar/sled weight is explicit. Choose the target unfinished set before applying.
- Daily targets default to the exact matrix. The set stepper can change today's plan to 1–10 sets without changing the exercise's future default. Logged sets cannot be silently removed by lowering the target.
- A three-second Undo is offered for a check/uncheck, cooldown reset, daily fatigue reset, folder deletion or ending a workout. A later mutation replaces that undo opportunity; ordinary navigation does not. An active-day set can also be unchecked later to correct its history.

For dumbbells, use a consistent per-hand load convention. For unilateral movements, finish both sides before checking a set. Exercise 15, **Cable Wrist Curls & Reverse**, stays one slot exactly as supplied: finish both movements before checking. If the two movements need different loads/history, add separate custom alternates. These additional alternatives are independently scored when completed.

## Readiness and fatigue semantics

### Calendar midnights

Each set stores both its exact UTC timestamp and the device's local `YYYY-MM-DD` date at logging time. Rest-day differences use calendar-date ordinals; they do not divide elapsed hours by 24.

- Monday 8 PM → Tuesday 8 AM = **1 day ago**.
- 11:59:59 PM → 12:00:01 AM = **1 day ago**.
- Spring/fall DST changes do not alter calendar-day counts.
- A partial session still updates that exercise's last-hit date.
- Local midnight refreshes current-day inputs, pips and fatigue. Previous-day data remains in history.
- If the device timezone changes, the current day uses the new local timezone; previously recorded training dates remain as captured. The app never rewrites travel-day history.

Readiness is independent for each variation. **Ready** means calendar days since its last logged set are greater than or equal to its predefined `targetCooldown`. **Recovering** displays `targetCooldown − daysSinceLastHit` days remaining. Never-trained exercises and exercises cleared by Reset All Cooldowns are Ready. Logging while Recovering is allowed. These labels implement your schedule, not a measurement of physiological recovery.

The seed cooldowns are exactly:

- **3 days:** Incline Smith Machine Press; Behind-the-back Cable Lateral; DB Lateral Raises; Reverse Pec Deck; DB Hammer Curl; Cable Wrist Curls & Reverse; Cross-body Cable Pushdown; Hack Squat; Seated Leg Extensions; Standing Machine Calf Raise; Weighted Cable Crunches.
- **7 days:** Incline Cable Fly; Normal Machine Fly (Pec Deck); Chest-Supported T-Bar Row; Single-Arm DB Row (to hip); Half-Kneeling Single-Arm Pulldown; Neutral Grip Lat Pulldown; Seated DB Shoulder Press; Incline DB Curl; Preacher Curl; JM Press; Cross-body Cable Overhead Ext.; RDL (Barbell or DB); Seated Machine Leg Curl; Barbell Hip Thrust; Seated Adductor Machine; Pallof Press.

The fly pair and RDL / seated curl pair have direct rotation-partner links in their expanded loggers. Each partner retains its own last-hit date and seven-day target; training one does not reset the other. Existing and new custom alternates inherit their parent's cooldown when no independent target is already stored.

### Daily fatigue

The score is derived from completed exercise IDs for the current local date; it is not an incrementing counter that can double-count repeated taps.

- Tier 1: **3 points**
- Tier 2: **2 points**
- Tier 3: **1 point**

An exercise contributes once only when all its currently planned sets are checked. Unchecking a set removes that exercise's contribution. Raising its daily set target makes it incomplete until the extra sets are logged. The display shows **6–7 exercises** as the requested benchmark; this is an exercise count, not a fatigue-score threshold or a training recommendation.

Custom alternates inherit the parent's muscle/rest range and target cooldown but have their own exercise ID, editable tier, set target, rep range, history, seat and cooldown. Completing both the original and alternate on one day scores each once. Duplicate names are rejected after trimming/case normalization to avoid accidental duplicate records.

### Reset Daily Fatigue

Settings has **Reset Daily Fatigue** separately from **Reset All Cooldowns**. Fatigue reset zeros today’s score and counted-exercise total without removing set checkmarks, historical records, seat positions, timers or cooldowns. Already-complete exercise IDs are excluded from that date’s score, so an immediate recomputation or reload cannot bring old points back. Incomplete or untouched exercises add their usual points when subsequently completed. Repeated resets are safe; exclusions accumulate only for that calendar date. Previously excluded exercises stay excluded for that day even if unchecked/rechecked. Tomorrow counts normally.

The header switches to “Since fatigue reset” and “exercises counted” to distinguish the new score from retained workout history. Undo restores the prior score. Cooldown reset affects readiness only; use both buttons if you want both effects.

### Reset All Cooldowns

Reset increments a readiness epoch. Existing sets remain untouched, with their original timestamp, weight, reps, partial flag and epoch. All exercises immediately show Ready; only logs made after the reset establish a new last-hit indicator and start a new target cooldown. This also handles a reset and new set occurring within the same millisecond.

Seat positions, folder links, previous-session ghost values, graph data, today's checkmarks/score and timer data are preserved. Reset does not pretend completed work never happened. The immediate Undo restores the prior readiness epoch.

## Graphs

Progression opens a dependency-free SVG line graph for the exact exercise/variation. Each point can be selected, and an expandable date/value table and complete set history provide a text equivalent.

- **Volume load:** daily sum of recorded weight × full reps, converted to the selected unit. Partial flags are retained but additional partial reps are not counted. More sets can increase volume even without a load increase.
- **Estimated 1RM:** best Epley value for each date, `weight × (1 + reps / 30)`. Only 1–12 full-rep sets with nonzero load and no partial flag qualify. This is a consistent estimation convention, not a tested maximum.

Dates are plotted by calendar spacing. Original record units remain unchanged; the graph converts values for display. Zero-data and one-point histories are handled explicitly.

## Persistence, backup and compatibility

The application saves a versioned JSON document under `flex-log:v2:<deployment-path>` in `localStorage`. No exercise data is sent to a server. It includes exercise definitions, current seat positions, historical sets, per-day target changes, unfinished drafts, folders, pinning, timers, stopwatch, preferences and the readiness epoch.

### Updating the existing V2 app

Replace the previous app files at the **same deployed URL/path** with these updated files. Do not clear browser data. The storage key and schema version remain V2; on load, validated older V2 data is automatically upgraded with merged groups, Bulgarian split squats, separate fatigue-reset bookkeeping, and workout-end status. Existing exercise IDs, cooldowns and logs are retained; custom alternates follow their parent’s regrouping. The migration preserves pre-existing records, settings and links while updating only the requested group assignments and new fields and is safe to run repeatedly. Older V2 JSON backups are also upgraded when restored. The worker cache is bumped to 2.2.0; visit online, close all app tabs/windows, then reopen to activate the update.

**Export / Backup Data** downloads the entire document. **Restore V2 Backup** validates IDs, relationships, dates, values and versions before asking to replace current data. It is replacement, not merging. Corrupt stored data is never automatically overwritten, and a recovery download is offered.

Storage quota or permission failures are shown, and failed edits are not reported as saved. Export regularly, especially before clearing browser data, uninstalling, changing browser profiles or changing deployment URLs. Use one actively edited tab; other tabs receive changes, but this is not a transactional multi-tab database.

V2 uses a separate schema and storage key from the earlier day-based V1. Existing V1 data is not deleted or automatically converted, and a V1 backup is intentionally rejected by the V2 importer. Keep the original V1 export/app if it contains records you want to retain. Deploy V2 under its own path to keep both versions directly accessible.

## Device support

Wake lock is requested while any rest timer is running, released when none remain or the page hides, and reacquired when visible. The timer dock reports whether it was obtained. Secure context and device/browser permission are required.

Sound is initialized by a set/clock tap. Audio tones and vibration at zero are best-effort device features and can be disabled in Settings. Browser suspension, silent mode, power saving and platform restrictions may prevent exact background alerts. An ordinary PWA cannot guarantee an alarm while fully closed or suspended. Returning to the app reconciles expired deadlines immediately.

The service worker precaches local app files only. Workout state stays in `localStorage`. All caches are scoped to this deployment; updating this worker does not delete unrelated app caches.

## Tests and verification limits

Run on Node.js 20+:

```sh
npm test
```

No dependency installation is required. **39 automated tests passed**, covering:

- Original 27 seed names, tiers and prescriptions plus Bulgarian split squats;
- Merged-group migration, linked alternate movement, separate fatigue reset and workout end/restart behavior;
- Calendar midnight, year boundaries and both DST changes;
- Exact 27-exercise cooldown mapping, three-/seven-day readiness thresholds and independent rotation partners;
- Non-destructive migration of older V2 state/backups, alternate inheritance and migration idempotence;
- Completion-only fatigue, undo snapshots and correction behavior;
- Folder identity, alternate independence and reset preservation;
- Timer isolation, deadline arithmetic and stopwatch persistence;
- Previous-session copying, partial flags, units and graph arithmetic;
- Draft/state roundtrips and malformed-backup rejection;
- Required PWA files, relative paths and simulated offline cache lifecycle.

JavaScript syntax checks also passed. **No visual browser QA, physical-phone testing, or real browser install/offline test was available in the build environment.** The service-worker test uses a mocked cache environment.

Before relying on it at the gym, check these on the deployed phone app:

1. Pin three exercises and log alternating sets. Verify each timer keeps counting while opening another exercise or station.
2. Log through Cable Station, then open the same muscle entry. Check matching pips, history and seat position.
3. Add a custom alternate and verify it initially has no history. Log it and check that the original's last-hit date is unchanged.
4. Verify input keyboard behavior, copy-last/swipe, partial flags, plate calculation, graph selection and a three-second Undo.
5. Reset cooldowns, confirm every exercise becomes Ready while history and daily fatigue remain, then Undo.
6. Export, alter a setting, restore and confirm the backup state returns. Try a malformed file and confirm no replacement.
7. Wait for offline readiness, install, disconnect networking, reopen and log. Reopen again to confirm persistence.
8. Check timer tone/vibration and the wake-lock indicator on the actual device; test returning after a background interval.

## Update 2.3
30 seeded exercises. Bulgarian split squats and hip thrusts both have 7-day cooldowns. Added reverse curls (3 sets of 10–15, 1 fatigue point, 90–120 seconds rest, 3-day cooldown). Separate cable wrist curls and cable wrist extensions (each 3 sets of 12–15, 1 point, 60–90 seconds rest, 3-day cooldown). Dips replace JM press with the same prescription. Exercise names standardized. Each Active card has an individual × to unpin without deleting logs or stopping its timer.

Old JM press and combined wrist performances remain under labeled Legacy alternates when history exists; they are not copied into the new movements. Other exercise histories and seat positions are preserved. Export a backup before replacing files at the same deployment URL. Close all app tabs/windows and reopen to activate the new offline cache.
