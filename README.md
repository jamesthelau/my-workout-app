# Flex Log V4

Offline HTML/CSS/JavaScript PWA. Workout data stays in localStorage. No accounts, backend, external scripts or build step.

## Update and deployment

Export a backup in Misc. Replace all deployed files at the **same URL/path**, including `sw.js`, `manifest.json` and icons. Visit online, close every tab and installed-app window, then reopen to activate cache **4.0.0**. Do not clear browser data. The storage key and ZIP folder name remain unchanged so existing history migrates in place.

For GitHub Pages, upload the contents of `flex-log-v2` to the repository root, enable Pages for the main branch/root and open the resulting HTTPS URL. Install through Chrome’s Add to Home Screen / Install app. For a local preview, run `python3 -m http.server 8080` inside the folder and visit http://localhost:8080/. Do not double-click index.html.

## Workout split and readiness

Upper: Chest, Mid-Back, Lats, Front Delts & Triceps, Biceps. Lower: Quads, Posterior Chain, Adductors. Both tabs contain one **Floating Accessories** accordion with Side & Rear Delts, Forearms, Calves and Core. All views share exercise IDs, history, drafts, pins and timers. Stations remain available for custom equipment folders.

Amber borders and dots indicate due exercises; muted blue-gray indicates recently trained exercises. Every exercise remains clickable and loggable. Logging any set immediately updates readiness. Paired seven-day movements become due when their complementary side is logged, or after seven local midnight boundaries. RDL requires **both** Back Extension and Hip Thrust after its latest log. Standalone three-day/seven-day exercises use their own calendar cycle. See [V4.md](V4.md) for every mapping and edge case.

## Logging and supersets

Blank weight/reps adopt the corresponding set from the previous session, with unit conversion. First-time sets require values. Typed values, including zero weight, take precedence. Saving a set pins the exercise to the active tray, closes its logger and folder, and restores the original scroll position. The tray retains running timers even if a fourth exercise rotates one of the three pins out. Individual × buttons unpin exercises without deleting logs or stopping an unfinished exercise’s timer.

Completing the final planned set stops that exercise’s timer and removes it from the tray. This uses the current target (two, three or a custom number of sets), including out-of-order checkmarks. Other timers continue. There is no bottom timer bar.

The weight field accepts plain numbers or comma-separated blocks with one `x`, `X` or `*` multiplication per block. `45x5, 25x2` = 275; `45x2, 10` = 100. Include the bar explicitly; there is no implicit doubling or thousands separator. Decimals are retained. Text wraps and grows vertically with a live total. Invalid/incomplete expressions cannot be logged. History and progression graphs store numeric totals only.

## Exercise settings and fatigue

[EXERCISES.md](EXERCISES.md) contains the current 32-exercise matrix. Reverse Curl is in Biceps; Reverse Wrist Extension is a three-day forearm accessory (3 × 12–15, 0 RIR, 90 sec, Tier 3). Other prescriptions are preserved.

Hold an exercise or use Edit exercise to change its name, sets, target reps, RIR, rest min/max, tier, rest cycle, category and setup notes. Hold a category or use its Edit button to rename, delete, add or move exercises. Deleted entries retain history; Undo is offered. Custom alternates track their own independent cycles. A complementary group falls back to individual cycles if a member is hidden/deleted or changed to three days.

Fatigue points are awarded once all planned sets are complete: Tier 1 = 3, Tier 2 = 2, Tier 3 = 1. Daily goal = ceiling((seven-day points + 2 × three-day points) / 4). The current seed totals **38 + 16 = 54 weekly points**, giving **14 daily points**. Edits and deletions update this calculation. Custom alternates are excluded from the goal to avoid double-counting a slot, but completed alternates contribute actual fatigue.

End workout stops timers and clears pins while retaining logs and final duration. Reset Daily Fatigue resets the day’s score without removing logs. Reset Cooldowns starts a new readiness epoch without removing logs or changing fatigue.

## Hardware and backups

Misc → Hardware Settings controls audio volume and vibration pulse duration/pattern. Web Audio unlocks on user interaction. A Test button checks supported output on the phone. Browser APIs cannot control motor strength. Physical Galaxy S10 behavior still requires testing on the device; browser background suspension can delay alerts.

Backups contain exercise settings, history, drafts, targets, station links, timers, setup notes, settings and the workout clock. Import validates before replacing state. Migration retains these fields; it moves Reverse Curl to Biceps and Calf Raise to Calves and restores the requested wrist extension. Later user edits survive reopening.

## Checks

Run `npm test` with Node.js. Tests cover migrations, complementary groups, midnight/DST boundaries, shared accessories, tab interactions, auto-fill, plate shorthand, scroll restoration, final-set cleanup and offline cache behavior. Browser layout and physical audio/vibration must be checked separately.
