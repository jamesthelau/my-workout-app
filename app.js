// User-selected schedules with evidence-qualified notes. Reviewed 2026-10-22.
export const SUPPLEMENTS=[
  {
    "id": "multi",
    "name": "Premium Multivitamin",
    "daily": true,
    "dosage": "2 tablets; verify the product serving size.",
    "protocol": "Daily.",
    "timing": "With breakfast or another meal containing some fat.",
    "benefits": "Helps fill dietary micronutrient gaps. B vitamins support normal energy metabolism; they do not provide extra energy when intake is already adequate.",
    "reason": "No routine cycling needed at appropriate label doses. Product ingredients are not confirmed from the name alone.",
    "risks": "Check total B6, vitamin A, zinc and iron across products. Excess is not all harmlessly excreted; chronic excess B6 can damage nerves. Methylated forms are not universally superior. Prefer a third-party-tested product.",
    "sources": [
      [
        "NIH: Multivitamins",
        "https://ods.od.nih.gov/factsheets/MVMS-Consumer/"
      ]
    ]
  },
  {
    "id": "k2",
    "name": "Vitamin K2 (MK-7)",
    "daily": true,
    "dosage": "100 mcg.",
    "protocol": "Daily.",
    "timing": "With a meal containing fat; can accompany the multivitamin.",
    "benefits": "Supports vitamin-K-dependent proteins involved in clotting and bone metabolism.",
    "reason": "No established cycling requirement. It is not proven to remove arterial calcium or prevent cardiovascular disease in everyone.",
    "risks": "Major interaction with warfarin: do not start, stop or change intake without the prescriber. Check whether the multivitamin already contains vitamin K.",
    "sources": [
      [
        "NIH: Vitamin K",
        "https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/"
      ]
    ]
  },
  {
    "id": "omega",
    "name": "Omega-3 (rTG Fish Oil)",
    "daily": true,
    "dosage": "1 softgel labeled 1,250 mg fish oil; verify EPA + DHA separately.",
    "protocol": "Daily.",
    "timing": "With food, at a convenient meal.",
    "benefits": "EPA and DHA contribute to cell membranes and signaling; DHA is important in neural tissue. Benefits depend on diet and the outcome being treated.",
    "reason": "No routine cycling requirement. Total oil weight does not equal active EPA + DHA content.",
    "risks": "May cause fishy burps or stomach upset. Review anticoagulant use. High-dose 4 g/day regimens increased atrial fibrillation in some cardiovascular-risk trials; do not escalate casually. There is no universal 3,000 mg bleeding threshold.",
    "sources": [
      [
        "NIH: Omega-3",
        "https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/"
      ]
    ]
  },
  {
    "id": "magnesium",
    "name": "Magnesium Glycinate",
    "daily": true,
    "dosage": "Your listed range: 210–420 mg; confirm this is elemental magnesium and verify capsule count.",
    "protocol": "Daily; review the higher dose.",
    "timing": "Evening, 30–60 minutes before bed if convenient; food may improve tolerance.",
    "benefits": "Supports normal nerve, muscle and enzyme function. Evidence for improving sleep in people without deficiency is limited.",
    "reason": "No cycling requirement. There is no universal need to avoid ordinary calcium-containing meals.",
    "risks": "420 mg exceeds the US 350 mg/day upper limit from supplements/medicines unless clinician-directed; food magnesium is excluded. Diarrhea is common with excess; kidney impairment raises toxicity risk. Separate from certain antibiotics and osteoporosis medicines according to pharmacist instructions.",
    "sources": [
      [
        "NIH: Magnesium",
        "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/"
      ]
    ]
  },
  {
    "id": "creatine",
    "name": "Creatine Monohydrate",
    "daily": true,
    "dosage": "10 g/day — your selected target; usual maintenance is 3–5 g/day.",
    "protocol": "Daily, including rest days.",
    "timing": "Any consistent time. If using 10 g, split into 5 g twice daily to improve stomach tolerance.",
    "benefits": "Increases muscle phosphocreatine availability for repeated high-intensity efforts and training adaptation.",
    "reason": "No routine cycling needed. More than the usual maintenance dose does not automatically improve results.",
    "risks": "Can cause water-weight gain and GI upset. Hydrate for heat, sweat and thirst; no universal 100+ oz requirement. Discuss use with a clinician if you have kidney disease; tell them before kidney blood tests, since creatinine can rise without proving kidney injury.",
    "sources": [
      [
        "NIH: Exercise supplements",
        "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/"
      ]
    ]
  },
  {
    "id": "citrulline",
    "name": "L-Citrulline (Pure Base)",
    "daily": true,
    "dosage": "6–8 g — your selected dose.",
    "protocol": "Daily by your preference; daily use is not an established requirement.",
    "timing": "Workout days: 45–60 minutes before training. Rest days: any consistent time.",
    "benefits": "Raises arginine availability for nitric-oxide production; exercise-performance findings are mixed.",
    "reason": "No established cycling rule. Long-term daily safety at this dose is less well characterized than creatine.",
    "risks": "May upset the stomach or lower blood pressure. Review use with blood-pressure medicines, nitrates or erectile-dysfunction medicines. Pure citrulline and citrulline malate are not gram-for-gram equivalent. Added salt is optional, not required.",
    "sources": [
      [
        "NIH: Exercise supplements",
        "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/"
      ]
    ]
  },
  {
    "id": "choline",
    "name": "CDP-Choline (Citicoline)",
    "daily": false,
    "dosage": "300 mg.",
    "protocol": "3 nonconsecutive days/week, e.g. Mon/Wed/Sat — your chosen schedule.",
    "timing": "Morning or before cognitive demand; avoid late dosing if it disrupts sleep.",
    "benefits": "Supplies choline for acetylcholine and phospholipid synthesis. Some trials suggest memory benefits; faster processing and better learning are not guaranteed.",
    "reason": "Spacing limits exposure and gives off-days to assess your response. It is not proven necessary to prevent acetylcholine toxicity: 500 mg daily has been studied for 12 weeks. A long metabolite half-life does not establish a toxic ceiling.",
    "risks": "“Choline blues” is not a validated diagnosis or inevitable daily-use effect. Stop and reassess new brain fog, jaw tension, low mood or lethargy rather than assuming a neurotransmitter cause; seek care for persistent symptoms. Daily trial use does not establish indefinite safety for everyone.",
    "sources": [
      [
        "Citicoline: 12-week randomized trial",
        "https://pubmed.ncbi.nlm.nih.gov/33978188/"
      ]
    ]
  },
  {
    "id": "tyrosine",
    "name": "L-Tyrosine (Free-form)",
    "daily": false,
    "dosage": "500 mg — your selected dose; benefit at this dose is uncertain.",
    "protocol": "1–3 times/week for demanding days — your personal cap, not a validated safety threshold.",
    "timing": "Prefer between meals, away from a protein-heavy meal or shake; your planned timing is 30–45 minutes before demand.",
    "benefits": "Precursor for dopamine and norepinephrine. Small studies suggest benefits under acute stress or demanding tasks, not a guaranteed everyday dopamine boost.",
    "reason": "Other large neutral amino acids compete for transport into the brain. Separating a dose from protein may make exposure more predictable; taking it with food does not make it toxic or automatically ineffective. No precise fasting interval is established.",
    "risks": "No good human evidence shows ordinary daily use inevitably downregulates tyrosine hydroxylase or damages baseline dopamine production. Limit unnecessary use because long-term benefit/safety is uncertain, not to prevent a proven shutdown. Do not increase the dose just to chase an effect; review medicines and health conditions with a pharmacist.",
    "sources": [
      [
        "Tyrosine: multitasking trial",
        "https://pubmed.ncbi.nlm.nih.gov/10548261/"
      ],
      [
        "Meals and competing amino acids",
        "https://pubmed.ncbi.nlm.nih.gov/12499331/"
      ]
    ]
  },
  {
    "id": "ashwagandha",
    "name": "KSM-66 Ashwagandha",
    "daily": false,
    "dosage": "600 mg/day during ON periods; extract strengths vary.",
    "protocol": "Your cycle: 4–8 weeks ON, 2–4 weeks OFF; reassess before restarting.",
    "timing": "Evening; with food if needed for stomach tolerance. No established need to take it immediately post-workout.",
    "benefits": "Some preparations may reduce stress and improve sleep; results are extract-specific and studies are generally short.",
    "reason": "Evidence mainly covers short-term use, up to about 3 months. This cycle is not proven to prevent tolerance, anhedonia, receptor changes or liver injury.",
    "risks": "Can cause drowsiness/GI upset; rare liver injury and thyroid effects matter. Stop and seek care for jaundice, dark urine or severe abdominal pain. Avoid during pregnancy/breastfeeding and review thyroid/autoimmune disease, surgery, sedatives and blood-pressure/diabetes medicines. Persistent emotional blunting warrants stopping and assessment.",
    "sources": [
      [
        "NCCIH: Ashwagandha",
        "https://www.nccih.nih.gov/health/ashwagandha"
      ]
    ]
  },
  {
    "id": "theanine",
    "name": "L-Theanine",
    "daily": true,
    "dosage": "200 mg.",
    "protocol": "Daily or as needed; skipping is fine.",
    "timing": "Evening for relaxation/sleep, or with daytime caffeine. Your preference: skip immediately before heavy lifting unless deliberately pairing with caffeine.",
    "benefits": "May support relaxation and some sleep measures. Alpha-wave effects are not proof of better sleep or cognition for everyone.",
    "reason": "A small trial studied 200 mg daily for 4 weeks. No established cycling requirement; long-term data are limited.",
    "risks": "Some people feel too relaxed or drowsy for heavy training; avoid pre-workout use if this occurs. It is not proven to reduce strength or “athletic aggression” universally. Caffeine does not guarantee reversal of drowsiness, and theanine does not make excessive stimulant doses safe. Watch additive drowsiness with other calming products.",
    "sources": [
      [
        "Theanine: 200 mg/day randomized trial",
        "https://pubmed.ncbi.nlm.nih.gov/31623400/"
      ]
    ]
  }
];
export function supplementDates(s,id){return (s.supplementLog||[]).filter(r=>r.id===id).map(r=>r.day).sort().reverse();}
export function setSupplement(s,id,day,checked){
 if(!SUPPLEMENTS.some(x=>x.id===id))throw Error('Unknown supplement');
 s.supplementLog=(s.supplementLog||[]).filter(r=>!(r.id===id&&r.day===day));
 if(checked)s.supplementLog.push({id,day});
}
export function lastTaken(s,id,day){
 const last=supplementDates(s,id)[0];if(!last)return 'Last taken: never';
 const ordinal=d=>Date.UTC(...d.split('-').map((v,i)=>Number(v)-(i===1?1:0)))/86400000;
 const n=ordinal(day)-ordinal(last);
 return n===0?'Last taken: today':n===1?'Last taken: yesterday':n>1?`Last taken: ${n} days ago`:`Last taken: ${last}`;
}

// Model: one exercise ID is shared by the muscle list, folders and active tray.
export const GROUPS = [
  ['chest','Chest','upper'],
  ['mid-back','Mid-Back','upper'],['lats','Lats','upper'],['front-delts','Front Delts & Triceps','upper'],
  ['side-delts','Side & Rear Delts','core'],
  ['biceps','Biceps','upper'],['forearms','Forearms','core'],
  ['quads','Quads','lower'],['posterior-chain','Posterior Chain','lower'],
  ['calves-adductors','Adductors','lower'],['calves','Calves','core'],['core','Core','core']
];
const legacyGroups = {'rear-delts':'side-delts',triceps:'front-delts',hamstrings:'posterior-chain',glutes:'posterior-chain','misc-legs':'posterior-chain','quads-glutes':'quads','hamstrings-adductors-calves':'posterior-chain','upper-chest':'chest','mid-chest':'chest',adductors:'calves-adductors',calves:'calves-adductors','core-flexion':'core','core-stability':'core'};
const seedRows = [
  ['Incline Smith Machine Press','chest',1,3,'5–8',180,240],
  ['Incline Cable Fly','chest',2,3,'8–12',120,180],
  ['Pec Deck','chest',3,2,'12–15',120,120],
  ['Chest-Supported T-Bar Row','mid-back',1,3,'6–10',180,180],
  ['Single-Arm Dumbbell Row','lats',2,3,'8–10',120,180],
  ['Half-Kneeling Single-Arm Pulldown','lats',2,3,'8–12',120,120],
  ['Neutral Grip Lat Pulldown','lats',2,3,'8–12',120,120],
  ['Machine Shoulder Press','front-delts',1,3,'6–10',180,180],
  ['Behind-the-Back Cable Lateral Raise','side-delts',2,3,'10–12',120,120],
  ['Dumbbell Lateral Raise','side-delts',3,3,'12–15',90,120],
  ['Reverse Pec Deck','rear-delts',3,3,'12–15',90,120],
  ['Incline Dumbbell Curl','biceps',2,3,'8–10',120,120],
  ['Preacher Curl','biceps',2,3,'10–12',120,120],
  ['Dumbbell Hammer Curl','biceps',3,3,'10–15',90,120],
  ['Cable Wrist Curl','forearms',3,3,'12–15',60,90],
  ['Machine Dips','chest',2,3,'8–10',180,180],
  ['Cross-Body Overhead Cable Triceps Ext.','front-delts',2,3,'10–12',120,120],
  ['Cross-Body Cable Triceps Pushdown','front-delts',3,3,'10–15',90,120],
  ['Hack Squat','quads',1,3,'6–10',180,300],
  ['Seated Leg Extensions','quads',2,3,'10–15',120,120],
  ['Romanian Deadlift (Barbell or DB)','posterior-chain',1,3,'6–8',180,300],
  ['Seated Machine Leg Curl','posterior-chain',2,3,'8–12',120,120],
  ['Barbell Hip Thrust','posterior-chain',2,3,'8–12',120,180],
  ['Seated Adductor Machine','calves-adductors',2,3,'10–15',120,120],
  ['Standing Machine Calf Raise','calves-adductors',3,3,'8–12',90,120],
  ['Weighted Cable Crunches','core',3,3,'10–15',90,90],
  ['Pallof Press','core',3,3,'10–15',90,90],
  ['Bulgarian Split Squat','quads',2,3,'8–12',120,180],
  ['Reverse Curl','forearms',3,2,'10–15',90,120],
  ['Cable Wrist Extension','forearms',3,3,'12–15',60,90],
  ['45-Degree Back Extension','posterior-chain',2,3,'10–15',120,120]
];
const targetCooldowns = [3,7,7,7,7,7,7,7,3,3,3,7,7,3,3,7,7,3,3,3,7,7,7,7,3,3,7,7,3,3];
const rirTargets = ['1–2','0–1','0','1–2','1','1','1','1–2','0–1','0','0','1','0','0','0','1','0–1','0','1–2','0','1–2','0–1','1','0–1','0','0–1','1','1','0','','1'];
const shortCycles = new Set(['e11','e15','e20','e22','e24','e25','e26','e27']);
const muscleTags = {e1:['chest'],e2:['chest'],e3:['chest'],e16:['chest'],e4:['mid-back'],e5:['lats'],e6:['lats'],e7:['lats'],e8:['front-delts'],e9:['side-delts'],e10:['side-delts'],e11:['rear-delts'],e12:['elbow-flexors'],e13:['elbow-flexors'],e14:['elbow-flexors'],e29:['elbow-flexors'],e15:['wrist-flexors'],e30:['wrist-extensors'],e17:['triceps'],e18:['triceps'],e19:['quads'],e20:['quads'],e28:['quads','glutes'],e21:['hamstrings','glutes','lower-back'],e22:['hamstrings'],e23:['glutes'],e31:['hamstrings','glutes','lower-back'],e24:['adductors'],e25:['calves'],e26:['core'],e27:['core']};
const previousSeed = seedRows.map(([name,group,tier,sets,reps,min,max],i)=>({id:`e${i+1}`,name,group,tier,sets,reps,rir:rirTargets[i],restCycle:shortCycles.has(`e${i+1}`)?3:7,muscles:muscleTags[`e${i+1}`],rest:[min,max],targetCooldown:targetCooldowns[i] || 7,parent:null,seat:'',...(i===29?{archived:true}:{})}));
const currentRows = [
  {
    "id": "e1",
    "name": "Convergent Machine Chest Press",
    "group": "chest",
    "tier": 2,
    "sets": 3,
    "reps": "6–10",
    "rir": "1–2",
    "rest": [
      180,
      240
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "chest"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e16",
    "name": "Incline Machine or DB Press",
    "group": "chest",
    "tier": 2,
    "sets": 3,
    "reps": "8–12",
    "rir": "1",
    "rest": [
      180,
      180
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "chest"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e2",
    "name": "Incline Cable Fly",
    "group": "chest",
    "tier": 3,
    "sets": 3,
    "reps": "10–12",
    "rir": "0–1",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "chest"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e3",
    "name": "Pec Deck",
    "group": "chest",
    "tier": 3,
    "sets": 3,
    "reps": "12–15",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "chest"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e4",
    "name": "Chest-Supported T-Bar Row",
    "group": "mid-back",
    "tier": 2,
    "sets": 3,
    "reps": "6–10",
    "rir": "1–2",
    "rest": [
      180,
      180
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "mid-back"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e5",
    "name": "Seated Cable Row",
    "group": "mid-back",
    "tier": 2,
    "sets": 3,
    "reps": "8–12",
    "rir": "1",
    "rest": [
      120,
      180
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "mid-back"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e6",
    "name": "Half-Kneeling Cross-Body Pulldown",
    "group": "lats",
    "tier": 2,
    "sets": 3,
    "reps": "8–12",
    "rir": "1",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "lats"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e7",
    "name": "Neutral Grip Lat Pulldown",
    "group": "lats",
    "tier": 2,
    "sets": 3,
    "reps": "8–12",
    "rir": "1",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "lats"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e8",
    "name": "Machine Shoulder Press",
    "group": "front-delts",
    "tier": 2,
    "sets": 3,
    "reps": "6–10",
    "rir": "1–2",
    "rest": [
      180,
      180
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "front-delts"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e17",
    "name": "Cross-Body Overhead Cable Ext.",
    "group": "front-delts",
    "tier": 3,
    "sets": 3,
    "reps": "10–12",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "triceps"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e18",
    "name": "Cross-Body Cable Pushdown",
    "group": "front-delts",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "triceps"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e9",
    "name": "Machine Lateral Raise (Alternating)",
    "group": "side-delts",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "side-delts"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e10",
    "name": "Cross-Body Cable Lateral (Alternating)",
    "group": "side-delts",
    "tier": 3,
    "sets": 3,
    "reps": "12–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "side-delts"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e11",
    "name": "Reverse Pec Deck",
    "group": "side-delts",
    "tier": 3,
    "sets": 3,
    "reps": "12–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "rear-delts"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e12",
    "name": "Incline Dumbbell Curl",
    "group": "biceps",
    "tier": 3,
    "sets": 3,
    "reps": "8–12",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "elbow-flexors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e13",
    "name": "Preacher Curl",
    "group": "biceps",
    "tier": 3,
    "sets": 3,
    "reps": "10–12",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "elbow-flexors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e14",
    "name": "Dumbbell Hammer Curl",
    "group": "biceps",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "elbow-flexors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e15",
    "name": "Cable Wrist Curl",
    "group": "forearms",
    "tier": 3,
    "sets": 3,
    "reps": "12–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "wrist-flexors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e29",
    "name": "Reverse Curl",
    "group": "forearms",
    "tier": 3,
    "sets": 2,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "elbow-flexors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e19",
    "name": "Hack Squat",
    "group": "quads",
    "tier": 1,
    "sets": 3,
    "reps": "6–10",
    "rir": "1–2",
    "rest": [
      240,
      300
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "quads"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e28",
    "name": "Bulgarian Split Squat",
    "group": "quads",
    "tier": 2,
    "sets": 3,
    "reps": "8–12",
    "rir": "1",
    "rest": [
      180,
      180
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "quads",
      "glutes"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e20",
    "name": "Seated Leg Extensions",
    "group": "quads",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "quads"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e21",
    "name": "Romanian Deadlift (Bilateral)",
    "group": "posterior-chain",
    "tier": 1,
    "sets": 3,
    "reps": "6–8",
    "rir": "1–2",
    "rest": [
      240,
      300
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "hamstrings",
      "glutes",
      "lower-back"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e31",
    "name": "45-Degree Back Ext. (Bilateral)",
    "group": "posterior-chain",
    "tier": 2,
    "sets": 3,
    "reps": "10–15",
    "rir": "1",
    "rest": [
      120,
      120
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "hamstrings",
      "glutes",
      "lower-back"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e23",
    "name": "Barbell Hip Thrust",
    "group": "posterior-chain",
    "tier": 2,
    "sets": 3,
    "reps": "8–12",
    "rir": "1",
    "rest": [
      180,
      180
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "glutes"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e22",
    "name": "Seated Machine Leg Curl",
    "group": "posterior-chain",
    "tier": 3,
    "sets": 3,
    "reps": "8–12",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "hamstrings"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e24",
    "name": "Seated Adductor Machine",
    "group": "calves-adductors",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "adductors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e32",
    "name": "Seated Abductor Machine",
    "group": "calves-adductors",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      120,
      120
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "hip-abductors"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e25",
    "name": "Leg Press Calf Raise",
    "group": "calves-adductors",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 3,
    "targetCooldown": 3,
    "muscles": [
      "calves"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e26",
    "name": "Weighted Cable Crunches",
    "group": "core",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "0",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "core"
    ],
    "parent": null,
    "seat": ""
  },
  {
    "id": "e27",
    "name": "Hanging / Captain's Chair Leg Raise",
    "group": "core",
    "tier": 3,
    "sets": 3,
    "reps": "10–15",
    "rir": "1",
    "rest": [
      90,
      90
    ],
    "restCycle": 7,
    "targetCooldown": 7,
    "muscles": [
      "core"
    ],
    "parent": null,
    "seat": ""
  }
];
// Stable IDs keep logs, drafts, pins and user edits attached to the same movement.
const v4Moves={e29:'biceps',e25:'calves'};
const wristExtension={...previousSeed.find(e=>e.id==='e30'),name:'Reverse Wrist Extension',archived:false,rir:'0',rest:[90,90],restCycle:3,targetCooldown:3};
export const SEED = [...currentRows.map(e=>({...e,group:v4Moves[e.id]||e.group})),wristExtension];
export const COMPLEMENTARY = [
  [['e1'],['e16']], [['e2'],['e3']], [['e4'],['e5']], [['e6'],['e7']],
  [['e17'],['e18']], [['e12'],['e13']], [['e14'],['e29']], [['e19'],['e28']],
  [['e21'],['e31','e23']], [['e9'],['e10']], [['e26'],['e27']]
];
export function groupArea(group){return ['side-delts','forearms','calves','core'].includes(group[0])?'floating':group[2]==='lower'?'lower':group[2]==='core'?'floating':'upper';}
export function homeGroups(s,tab='upper'){
  const active=s.groups.filter(g=>!s.hiddenGroups.includes(g[0]));
  return {main:active.filter(g=>groupArea(g)===tab),floating:active.filter(g=>groupArea(g)==='floating')};
}
export const copy = value => structuredClone(value);
export const id = () => crypto.randomUUID();
export const nameKey = name => name.trim().normalize('NFKC').toLowerCase();
export const points = exercise => 4-exercise.tier;
export function localDay(now=new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
export function ordinal(day) {
  const [y,m,d]=day.split('-').map(Number);
  return Date.UTC(y,m-1,d)/86400000;
}
export const daysBetween = (earlier,later) => Math.max(0,ordinal(later)-ordinal(earlier));
export function initialState() {
  return {version:2,revision:10,groups:copy(GROUPS),hiddenGroups:[],exercises:copy(SEED),history:[],supplementLog:[],drafts:{},plans:{},epoch:0,fatigueResets:{},
    folders:[{id:'cables',name:'Cable Station',exerciseIds:['e2','e6','e10','e15','e17','e18','e26','e5']}],
    pinned:[],timers:{},clock:{startedAt:null,elapsed:0,ended:false},
    settings:{unit:'lbs',sound:true,haptics:true,volume:0.6,hapticIntensity:0.5},rest:{}};
}
export const exerciseById = (s,exerciseId) => s.exercises.find(e=>e.id===exerciseId);
export const dayKey = (day,exerciseId) => `${day}|${exerciseId}`;
export const draftKey = (day,exerciseId,index) => `${day}|${exerciseId}|${index}`;
export const targetSets = (s,exerciseId,day=localDay()) => s.plans[dayKey(day,exerciseId)] || exerciseById(s,exerciseId).sets;
export const dailyRecords = (s,exerciseId,day=localDay()) => s.history.filter(r=>r.exerciseId===exerciseId&&r.day===day).sort((a,b)=>a.index-b.index);
export function completion(s,exerciseId,day=localDay()) {
  const target=targetSets(s,exerciseId,day),done=dailyRecords(s,exerciseId,day).length;
  return {target,done,complete:done===target};
}
// Variations retain their record IDs; planning and points belong to the root slot.
export const slotId = (s,eid) => exerciseById(s,eid).parent || eid;
export const slotVariants = (s,eid) => s.exercises.filter(e=>slotId(s,e.id)===slotId(s,eid));
export function slotCompletion(s,eid,day=localDay(),epochOnly=false){
  const root=slotId(s,eid),variants=slotVariants(s,root);
  const records=variants.flatMap(e=>dailyRecords(s,e.id,day)).filter(r=>!epochOnly||r.epoch===s.epoch);
  const target=targetSets(s,root,day),done=records.length;
  const full=variants.some(e=>records.filter(r=>r.exerciseId===e.id).length>=targetSets(s,e.id,day));
  return {target:full&&done<target?done:target,done,complete:full||done>=target};
}
export function slotReadiness(s,eid,day=localDay()){
  return slotVariants(s,eid).map(e=>readiness(s,e.id,day)).filter(Boolean).sort((a,b)=>b.at.localeCompare(a.at))[0]||null;
}
export function selectVariation(s,eid){
  const e=exerciseById(s,eid),root=exerciseById(s,slotId(s,eid));
  if(e.archived||root.archived)throw Error('Choose an active variation.');
  (s.selectedVariants ||= {})[root.id]=eid;
}
export function visibleSlots(s,exercises,query=''){
  const roots=[...new Set(exercises.map(e=>slotId(s,e.id)))];
  return roots.map(root=>{
    const base=exerciseById(s,root);if(base.archived||s.hiddenGroups.includes(base.group))return null;
    const variants=slotVariants(s,root).filter(e=>!e.archived);
    const matches=variants.filter(e=>!query||`${e.name} ${s.groups.find(g=>g[0]===base.group)[1]}`.toLowerCase().includes(query));
    if(!matches.length)return null;
    const selected=matches.find(e=>e.id===s.selectedVariants?.[root])||matches.find(e=>e.id===root)||matches[0];
    return {...selected,group:base.group,tier:base.tier,restCycle:base.restCycle};
  }).filter(Boolean);
}
export function fatigue(s,day=localDay()) {
  const excluded=new Set((s.fatigueResets[day]||[]).map(eid=>slotId(s,eid)));
  const complete=s.exercises.filter(e=>!e.parent&&!excluded.has(e.id)&&slotCompletion(s,e.id,day).complete);
  return {score:complete.reduce((n,e)=>n+points(e),0),count:complete.length};
}
export function readiness(s,exerciseId,day=localDay()) {
  const record=s.history.filter(r=>r.exerciseId===exerciseId&&r.epoch===s.epoch&&r.day<=day).sort((a,b)=>b.at.localeCompare(a.at))[0];
  return record?{days:daysBetween(record.day,day),day:record.day,at:record.at}:null;
}
export function readinessStatus(s,exerciseId,day=localDay()) {
  const hit=readiness(s,exerciseId,day),targetCooldown=exerciseById(s,exerciseId).targetCooldown;
  const remaining=hit?Math.max(0,targetCooldown-hit.days):0;
  return {hit,targetCooldown,remaining,ready:remaining===0};
}
export function migrateState(input) {
  // Validate legacy data first; preserve exercise IDs and every historical record.
  const s=copy(validateState(input,{allowMissingCooldown:true,legacy:true}));
  if(s.revision>=9){s.revision=10;return validateState(s);}
  if(s.revision===8)return updateV4(s);
  if(s.revision===7)return updateExerciseList(s);
  if(s.revision===6)return updateV3(s);
  // Keep existing reverse-curl sessions/drafts at their original planned set count.
  for(const day of new Set([...s.history.filter(r=>r.exerciseId==='e29').map(r=>r.day),...Object.keys(s.drafts).filter(k=>k.split('|')[1]==='e29').map(k=>k.split('|')[0])])){
    s.plans[dayKey(day,'e29')] ||= exerciseById(s,'e29').sets;
  }
  if(s.revision===5)return updatePrescriptions(s);
  if(s.revision===4)return updateMachineExercises(s);
  // Preserve old performances without attributing them to a different movement.
  for(const [eid,oldName] of [['e16','JM Press'],['e15','Cable Wrist Curls & Reverse']]){
    const old=exerciseById(s,eid);
    if(old?.name!==oldName)continue;
    const legacyId=`legacy-${eid}`;
    if(s.history.some(r=>r.exerciseId===eid)){
      s.exercises.push({...copy(old),id:legacyId,name:`${oldName} (Legacy)`,parent:eid});
      for(const r of s.history)if(r.exerciseId===eid)r.exerciseId=legacyId;
      for(const field of ['plans','drafts'])for(const key of Object.keys(s[field])){
        const parts=key.split('|');if(parts[1]!==eid)continue;
        parts[1]=legacyId;s[field][parts.join('|')]=s[field][key];delete s[field][key];
      }
      for(const field of ['timers','rest'])if(s[field][eid]){s[field][legacyId]=s[field][eid];delete s[field][eid];}
      for(const ids of Object.values(s.fatigueResets||{}))for(let i=0;i<ids.length;i++)if(ids[i]===eid)ids[i]=legacyId;
    } else {
      for(const field of ['plans','drafts'])for(const key of Object.keys(s[field]))if(key.split('|')[1]===eid)delete s[field][key];
    }
    old.seat='';
  }
  s.groups=[...copy(GROUPS),['rear-delts','Rear Delts','upper']];s.hiddenGroups=[];
  for(const exercise of s.exercises)exercise.group=legacyGroups[exercise.group]||exercise.group;
  for(const seed of previousSeed){
    const existing=exerciseById(s,seed.id);
    if(existing){existing.targetCooldown=seed.targetCooldown;existing.group=seed.group;existing.name=seed.name;existing.tier=seed.tier;existing.rest=copy(seed.rest);existing.reps=seed.reps;existing.sets=seed.sets;}
    else s.exercises.push(copy(seed));
  }
  for(const exercise of s.exercises){
    if(exercise.parent)exercise.group=exerciseById(s,exercise.parent).group;
    if(exercise.targetCooldown===undefined)exercise.targetCooldown=exerciseById(s,exercise.parent)?.targetCooldown ?? 3;
  }
  s.fatigueResets ||= {};
  s.clock.ended ??= false;
  return updateMachineExercises(s);
}
function updateMachineExercises(s) {
  const dips=exerciseById(s,'e16');
  dips.name='Machine Dips';dips.group='chest';
  for(const e of s.exercises)if(e.parent==='e16')e.group='chest';
  exerciseById(s,'e8').name='Machine Shoulder Press';
  archiveExercise(s,'e30');
  return updatePrescriptions(s);
}
function updatePrescriptions(s) {
  for(const seed of previousSeed){
    const e=exerciseById(s,seed.id);e.rir=seed.rir;
    if(seed.id==='e16'){e.tier=2;e.reps='8–10';}
    if(seed.id==='e29')e.sets=2;
    if(seed.id==='e21'&&e.name==='Romanian Deadlift (Barbell or Dumbbells)')e.name=seed.name;
    if(seed.id==='e17'&&e.name==='Cross-Body Overhead Cable Triceps Extension')e.name=seed.name;
  }
  for(const e of s.exercises)if(e.rir===undefined)e.rir='';
  return updateV3(s);
}
function updateV3(s){
  for(const e of s.exercises){const seed=previousSeed.find(x=>x.id===e.id);e.restCycle=seed?.restCycle||exerciseById(s,e.parent)?.restCycle||3;e.muscles=copy(seed?.muscles||exerciseById(s,e.parent)?.muscles||[e.group]);}
  s.settings.volume ??= 0.6;s.settings.hapticIntensity ??= 0.5;
  s.revision=7;return updateExerciseList(s);
}
function updateExerciseList(s){
  // Distinct replacements get distinct archived history, drafts and baselines.
  const replaced=new Set(['e1','e16','e5','e6','e9','e10','e25','e27']);
  for(const seed of currentRows){
    const e=exerciseById(s,seed.id);
    if(!e){s.exercises.push(copy(seed));continue;}
    if(replaced.has(e.id)&&e.name!==seed.name){
      const oldId=`v7-${e.id}`;
      if(!exerciseById(s,oldId))s.exercises.push({...copy(e),id:oldId,archived:true,parent:null});
      for(const r of s.history)if(r.exerciseId===e.id)r.exerciseId=oldId;
      for(const field of ['plans','drafts'])for(const key of Object.keys(s[field])){
        const parts=key.split('|');if(parts[1]!==e.id)continue;
        parts[1]=oldId;s[field][parts.join('|')]=s[field][key];delete s[field][key];
      }
      for(const ids of Object.values(s.fatigueResets))for(let i=0;i<ids.length;i++)if(ids[i]===e.id)ids[i]=oldId;
      for(const alt of s.exercises)if(alt.parent===e.id)alt.parent=oldId;
      delete s.timers[e.id];delete s.rest[e.id];s.pinned=s.pinned.filter(id=>id!==e.id);e.seat='';
    }else if(e.sets!==seed.sets){
      for(const day of new Set([...s.history.filter(r=>r.exerciseId===e.id).map(r=>r.day),...Object.keys(s.drafts).filter(k=>k.split('|')[1]===e.id).map(k=>k.split('|')[0])]))s.plans[dayKey(day,e.id)] ||= e.sets;
    }
    const seat=e.seat;Object.assign(e,copy(seed),{seat});
  }
  for(const e of s.exercises)if(e.group==='rear-delts')e.group='side-delts';
  s.groups=s.groups.filter(g=>g[0]!=='rear-delts');
  for(const group of GROUPS){const g=s.groups.find(g=>g[0]===group[0]);if(g)g[1]=group[1];else s.groups.push(copy(group));}
  s.hiddenGroups=s.hiddenGroups.filter(g=>!GROUPS.some(x=>x[0]===g)&&g!=='rear-delts');
  s.revision=8;return updateV4(s);
}
function updateV4(s){
  for(const group of GROUPS){
    const existing=s.groups.find(g=>g[0]===group[0]);
    if(!existing)s.groups.push(copy(group));
    else {
      existing[2]=group[2];
      if(existing[0]==='calves-adductors'&&existing[1]==='Calves & Adductors')existing[1]='Adductors';
    }
  }
  for(const e of s.exercises){
    if(e.id==='e29'&&e.group==='forearms')e.group='biceps';
    if((e.id==='e25'||e.parent==='e25')&&e.group==='calves-adductors')e.group='calves';
    if(e.parent==='e29'&&e.group==='forearms')e.group='biceps';
  }
  // Reintroduce the requested wrist movement without overwriting any saved prescription.
  const wrist=exerciseById(s,'e30');
  if(!wrist)s.exercises.push(copy(wristExtension));
  else {if(wrist.archived){wrist.restCycle=3;wrist.targetCooldown=3;}wrist.archived=false;if(wrist.name==='Cable Wrist Extension')wrist.name=wristExtension.name;if(!wrist.rir)wrist.rir='0';if(wrist.rest[0]===60&&wrist.rest[1]===90)wrist.rest=[90,90];}
  s.revision=10;return validateState(s);
}
export function fatigueGoal(s){
  const active=s.exercises.filter(e=>!e.archived&&!e.parent&&!s.hiddenGroups.includes(e.group));
  const weekly7=active.filter(e=>e.restCycle===7).reduce((n,e)=>n+points(e),0);
  const weekly3=active.filter(e=>e.restCycle===3).reduce((n,e)=>n+2*points(e),0);
  return {weekly7,weekly3,weekly:weekly7+weekly3,daily:Math.ceil((weekly7+weekly3)/4)};
}
function activePair(s,eid){
  const available=id=>{const e=exerciseById(s,id);return e&&!e.archived&&!s.hiddenGroups.includes(e.group)&&e.restCycle===7;};
  return COMPLEMENTARY.find(sides=>sides.flat().includes(eid)&&sides.flat().every(available));
}
export function urgency(s,eid,day=localDay()){
  eid=slotId(s,eid);
  const e=exerciseById(s,eid),cycle=e.restCycle,hit=slotReadiness(s,eid,day);
  const pair=cycle===7&&activePair(s,eid);
  let due=!hit||hit.days>=cycle,recovery=null;
  if(pair){
    const latest=new Map(),ids=new Set(pair.flat());
    const after=(a,b)=>!!a&&(!b||a.at>b.at||a.at===b.at&&a.order>b.order);
    let last=null;
    const events=s.history.map((r,order)=>({...r,exerciseId:slotId(s,r.exerciseId),order})).filter(r=>r.epoch===s.epoch&&r.day<=day&&ids.has(r.exerciseId)).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at)||a.order-b.order);
    for(const r of events){
      const event={at:Date.parse(r.at),day:r.day,order:r.order};
      if(last&&daysBetween(last.day,event.day)>=6)latest.clear();
      latest.set(r.exerciseId,event);last=event;
    }
    // Six quiet calendar days reset the whole pair, not each exercise separately.
    if(!last||daysBetween(last.day,day)>=6)due=true;
    else {
      const own=latest.get(eid),opposite=pair.find(side=>!side.includes(eid));
      due=!own||opposite.every(id=>after(latest.get(id),own));
      // A compound counterpart only triggers after every member has been hit.
      if(due&&opposite.every(id=>latest.has(id))){
        const trigger=opposite.map(id=>latest.get(id)).sort((a,b)=>b.at-a.at||b.order-a.order)[0];
        const days=daysBetween(trigger.day,day);
        if(days<3)recovery={days,remaining:3-days,day:trigger.day};
      }
    }
  }
  return {hit,ratio:due&&!recovery?1:0,cycle,level:recovery?'recovering':due?'due':'cold',paired:!!pair,...(recovery?{recovery}:{})};
}
export function folderUrgency(s,ids,day=localDay()){
  const wanted=new Set(ids.map(eid=>slotId(s,eid)));
  const members=s.exercises.filter(e=>wanted.has(slotId(s,e.id))&&!exerciseById(s,slotId(s,e.id)).archived&&!s.hiddenGroups.includes(exerciseById(s,slotId(s,e.id)).group));
  const beforeToday={...s,history:s.history.filter(r=>r.day!==day)};
  const started=eid=>dailyRecords(s,eid,day).some(r=>r.epoch===s.epoch);
  const finished=eid=>dailyRecords(s,eid,day).filter(r=>r.epoch===s.epoch).length===targetSets(s,eid,day);
  const roots=[...new Set(members.map(e=>e.parent||e.id))],visited=new Set();
  const variants=root=>members.filter(e=>(e.parent||e.id)===root).map(e=>e.id);
  const rootDone=root=>slotCompletion(s,root,day,true).complete;
  let outstanding=false,required=0;
  for(const root of roots){
    if(visited.has(root))continue;
    const pair=activePair(s,root);
    const sides=pair?pair.map(side=>side.filter(id=>roots.includes(id))).filter(side=>side.length):[[root]];
    const slotRoots=sides.flat();slotRoots.forEach(id=>visited.add(id));
    const slotIds=slotRoots.flatMap(variants);
    const needed=slotIds.some(started)||slotRoots.some(root=>{const eid=members.some(e=>e.id===root)?root:variants(root)[0];return urgency(beforeToday,eid,day).level==='due';});
    if(!needed)continue;
    required++;
    const done=sides.some(side=>side.every(rootDone));
    const unfinished=slotRoots.some(root=>variants(root).some(started)&&!rootDone(root));
    if(!done||unfinished)outstanding=true;
  }
  const dailyComplete=required>0&&!outstanding&&roots.some(rootDone);
  const warm=outstanding&&roots.some(root=>urgency(s,root,day).level==='due');
  return {ratio:warm?1:0,level:warm?'due':'cold',dailyComplete};
}
export function activeIds(s){return [...new Set([...s.pinned,...Object.keys(s.timers)])];}
export function completeWithHistory(s,eid,index,input,now=new Date(),recordId=id()){
  const prior=previousSet(s,eid,index,localDay(now));const values={...input};
  for(const field of ['weight','reps'])if(String(values[field]??'').trim()===''){
    if(!prior)throw Error('Enter weight and reps for your first session.');
    values[field]=field==='weight'?(prior.weight===null?prior.weightNote:inUnit(prior,s.settings.unit)):prior.reps;
  }
  const record=logSet(s,eid,index,values,now,recordId);
  s.pinned=s.pinned.filter(id=>slotId(s,id)!==slotId(s,eid));
  selectVariation(s,eid);
  if(!slotCompletion(s,eid,localDay(now)).complete){s.pinned.push(eid);s.pinned=s.pinned.slice(-3);}
  return record;
}
export function vibrationPattern(intensity,alarm=false){
  if(intensity<=0)return 0;const pulse=Math.round((alarm?70:12)+intensity*(alarm?180:35));
  return alarm?[pulse,90,pulse]:pulse;
}
export function setRir(s,eid,value){
  if(typeof value!=='string'||!/^$|^([0-9]|10)([–-]([0-9]|10))?$/.test(value))throw Error('Use a RIR number or range from 0 to 10, or leave blank.');
  const nums=value.split(/[–-]/).map(Number);if(nums.length===2&&nums[0]>nums[1])throw Error('RIR range must increase.');
  exerciseById(s,eid).rir=value.replace('-','–');
}
export function previousSession(s,exerciseId,day=localDay()) {
  const records=s.history.filter(r=>r.exerciseId===exerciseId&&r.day<day);
  const lastDay=records.reduce((latest,r)=>r.day>latest?r.day:latest,'');
  return records.filter(r=>r.day===lastDay).sort((a,b)=>a.index-b.index);
}
export function previousSet(s,exerciseId,index,day=localDay()) {
  const session=previousSession(s,exerciseId,day);
  return session.find(r=>r.index===index) || session.at(-1) || null;
}
export function inUnit(record,unit) {
  if(record.weight===null)return null;
  return record.unit===unit?record.weight:Math.round(record.weight*(unit==='kg'?1/2.2046226218:2.2046226218)*100)/100;
}
export function weightText(record,unit=record.unit){
  const weight=inUnit(record,unit);
  return [weight===null?'':String(weight),record.weightNote||''].filter(Boolean).join(' ');
}
export function writeDraft(s,exerciseId,index,field,value,day=localDay()) {
  const key=draftKey(day,exerciseId,index);
  const draft=s.drafts[key] ||= {weight:'',reps:'',partial:false};
  draft[field]=value;
}
export function copyPrevious(s,exerciseId,index,day=localDay()) {
  const previous=previousSet(s,exerciseId,index,day);
  if(!previous)throw Error('No earlier session to copy yet.');
  s.drafts[draftKey(day,exerciseId,index)]={weight:weightText(previous,s.settings.unit),reps:String(previous.reps),partial:false};
}
export function copySetAbove(s,eid,index,day=localDay()) {
  if(index<1||dailyRecords(s,eid,day).some(r=>r.index===index))return false;
  const key=draftKey(day,eid,index),draft=s.drafts[key];
  if(draft&&(draft.weight.trim()||draft.reps.trim()||(draft.drops||[]).some(d=>d.weight.trim()||d.reps.trim())))return false;
  const record=dailyRecords(s,eid,day).find(r=>r.index===index-1);
  const above=record?{weight:weightText(record,s.settings.unit),reps:String(record.reps)}:s.drafts[draftKey(day,eid,index-1)];
  if(!above||!above.weight.trim()||!above.reps.trim())return false;
  s.drafts[key]={...draft,weight:above.weight,reps:above.reps,partial:false};return true;
}
export function editDrop(s,eid,index,action,round=0,field='',value='',day=localDay()) {
  if(dailyRecords(s,eid,day).some(r=>r.index===index))throw Error('Uncheck the set to edit its drop rounds.');
  const draft=s.drafts[draftKey(day,eid,index)] ||= {weight:'',reps:'',partial:false};
  const drops=draft.drops ||= [];
  if(action==='add')drops.push({weight:'',reps:''});
  else if(action==='remove')drops.splice(round,1);
  else if(drops[round]&&['weight','reps'].includes(field))drops[round][field]=value;
}
function parseDrops(drops=[]) {
  if(!Array.isArray(drops))throw Error('Invalid drop rounds.');
  return drops.filter(d=>String(d.weight??'').trim()||String(d.reps??'').trim()).map(d=>{
    const parsed=parseWeightEntry(d.weight);
    if(!Number.isInteger(Number(d.reps))||Number(d.reps)<1||Number(d.reps)>999)throw Error('Enter weight and whole-number reps for each drop round.');
    return {...parsed,reps:Number(d.reps)};
  });
}
export function parseWeightEntry(value){
  if(typeof value==='number'){
    if(Number.isFinite(value)&&value>=0&&value<=10000)return {weight:value,weightNote:''};
    throw Error('Total weight must be from 0 to 10,000.');
  }
  if(typeof value!=='string'||!value.trim()||value.length>200)throw Error('Enter a load, plate math or a text label.');
  const text=value.trim();
  if(/^0[xX][0-9a-f]+$/i.test(text))throw Error('Use decimal weights or plate math.');
  const number=/^(?:\d+(?:\.\d+)?|\.\d+)/;
  if(!number.test(text)){
    if(/^[+\-.,*\d]/.test(text))throw Error('Check the weight calculation.');
    return {weight:null,weightNote:text};
  }
  let rest=text,total=0;
  while(true){
    const left=rest.match(number);if(!left)throw Error('Add a number after the comma.');
    let amount=Number(left[0]);rest=rest.slice(left[0].length).trimStart();
    if(/^(?:[xX](?=\s|[\d.]|$)|\*)/.test(rest)){
      rest=rest.slice(1).trimStart();const right=rest.match(number);
      if(!right)throw Error('Add a number after x or *.');
      amount*=Number(right[0]);rest=rest.slice(right[0].length).trimStart();
    }
    total+=amount;
    if(!Number.isFinite(total)||total>10000)throw Error('Total weight must be from 0 to 10,000.');
    if(rest.startsWith(',')){
      const next=rest.slice(1).trimStart();
      if(number.test(next)){rest=next;continue;}
      if(!next||/^[,*+\-./\d]/.test(next))throw Error('Add a number after the comma.');
      rest=next;
    }
    if(/^(?:[xX](?=\s|[\d.]|$)|[*+\/;\d.]|-(?=\s*[\d.]|$))/.test(rest)||/^e\d/i.test(rest))throw Error('Use commas to add and one x or * per block.');
    return {weight:Math.round(total*1e8)/1e8,weightNote:rest.trim()};
  }
}
export function parseWeight(value){return parseWeightEntry(value).weight;}
export function logSet(s,exerciseId,index,input,now=new Date(),recordId=id()) {
  const exercise=exerciseById(s,exerciseId),day=localDay(now),target=targetSets(s,exerciseId,day);
  if(!exercise||!Number.isInteger(index)||index<0||index>=target)throw Error('This set is outside the daily target.');
  if(dailyRecords(s,exerciseId,day).some(r=>r.index===index))throw Error('This set is already logged.');
  const {weight,reps,partial=false}=input;
  const parsed=parseWeightEntry(weight);
  if(String(reps).trim()===''||!Number.isInteger(Number(reps))||Number(reps)<1||Number(reps)>999)throw Error('Enter whole-number reps from 1 to 999.');
  const record={id:recordId,exerciseId,index,day,at:now.toISOString(),weight:parsed.weight,...(parsed.weightNote?{weightNote:parsed.weightNote}:{}),reps:Number(reps),unit:s.settings.unit,partial:!!partial,epoch:s.epoch};
  const drops=parseDrops(input.drops);if(drops.length)record.drops=drops;
  s.history.push(record);delete s.drafts[draftKey(day,exerciseId,index)];
  s.plans[dayKey(day,exerciseId)]=target;
  const seconds=s.rest[exerciseId] || (exercise.rest[0]+exercise.rest[1])/2;
  if(slotCompletion(s,exerciseId,day).complete){
    for(const e of slotVariants(s,exerciseId))delete s.timers[e.id];s.pinned=s.pinned.filter(eid=>slotId(s,eid)!==slotId(s,exerciseId));
  }else {
    for(const e of slotVariants(s,exerciseId))delete s.timers[e.id];
    s.timers[exerciseId]={end:now.getTime()+seconds*1000,duration:seconds,recordId};
  }
  if(s.clock.ended||s.clock.startedAt===null&&s.clock.elapsed===0)startWorkout(s,now.getTime());
  return record;
}
export function unlogSet(s,exerciseId,index,day=localDay()) {
  const record=dailyRecords(s,exerciseId,day).find(r=>r.index===index);
  if(!record)return;
  s.history=s.history.filter(r=>r.id!==record.id);
  s.drafts[draftKey(day,exerciseId,index)]={weight:weightText(record,s.settings.unit),reps:String(record.reps),partial:record.partial,...(record.drops?{drops:record.drops.map(d=>({weight:weightText({...d,unit:record.unit},s.settings.unit),reps:String(d.reps)}))}:{})};
  if(s.timers[exerciseId]?.recordId===record.id)delete s.timers[exerciseId];
}
export function changeTarget(s,exerciseId,target,day=localDay()) {
  if(!Number.isInteger(target)||target<1||target>10)throw Error('Daily targets can contain 1–10 sets.');
  if(dailyRecords(s,exerciseId,day).some(r=>r.index>=target))throw Error('Uncheck the last set before removing it.');
  s.plans[dayKey(day,exerciseId)]=target;
  for(let i=target;i<10;i++)delete s.drafts[draftKey(day,exerciseId,i)];
}
export function addAlternate(s,parentId,name,{tier,sets,reps}={},newId=id()) {
  const parent=exerciseById(s,parentId);
  if(!parent)throw Error('Choose a parent exercise.');
  if(typeof name!=='string'||!name.trim()||name.trim().length>100)throw Error('Enter a name from 1–100 characters.');
  if(s.exercises.some(e=>nameKey(e.name)===nameKey(name)))throw Error('That exercise already exists. Add the existing entry to your folder instead.');
  if(tier!==undefined&&(!Number.isInteger(tier)||tier<1||tier>3))throw Error('Choose a tier from 1 to 3.');
  if(sets!==undefined&&(!Number.isInteger(sets)||sets<1||sets>10))throw Error('Choose 1–10 sets.');
  if(reps!==undefined&&(typeof reps!=='string'||!reps.trim()||reps.length>30))throw Error('Enter a rep range.');
  const exercise={...copy(parent),id:newId,parent:parent.parent||parent.id,name:name.trim(),seat:'',tier:exerciseById(s,parent.parent||parent.id).tier,sets:sets||parent.sets,reps:reps||parent.reps};
  s.exercises.push(exercise);return exercise;
}
export function setFolder(s,folderId,name,exerciseIds) {
  if(typeof name!=='string'||!name.trim()||name.trim().length>60)throw Error('Name your station (1–60 characters).');
  if(s.folders.some(f=>f.id!==folderId&&nameKey(f.name)===nameKey(name)))throw Error('A station with that name already exists.');
  if(exerciseIds.some(eid=>!exerciseById(s,eid)))throw Error('A selected exercise no longer exists.');
  const folder={id:folderId,name:name.trim(),exerciseIds:[...new Set(exerciseIds)]};
  const index=s.folders.findIndex(f=>f.id===folderId);
  if(index<0)s.folders.push(folder);else s.folders[index]=folder;
}
export function togglePin(s,exerciseId) {
  if(s.pinned.includes(exerciseId)){s.pinned=s.pinned.filter(eid=>eid!==exerciseId);return;}
  s.pinned=s.pinned.filter(eid=>slotId(s,eid)!==slotId(s,exerciseId));
  if(s.pinned.length===3)throw Error('Three exercises are pinned. Unpin one to make room.');
  s.pinned.push(exerciseId);
}
export function resetCooldowns(s) {s.epoch++;}
export function resetDailyFatigue(s,day=localDay()) {
  const completed=s.exercises.filter(e=>!e.parent&&slotCompletion(s,e.id,day).complete).map(e=>e.id);
  s.fatigueResets[day]=[...new Set([...(s.fatigueResets[day]||[]),...completed])];
}
export function changeUnits(s,unit) {
  if(unit===s.settings.unit)return;
  const conversions=Object.values(s.drafts).flatMap(d=>[d,...(d.drops||[])]).filter(d=>d.weight.trim()!=='').map(d=>[d,weightText({...parseWeightEntry(d.weight),unit:s.settings.unit},unit)]);
  for(const [draft,weight] of conversions)draft.weight=weight;
  s.settings.unit=unit;
}
export function workoutMillis(s,now=Date.now()) {return s.clock.elapsed+(s.clock.startedAt===null?0:Math.max(0,now-s.clock.startedAt));}
export function pauseClock(s,now=Date.now()) {s.clock.elapsed=workoutMillis(s,now);s.clock.startedAt=null;}
export function startWorkout(s,now=Date.now()) {
  if(s.clock.ended)s.clock.elapsed=0;
  s.clock.ended=false;s.clock.startedAt=now;
}
export function endWorkout(s,now=Date.now()) {
  pauseClock(s,now);s.clock.ended=true;s.timers={};s.pinned=[];
}
export function graphSeries(s,exerciseId,metric='volume',unit=s.settings.unit) {
  const grouped=new Map();
  for(const record of s.history.filter(r=>r.exerciseId===exerciseId)){
    if(metric==='volume'){
      const rounds=[record,...(record.drops||[]).map(d=>({...d,unit:record.unit}))];
      for(const r of rounds)if(r.weight!==null)grouped.set(record.day,(grouped.get(record.day)||0)+inUnit(r,unit)*r.reps);
      continue;
    }
    if(record.weight===null)continue;
    if(metric==='e1rm'&&(record.partial||record.reps>12||record.weight===0))continue;
    const weight=inUnit(record,unit),value=metric==='volume'?weight*record.reps:weight*(1+record.reps/30);
    grouped.set(record.day,metric==='volume'?(grouped.get(record.day)||0)+value:Math.max(grouped.get(record.day)||0,value));
  }
  return [...grouped].sort((a,b)=>a[0].localeCompare(b[0])).map(([day,value])=>({day,value:Math.round(value*100)/100}));
}
export function validateState(s,{allowMissingCooldown=false,legacy=false}={}) {
  const fail=()=>{throw Error('Invalid Flex Log V2 backup. Existing data has not changed.');};
  const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
  const string=(x,max=100)=>typeof x==='string'&&x.trim().length>0&&x.length<=max;
  const finite=(x,min,max)=>Number.isFinite(x)&&x>=min&&x<=max;
  const int=(x,min,max)=>Number.isInteger(x)&&finite(x,min,max);
  const safeId=x=>string(x,100)&&/^[a-zA-Z0-9_-]+$/.test(x)&&!['__proto__','constructor','prototype'].includes(x);
  const validDay=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(ordinal(x))&&new Date(ordinal(x)*86400000).toISOString().slice(0,10)===x;
  if(!obj(s)||s.version!==2||!Array.isArray(s.exercises)||!Array.isArray(s.history)||!Array.isArray(s.folders)||!Array.isArray(s.pinned)||!obj(s.drafts)||!obj(s.plans)||!obj(s.timers)||!obj(s.rest)||!obj(s.clock)||!obj(s.settings)||!int(s.epoch,0,Number.MAX_SAFE_INTEGER))fail();
  if(s.supplementLog!==undefined){
    if(!Array.isArray(s.supplementLog))fail();
    const seen=new Set();for(const r of s.supplementLog){if(!obj(r)||!SUPPLEMENTS.some(x=>x.id===r.id)||!validDay(r.day)||seen.has(`${r.id}|${r.day}`))fail();seen.add(`${r.id}|${r.day}`);}
  }
  if(s.revision>=4){
    if(!Array.isArray(s.groups)||!Array.isArray(s.hiddenGroups))fail();
    const gids=new Set();for(const g of s.groups){if(!Array.isArray(g)||g.length!==3||!safeId(g[0])||gids.has(g[0])||!string(g[1],60)||!['upper','lower','core'].includes(g[2]))fail();gids.add(g[0]);}
    if(s.hiddenGroups.some(g=>!gids.has(g)))fail();
  }
  const exercises=new Map();
  for(const e of s.exercises){
    if(!(allowMissingCooldown&&e?.targetCooldown===undefined)&&!int(e?.targetCooldown,1,365))fail();
    if(!obj(e)||!safeId(e.id)||exercises.has(e.id)||!string(e.name)||!((s.groups||GROUPS).some(g=>g[0]===e.group)||legacy&&Object.hasOwn(legacyGroups,e.group))||!int(e.tier,1,3)||!int(e.sets,1,10)||!string(e.reps,30)||!Array.isArray(e.rest)||e.rest.length!==2||!e.rest.every(n=>int(n,15,900))||e.rest[0]>e.rest[1]||typeof e.seat!=='string'||e.seat.length>200)fail();
    if(s.revision>=6&&(typeof e.rir!=='string'||!/^$|^([0-9]|10)([–-]([0-9]|10))?$/.test(e.rir)||e.rir.includes('–')&&Number(e.rir.split('–')[0])>Number(e.rir.split('–')[1])))fail();
    if(s.revision>=7&&(![3,7].includes(e.restCycle)||!Array.isArray(e.muscles)||!e.muscles.length||e.muscles.some(m=>!safeId(m))))fail();
    if(e.archived!==undefined&&typeof e.archived!=='boolean')fail();
    exercises.set(e.id,e);
  }
  if((legacy?previousSeed.slice(0,27):s.revision>=8?SEED:previousSeed).some(e=>!exercises.has(e.id)))fail();
  if(!(legacy&&s.fatigueResets===undefined)){
    if(!obj(s.fatigueResets))fail();
    for(const [day,excluded] of Object.entries(s.fatigueResets))
      if(!validDay(day)||!Array.isArray(excluded)||new Set(excluded).size!==excluded.length||excluded.some(eid=>!exercises.has(eid)))fail();
  }
  if(!(legacy&&s.clock.ended===undefined)&&typeof s.clock.ended!=='boolean')fail();
  for(const e of s.exercises)if(e.parent!==null&&(!exercises.has(e.parent)||e.parent===e.id||exercises.get(e.parent).parent!==null))fail();
  for(const [key,value] of Object.entries(s.plans)){const [day,eid,...extra]=key.split('|');if(extra.length||!validDay(day)||!exercises.has(eid)||!int(value,1,10))fail();}
  const records=new Map(),cells=new Set();
  for(const r of s.history){
    if(!obj(r)||!safeId(r.id)||records.has(r.id)||!exercises.has(r.exerciseId)||!validDay(r.day)||!Number.isFinite(Date.parse(r.at))||!int(r.index,0,9)||!(finite(r.weight,0,10000)||s.revision>=10&&r.weight===null&&string(r.weightNote,200))||!int(r.reps,1,999)||!['lbs','kg'].includes(r.unit)||typeof r.partial!=='boolean'||!int(r.epoch,0,s.epoch))fail();
    if(r.weightNote!==undefined&&!string(r.weightNote,200))fail();
    if(r.drops!==undefined&&(!Array.isArray(r.drops)||r.drops.some(d=>!obj(d)||!(finite(d.weight,0,10000)||d.weight===null&&string(d.weightNote,200))||!int(d.reps,1,999)||d.weightNote!==undefined&&typeof d.weightNote!=='string')))fail();
    const key=draftKey(r.day,r.exerciseId,r.index);
    if(cells.has(key)||r.index>=targetSets(s,r.exerciseId,r.day))fail();
    cells.add(key);records.set(r.id,r);
  }
  for(const [key,d] of Object.entries(s.drafts)){
    const [day,eid,index,...extra]=key.split('|');
    if(extra.length||!validDay(day)||!exercises.has(eid)||!/^\d$/.test(index)||Number(index)>=targetSets(s,eid,day)||cells.has(key)||!obj(d)||typeof d.weight!=='string'||d.weight.length>200||typeof d.reps!=='string'||d.reps.length>40||typeof d.partial!=='boolean')fail();
  }
  for(const d of Object.values(s.drafts))if(d.drops!==undefined&&(!Array.isArray(d.drops)||d.drops.some(r=>!obj(r)||typeof r.weight!=='string'||r.weight.length>200||typeof r.reps!=='string'||r.reps.length>40)))fail();
  const folderIds=new Set();
  for(const f of s.folders){if(!obj(f)||!safeId(f.id)||folderIds.has(f.id)||!string(f.name,60)||!Array.isArray(f.exerciseIds)||new Set(f.exerciseIds).size!==f.exerciseIds.length||f.exerciseIds.some(eid=>!exercises.has(eid)))fail();folderIds.add(f.id);}
  if(s.selectedVariants!==undefined){
    if(!obj(s.selectedVariants))fail();
    for(const [root,eid] of Object.entries(s.selectedVariants))if(!exercises.has(root)||exercises.get(root).parent!==null||!exercises.has(eid)||(exercises.get(eid).parent||eid)!==root)fail();
  }
  if(s.pinned.length>3||new Set(s.pinned).size!==s.pinned.length||s.pinned.some(eid=>!exercises.has(eid)))fail();
  for(const [eid,t] of Object.entries(s.timers))if(!exercises.has(eid)||!obj(t)||!finite(t.end,0,8.64e15)||!finite(t.duration,1,86400)||records.get(t.recordId)?.exerciseId!==eid)fail();
  for(const [eid,n] of Object.entries(s.rest))if(!exercises.has(eid)||!int(n,15,900))fail();
  if(!['lbs','kg'].includes(s.settings.unit)||typeof s.settings.sound!=='boolean'||typeof s.settings.haptics!=='boolean'||!finite(s.clock.elapsed,0,8.64e15)||(s.clock.startedAt!==null&&!finite(s.clock.startedAt,0,8.64e15)))fail();
  if(s.revision>=7&&(!finite(s.settings.volume,0,1)||!finite(s.settings.hapticIntensity,0,1)))fail();
  return s;
}

export function groupReadiness(s,gid,day=localDay()) {
  const hits=s.exercises.filter(e=>e.group===gid&&!e.archived).map(e=>readiness(s,e.id,day)).filter(Boolean);
  const hit=hits.sort((a,b)=>a.days-b.days)[0]||null;
  const remaining=hit?Math.max(0,3-hit.days):0;
  return {hit,remaining,ready:remaining===0};
}
export function renameExercise(s,eid,name){
  if(typeof name!=='string'||!name.trim()||name.trim().length>100)throw Error('Enter a name from 1–100 characters.');
  if(s.exercises.some(e=>e.id!==eid&&!e.archived&&nameKey(e.name)===nameKey(name)))throw Error('That exercise name already exists.');
  exerciseById(s,eid).name=name.trim();
}
export function editExercise(s,eid,values,day=localDay()){
  const next=copy(s),e=exerciseById(next,eid);
  if(!e)throw Error('Choose an exercise.');
  const {sets,tier,restMin,restMax,restCycle}=values;
  if(!Number.isInteger(sets)||sets<1||sets>10)throw Error('Choose 1–10 sets.');
  if(![1,2,3].includes(tier))throw Error('Choose tier 1, 2 or 3.');
  if(![3,7].includes(restCycle))throw Error('Choose a 3- or 7-day cycle.');
  if(![restMin,restMax].every(n=>Number.isInteger(n)&&n>=15&&n<=900)||restMin>restMax)throw Error('Rest must be 15–900 seconds, with minimum no greater than maximum.');
  const reps=String(values.reps??'').trim().replace(/-/g,'–');
  if(!/^\d{1,3}(?:–\d{1,3})?$/.test(reps))throw Error('Enter a rep count or range, e.g. 10 or 8–12.');
  const range=reps.split('–').map(Number);if(range.some(n=>n<1||n>999)||(range.length===2&&range[0]>range[1]))throw Error('Rep range must increase and stay between 1 and 999.');
  const seat=String(values.seat??'').trim();if(seat.length>200)throw Error('Seat notes must be 200 characters or fewer.');
  renameExercise(next,eid,values.name);setRir(next,eid,String(values.rir??'').trim());
  if(e.group!==values.group)moveExercise(next,eid,values.group);
  if(sets!==e.sets){
    // Freeze earlier session targets before changing the default.
    for(const date of new Set([...next.history.filter(r=>r.exerciseId===eid).map(r=>r.day),...Object.keys(next.drafts).filter(k=>k.split('|')[1]===eid).map(k=>k.split('|')[0])]))if(date!==day)next.plans[dayKey(date,eid)] ||= e.sets;
    const wouldHideDraft=Object.entries(next.drafts).some(([k,v])=>{const [d,id,i]=k.split('|');return d===day&&id===eid&&Number(i)>=sets&&(v.weight||v.reps);});
    if(wouldHideDraft)throw Error('Clear the extra set drafts before reducing the set count.');
    changeTarget(next,eid,sets,day);e.sets=sets;
    if(completion(next,eid,day).complete){delete next.timers[eid];next.pinned=next.pinned.filter(id=>id!==eid);}
  }
  if(e.rest[0]!==restMin||e.rest[1]!==restMax)delete next.rest[eid];
  Object.assign(e,{reps,tier,rest:[restMin,restMax],restCycle,targetCooldown:restCycle,seat});
  const root=exerciseById(next,slotId(next,eid));
  for(const variant of slotVariants(next,eid))Object.assign(variant,{tier,restCycle,targetCooldown:restCycle,group:root.group});
  validateState(next);Object.assign(s,next);
}
export function archiveExercise(s,eid){
  const ids=s.exercises.filter(e=>e.id===eid||e.parent===eid).map(e=>e.id);
  for(const e of s.exercises)if(ids.includes(e.id))e.archived=true;
  s.pinned=s.pinned.filter(id=>!ids.includes(id));
  for(const id of ids)delete s.timers[id];
  for(const f of s.folders)f.exerciseIds=f.exerciseIds.filter(id=>!ids.includes(id));
}
export function renameGroup(s,gid,name){
  if(typeof name!=='string'||!name.trim()||name.trim().length>60)throw Error('Enter a name from 1–60 characters.');
  if(s.groups.some(g=>g[0]!==gid&&nameKey(g[1])===nameKey(name)))throw Error('That category name already exists.');
  s.groups.find(g=>g[0]===gid)[1]=name.trim();
}
export function archiveGroup(s,gid){
  if(!s.hiddenGroups.includes(gid))s.hiddenGroups.push(gid);
  for(const e of s.exercises.filter(e=>e.group===gid))archiveExercise(s,e.id);
}
export function moveExercise(s,eid,gid){
  if(!s.groups.some(g=>g[0]===gid)||s.hiddenGroups.includes(gid))throw Error('Choose an active category.');
  const e=exerciseById(s,slotId(s,eid));eid=e.id;e.group=gid;e.archived=false;
  for(const child of s.exercises.filter(x=>x.parent===eid))child.group=gid;
}
export function createExercise(s,gid,name,{tier=2,sets=3,reps='8–12',rest=120}={},newId=id()){
  if(!Number.isInteger(tier)||tier<1||tier>3||!Number.isInteger(sets)||sets<1||sets>10||!Number.isInteger(rest)||rest<15||rest>900||!reps.trim()||reps.length>30)throw Error('Check the tier, sets, reps and rest duration.');
  const e={id:newId,name:'',group:gid,tier,sets,reps,rir:'',restCycle:3,muscles:[gid],rest:[rest,rest],targetCooldown:3,parent:null,seat:''};
  s.exercises.push(e);try{renameExercise(s,newId,name);moveExercise(s,newId,gid);}catch(error){s.exercises.pop();throw error;}return e;
}

// Browser UI is isolated from the model so the same logic can be tested in Node.
if(typeof document!=='undefined')boot();
function boot() {
  const $=selector=>document.querySelector(selector);
  const html=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const key=`flex-log:v2:${new URL('.',location.href).pathname}`;
  const dateLabel=day=>new Date(`${day}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  const exactTime=at=>new Date(at).toLocaleString(undefined,{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'});
  const duration=seconds=>`${Math.floor(Math.max(0,seconds)/60)}:${String(Math.max(0,seconds)%60).padStart(2,'0')}`;
  const since=r=>!r?'Not hit yet':r.days===0?'Last: today':r.days===1?'Last: 1 day ago':`Last: ${r.days} days ago`;
  const metric=r=>`${r.weight===null?'Text load':`${r.weight} ${r.unit}`} × ${r.reps}${r.partial?' · legacy partials':''}${r.drops?.length?` · Drops: ${r.drops.map(d=>`${d.weight===null?'Text load':d.weight+' '+r.unit} × ${d.reps}${d.weightNote?' '+html(d.weightNote):''}`).join(' / ')}`:''}${r.weightNote?` · ${html(r.weightNote)}`:''}`;
  let state=initialState(),blocked=false,unreadable=null,today=localDay(),undo=null,toastId;
  let audio=null,wake=null,wakePending=false,installPrompt=null,offline='Waiting for offline setup…';
  const ui={page:'muscles',filter:'upper',floating:false,search:'',group:null,exercise:null,folder:null,modal:null,hardware:false,returnY:null,graph:'volume',graphPoint:null,focusSet:0,dropOpen:{},plate:{bar:45,plates:[]}};
  try{const raw=localStorage.getItem(key);if(raw){try{state=migrateState(JSON.parse(raw));if(JSON.stringify(state)!==raw)persist(state);}catch{blocked=true;unreadable=raw;warn('Saved data could not be read. It has not been overwritten. Open Settings to export the original or restore a V2 backup.');}}}
  catch{blocked=true;warn('Device storage is unavailable. Logging is disabled. Allow site storage and reopen the app.');}
  function warn(text){$('#warning').hidden=false;$('#warning').textContent=text;}
  function persist(next,recovery=false){
    if(blocked&&!recovery){toast('Storage unavailable. This change was not saved.');return false;}
    try{localStorage.setItem(key,JSON.stringify(next));blocked=false;unreadable=null;$('#warning').hidden=true;return true;}
    catch{warn('Could not save this change. Storage may be full or disabled. Export a backup from Settings.');return false;}
  }
  function buzz(isAlarm=false){try{if(state.settings.haptics)navigator.vibrate?.(vibrationPattern(state.settings.hapticIntensity,isAlarm===true));}catch{}}
  async function unlockAudio(){
    try{if(!state.settings.sound)return false;const A=window.AudioContext||window.webkitAudioContext;if(!A)return false;
      if(!audio||audio.state==='closed'){audio=new A();const b=audio.createBufferSource();b.buffer=audio.createBuffer(1,1,audio.sampleRate);b.connect(audio.destination);b.start();}
      if(audio.state!=='running')await audio.resume();return audio.state==='running';
    }catch{return false;}
  }
  async function alarm(){
    buzz(true);if(!state.settings.sound||state.settings.volume===0)return;
    if(!await unlockAudio())return;
    try{for(let i=0;i<2;i++){const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+i*.3;
      o.frequency.value=660+i*220;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.25*state.settings.volume,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.23);
      o.connect(g);g.connect(audio.destination);o.onended=()=>{o.disconnect();g.disconnect();};o.start(t);o.stop(t+.24);}
    }catch{}
  }
  for(const event of ['pointerdown','click','keydown'])document.addEventListener(event,()=>{unlockAudio();},{capture:true,passive:true});
  function dismissUndo(){undo=null;clearTimeout(toastId);$('#toast').hidden=true;}
  function attachFloating(){const parent=$('#dialog').open?$('#dialog'):document.body;for(const el of [$('#toast')])if(el.parentElement!==parent)parent.append(el);}
  function toast(message,restore){dismissUndo();undo=restore||null;attachFloating();$('#toast').innerHTML=`<span>${html(message)}</span>${restore?'<button data-action="undo">Undo · 3s</button>':''}`;$('#toast').hidden=false;toastId=setTimeout(dismissUndo,3000);}
  function error(message){const el=$('#form-error');if(el){el.textContent=message;el.focus();}else toast(message);}
  function mutate(fn,{render=true,message='',canUndo=false}={}){
    const before=copy(state),next=copy(state);try{fn(next);}catch(e){error(e.message);return false;}
    if(!persist(next))return false;dismissUndo();state=next;if(render)renderAll();
    if(message)toast(message,canUndo?()=>{if(persist(before)){state=before;renderAll();}}:undefined);return true;
  }
  function pips(exerciseId){const c=slotCompletion(state,exerciseId,today);return `<span class="pips ${c.complete?'complete':''}" aria-label="${c.done} of ${c.target} slot sets"><span aria-hidden="true">${Array.from({length:c.target},(_,i)=>`<i class="${i<c.done?'done':''}"></i>`).join('')}</span><small>${c.done}/${c.target}</small></span>`;}

  function renderTop(){
    const f=fatigue(state,today),goal=fatigueGoal(state),active=activeIds(state);
    $('#top').innerHTML=`<div class="load-row"><div class="load-label"><span class="eyebrow">DAILY GOAL: ${goal.daily} PTS</span><div><strong>${f.score}<small> / ${goal.daily}</small></strong><span>${f.count} completed</span></div></div><button class="clock-button" data-action="workout" aria-label="Workout stopwatch"><span class="clock-icon">◷</span><span id="stopwatch">00:00</span><small>${state.clock.ended?'ENDED':state.clock.startedAt!==null?'WORKOUT':'START'}</small></button></div>
    <progress class="fatigue-progress" max="${Math.max(1,goal.daily)}" value="${Math.min(f.score,goal.daily)}" aria-label="Daily fatigue ${f.score} of ${goal.daily} points"></progress>
    <div class="daily-line"><span>${goal.weekly} weekly pts / 4 days${state.fatigueResets[today]?' · since reset':''}</span>${(state.clock.startedAt!==null||state.clock.elapsed>0)&&!state.clock.ended?'<button class="end-workout-button" data-action="end-workout">End workout</button>':''}</div>
    <div class="active-tray"><div class="tray-label"><span class="eyebrow">ACTIVE EXERCISES <b>${active.length}</b></span>${state.pinned.length?'<button data-action="clear-pins" class="text-button">Unpin all</button>':'<span>Log a set to pin it here.</span>'}</div>
    ${active.length?`<div class="pin-grid">${active.map(eid=>{const e=exerciseById(state,eid),u=urgency(state,eid,today),pinned=state.pinned.includes(eid);return `<div class="pin-shell heat-${u.level}"><button class="pin-card" data-action="open" data-id="${eid}"><strong>${html(e.name)}</strong><span class="pin-bottom">${pips(eid)}<small data-countdown="${eid}"></small></span></button>${pinned?`<button class="unpin-button" data-action="pin" data-id="${eid}" aria-label="Unpin ${html(e.name)}">×</button>`:''}${state.timers[eid]?`<button class="timer-stop-top" data-action="timer-stop" data-id="${eid}" aria-label="Stop ${html(e.name)} timer">Stop rest</button>`:''}</div>`;}).join('')}</div>`:''}</div>`;
    tickLabels();
  }
  function exerciseRow(e){const c=slotCompletion(state,e.id,today),r=readiness(state,e.id,today),pinned=state.pinned.includes(e.id),status=urgency(state,e.id,today);return `<details class="exercise heat-${status.level} ${c.complete?'complete':c.done?'in-progress':''}" data-exercise="${e.id}" ${ui.exercise===e.id?'open':''}><summary><div class="exercise-summary"><span class="exercise-name">${html(e.name)}</span><span class="heat-label"><i class="state-dot" aria-hidden="true"></i><span class="sr-only">${status.level==='due'?'Due':status.level==='recovering'?'Recovering':'Recently trained'} · </span>${status.paired?'Complementary rotation':`${e.restCycle}d cycle`}</span><span class="exercise-meta">${e.parent?'Alternate · ':''}${since(r)}${status.recovery?` <span class="recovery-note">Complementary hit ${status.recovery.days===0?'today':`${status.recovery.days}d ago`} · resting</span>`:''} <i>·</i> T${e.tier} / ${points(e)} pts</span></div>${pips(e.id)}<button class="pin-button ${pinned?'pinned':''}" data-action="pin" data-id="${e.id}" aria-label="${pinned?'Unpin':'Pin'} ${html(e.name)}" aria-pressed="${pinned}">${pinned?'◆':'◇'}</button><span class="chevron" aria-hidden="true">⌄</span></summary>${ui.exercise===e.id?logger(e):''}</details>`;}
  function filtered(exercises){return visibleSlots(state,exercises,ui.search.toLowerCase().trim());}
  function renderMain(){
    $('#page-title').textContent=ui.page==='muscles'?'Your floor. Your flow.':'Find your station.';
    $('#page-subtitle').textContent=ui.page==='muscles'?'Glow = due · Muted = recent. Hold to edit.':'Same exercises. One history. Wherever you train.';
    $('#search').placeholder=ui.page==='muscles'?'Find an exercise or muscle…':'Find an exercise in your stations…';
    $('#filters').hidden=ui.page!=='muscles';
    $('#content').setAttribute('role',ui.page==='muscles'?'tabpanel':'region');
    $('#content').setAttribute('aria-labelledby',ui.page==='muscles'?`tab-${ui.filter}`:'page-title');
    $('#filters').innerHTML=ui.page==='muscles'?['upper','lower'].map(f=>`<button role="tab" class="filter ${ui.filter===f?'selected':''}" data-action="filter" data-filter="${f}" aria-selected="${ui.filter===f}" tabindex="${ui.filter===f?'0':'-1'}" aria-controls="content" id="tab-${f}">${f.toUpperCase()}</button>`).join(''):'';
    document.querySelectorAll('[data-action=page]').forEach(b=>{b.classList.toggle('selected',b.dataset.page===ui.page);b.setAttribute('aria-current',b.dataset.page===ui.page?'page':'false');});
    const visible=filtered(state.exercises);
    if(ui.page==='muscles'){
      const areas=homeGroups(state,ui.filter);
      const renderGroup=([gid,name])=>{
        const order=currentRows.map(e=>e.id);
        const rank=e=>{const i=order.indexOf(e.parent||e.id);return i<0?100+state.exercises.findIndex(x=>x.id===(e.parent||e.id)):i;};
        const list=visible.filter(e=>e.group===gid).sort((a,b)=>rank(a)-rank(b)||Number(!!a.parent)-Number(!!b.parent));
        if(state.hiddenGroups.includes(gid)||(!list.length&&ui.search))return '';
        const all=list,status=folderUrgency(state,state.exercises.filter(e=>e.group===gid).map(e=>e.id),today),last=groupReadiness(state,gid,today).hit;
        const done=all.filter(e=>slotCompletion(state,e.id,today).complete).length;
        return `<details class="muscle heat-${status.level}" data-group="${gid}" ${ui.group===gid||ui.search?'open':''}><summary><span class="group-icon" aria-hidden="true">${String(state.groups.findIndex(g=>g[0]===gid)+1).padStart(2,'0')}</span><span class="group-name">${html(name)}<small>${list.length} ${list.length===1?'movement slot':'movement slots'}${status.dailyComplete?' · Done today':done?` · ${done} done today`:''}</small></span><button class="text-button" data-action="edit-group" data-id="${gid}" aria-label="Edit ${html(name)}">Edit</button><span class="group-last">${last?`Latest: ${last.days===0?'today':`${last.days}d ago`}`:'No recent hit'}</span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="exercise-list">${list.map(exerciseRow).join('')}</div></details>`;
      };
      const main=areas.main.map(renderGroup).join(''),floating=areas.floating.map(renderGroup).join('');
      const floatIds=visible.filter(e=>areas.floating.some(g=>g[0]===e.group)).map(e=>e.id),floatStatus=folderUrgency(state,floatIds,today);
      $('#content').setAttribute('aria-labelledby',`tab-${ui.filter}`);
      $('#content').innerHTML=main+(floating?`<details class="floating-block heat-${floatStatus.level}" data-floating ${ui.floating||ui.search?'open':''}><summary><span class="floating-symbol" aria-hidden="true">＋</span><span class="group-name">Floating Accessories<small>Shared across Upper & Lower</small></span><span class="chevron" aria-hidden="true">⌄</span></summary><div class="floating-groups">${floating}</div></details>`:'') || '<div class="empty">No matching exercises.</div>';

    }else{
      $('#content').innerHTML=`<button class="new-folder" data-action="new-folder"><span>＋</span> Create station folder</button>`+state.folders.map(f=>{
        const list=filtered(f.exerciseIds.map(eid=>exerciseById(state,eid)));
        if(ui.search&&!list.length)return '';
        return `<details class="muscle station heat-${folderUrgency(state,f.exerciseIds,today).level}" data-folder="${f.id}" ${ui.folder===f.id||ui.search?'open':''}><summary><span class="folder-icon" aria-hidden="true">▱</span><span class="group-name">${html(f.name)}<small>${list.length} movement slots</small></span><button class="text-button" data-action="edit-folder" data-id="${f.id}" aria-label="Edit ${html(f.name)}">Edit</button><span class="chevron" aria-hidden="true">⌄</span></summary><div class="exercise-list">${list.length?list.map(exerciseRow).join(''):'<p class="empty">No matching exercises here. Use Edit to add some.</p>'}</div></details>`;
      }).join('');
    }
    refreshWeightFields();
  }
  function updateWeightField(el){
    el.style.height='auto';el.style.height=`${Math.max(50,el.scrollHeight+2)}px`;
    const preview=el.parentElement.querySelector('.weight-preview');if(!preview)return;
    if(!el.value.trim()||el.disabled){preview.textContent='';el.removeAttribute('aria-invalid');return;}
    try{const total=parseWeight(el.value);preview.textContent=total===null?'Text load · saved in history':`Total: ${total} ${state.settings.unit}`;preview.classList.remove('invalid');el.removeAttribute('aria-invalid');}
    catch{preview.textContent='Check format';preview.classList.add('invalid');el.setAttribute('aria-invalid','true');}
  }
  function refreshWeightFields(){document.querySelectorAll('textarea[data-field="weight"]').forEach(updateWeightField);document.querySelectorAll('textarea[data-drop-field]').forEach(el=>{el.style.height='auto';el.style.height=el.scrollHeight+'px';});}
  window.addEventListener('resize',refreshWeightFields);
  function dropRows(eid,index,rec,draft){
    const drops=rec?.drops||draft.drops||[],open=ui.dropOpen[draftKey(today,eid,index)]??!!drops.length;
    if(!open)return '';
    return `<div class="drop-rounds">${drops.map((d,n)=>`<div class="drop-round"><span>↳ ${n+1}</span><textarea rows="1" maxlength="200" inputmode="text" data-drop-field="weight" data-id="${eid}" data-index="${index}" data-round="${n}" aria-label="Drop ${n+1} weight" placeholder="Weight" ${rec?'disabled':''}>${html(rec?weightText({...d,unit:rec.unit},state.settings.unit):d.weight)}</textarea><input type="number" inputmode="numeric" min="1" max="999" data-drop-field="reps" data-id="${eid}" data-index="${index}" data-round="${n}" aria-label="Drop ${n+1} reps" placeholder="Reps" value="${html(d.reps)}" ${rec?'disabled':''}>${!rec?`<button data-action="drop-remove" data-id="${eid}" data-index="${index}" data-round="${n}" aria-label="Remove drop ${n+1}">×</button>`:''}</div>`).join('')}${!rec?`<button class="drop-add" data-action="drop-add" data-id="${eid}" data-index="${index}" aria-label="Add drop round">+ Drop</button>`:''}</div>`;
  }
  function logger(e){
    const root=exerciseById(state,slotId(state,e.id)),variants=slotVariants(state,e.id).filter(v=>!v.archived);
    const chooser=variants.length>1?`<label class="variation-picker">Variation<select data-variation="${root.id}" aria-label="Exercise variation">${variants.map(v=>`<option value="${v.id}" ${v.id===e.id?'selected':''}>${html(v.name)}${v.id===root.id?' · Default':''}</option>`).join('')}</select></label>`:'';
    e={...e,tier:root.tier,restCycle:root.restCycle};
    const slot=slotCompletion(state,e.id,today);
    const r=readiness(state,e.id,today),c=completion(state,e.id,today),records=dailyRecords(state,e.id,today),previous=previousSession(state,e.id,today),unit=state.settings.unit;
    const prior=previous[0];
    return `<section class="logger" data-logger="${e.id}">${chooser}<div class="prescription"><span>${e.reps} reps</span><span>Target RIR: ${html(e.rir||'Not set')}</span><span>${e.restCycle}-day cycle</span><span>${duration(e.rest[0])}${e.rest[0]!==e.rest[1]?`–${duration(e.rest[1])}`:''} rest</span><span>T${e.tier} · ${points(e)} pts</span></div>

      <div class="memory-line"><span>${r?`Last hit <strong>${dateLabel(r.day)}</strong>`:'No hit in this training block'}</span>${prior?`<small>Previous session: ${dateLabel(prior.day)}</small>`:'<small>Build your baseline.</small>'}</div>
      <label class="seat-label"><span>Pin/Seat Pos</span><input type="text" maxlength="200" autocomplete="off" data-seat="${e.id}" value="${html(e.seat)}" placeholder="${html(e.seat||'e.g. Chair 2')}"></label>
      <div class="set-head"><span>SET</span><span>${unit.toUpperCase()}</span><span>REPS</span><span title="Drop rounds">D</span><span>DONE</span></div>
      <div class="sets">${Array.from({length:c.target},(_,index)=>{
        const rec=records.find(r=>r.index===index),draft=state.drafts[draftKey(today,e.id,index)]||{weight:'',reps:'',partial:false},last=previousSet(state,e.id,index,today);
        const weight=rec?(rec.weight===null?rec.weightNote:inUnit(rec,unit)):draft.weight,reps=rec?rec.reps:draft.reps;
        return `<div class="set-block ${rec?'logged':''}" data-row="${index}" data-id="${e.id}"><div class="set-row"><span class="set-num">${index+1}</span><div class="weight-cell"><textarea rows="1" wrap="soft" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="200" aria-label="Set ${index+1} weight in ${unit}; numbers, plate math or text notes" data-field="weight" data-id="${e.id}" data-index="${index}" placeholder="${last?html(last.weight===null?last.weightNote:inUnit(last,unit)):'—'}" ${rec?'disabled':''}>${html(weight)}</textarea><output class="weight-preview" aria-live="polite"></output></div><input type="number" step="1" min="1" max="999" inputmode="numeric" autocomplete="off" aria-label="Set ${index+1} full reps" data-field="reps" data-id="${e.id}" data-index="${index}" value="${html(reps)}" placeholder="${last?last.reps:'—'}" ${rec?'disabled':''}><button class="drop-toggle" data-action="drops" data-id="${e.id}" data-index="${index}" aria-label="Drop rounds for set ${index+1}" aria-expanded="${!!(ui.dropOpen[draftKey(today,e.id,index)]??(rec?.drops||draft.drops)?.length)}" ${rec&&!rec.drops?.length?'disabled':''}>D</button><button class="set-check" role="checkbox" aria-checked="${!!rec}" data-action="set" data-id="${e.id}" data-index="${index}" aria-label="${rec?'Uncheck':'Complete'} set ${index+1}">${rec?'✓':'+'}</button></div>${dropRows(e.id,index,rec,draft)}<div class="row-memory"><span>${rec?`Saved ${exactTime(rec.at)}${rec.partial?' · + partials':''}${rec.weightNote?` · ${html(rec.weightNote)}`:''}`:last?`Last: ${metric(last)} · ${dateLabel(last.day)}`:'No previous set · 0 = unweighted'}</span>${!rec&&last?`<button data-action="copy" data-id="${e.id}" data-index="${index}" aria-label="Copy previous session into set ${index+1}">↺ Use last</button>`:''}</div></div>`;
      }).join('')}</div>
      <div class="logger-tools"><div class="target-stepper"><button data-action="target-minus" data-id="${e.id}" aria-label="Remove one planned set">−</button><span>${c.target} sets</span><button data-action="target-plus" data-id="${e.id}" aria-label="Add one planned set">+</button></div><button data-action="tools" data-id="${e.id}">± Load tools</button></div>

      <div class="logger-links"><button data-action="edit-exercise" data-id="${e.id}">Edit exercise</button><button data-action="graph" data-id="${e.id}">↗ Progression</button><button data-action="alternate" data-id="${e.id}">＋ Custom alternate</button></div>
      <div class="logger-bottom"><span>${slot.complete?((state.fatigueResets[today]||[]).some(id=>slotId(state,id)===root.id)?'✓ Slot complete · fatigue reset':`✓ Slot complete · ${points(e)} fatigue points`):`${slot.done}/${slot.target} slot sets · points when complete`}</span><button class="text-button" data-action="rest-setting" data-id="${e.id}">Rest ${duration(state.rest[e.id]||(e.rest[0]+e.rest[1])/2)}</button></div>
    </section>`;
  }

  // Dialog contents are rendered separately from the persistent timer dock.
  function head(kicker,title,back=false){return `<header class="dialog-head"><div><span class="eyebrow">${html(kicker)}</span><h2 id="dialog-title">${html(title)}</h2></div><button class="icon-button" data-action="${back?'back':'close'}" aria-label="${back?'Back to exercise':'Close'}">${back?'←':'×'}</button></header>`;}
  function showModal(kind,eid=null,extra={}){ui.modal={kind,id:eid,...extra};renderModal();if(!$('#dialog').open)$('#dialog').showModal();refreshWeightFields();$('#dialog').scrollTop=0;attachFloating();}
  function closeModal(){$('#dialog').close();ui.modal=null;renderTop();renderMain();attachFloating();}
  function renderModal(){
    if(!ui.modal)return;
    const {kind,id:eid}=ui.modal,original=eid?exerciseById(state,eid):null,root=original?exerciseById(state,slotId(state,eid)):null,e=original?{...original,tier:root.tier,restCycle:root.restCycle,group:root.group}:null;
    let content='';
    if(kind==='supplements')content=head('DAILY LOG','Supplements')+`<div class="dialog-body supplement-list"><p class="hint">${today} · Tap a checkbox to log today; tap a name for history and protocol. Uncheck to undo today’s entry.</p>${[true,false].map(daily=>`<section><h3 class="eyebrow">${daily?'DAILIES':'CYCLED & TACTICAL'}</h3>${SUPPLEMENTS.filter(x=>x.daily===daily).map(x=>{const checked=supplementDates(state,x.id).includes(today);return `<div class="supplement-row"><button class="supplement-check" role="checkbox" aria-checked="${checked}" aria-label="${html(x.name)} taken today" data-action="supplement-check" data-id="${x.id}">${checked?'✓':'○'}</button><button class="supplement-name" data-action="supplement-info" data-id="${x.id}"><strong>${html(x.name)}</strong>${x.id==='theanine'?'<small class="supplement-optional">Daily / as needed</small>':''}${!daily?`<span class="last-taken">${lastTaken(state,x.id,today)}</span>`:''}</button></div>`;}).join('')}</section>`).join('')}<p class="hint">Personal protocols, not dosing advice. Checking an item records intake; it does not confirm safety or measure tolerance.</p></div>`;
    if(kind==='supplement-info'){
      const x=SUPPLEMENTS.find(x=>x.id===eid),dates=supplementDates(state,eid);
      content=head('SUPPLEMENT DETAILS',x.name).replace('aria-label="Close"','aria-label="Back to supplement checklist"')+`<div class="dialog-body supplement-detail"><div class="supplement-dose"><span class="eyebrow">YOUR DOSE & SCHEDULE</span><strong>${html(x.dosage)}</strong><p>${html(x.protocol)}</p></div><section class="supplement-section"><h3>When to take it</h3><p>${html(x.timing)}</p></section><section class="supplement-section"><h3>Purpose & evidence</h3><p>${html(x.benefits)}</p></section><section class="supplement-section"><h3>Why this schedule?</h3><p>${html(x.reason)}</p></section><aside class="supplement-note"><h3>Important notes</h3><p>${html(x.risks)}</p></aside><section class="supplement-section"><h3>Taken on · ${dates.length}</h3><div class="supplement-history" tabindex="0" role="region" aria-label="Dates taken">${dates.length?dates.map(d=>`<div><time datetime="${d}">${d}</time></div>`).join(''):'<p class="hint">No logged dates yet.</p>'}</div></section><details><summary>Sources & context</summary><p class="hint">Reviewed 22 Oct 2026. Your selected doses and schedules are tracked preferences, not personalized prescriptions. Research is mainly in adults; adolescent use needs clinician review. The checklist records intake, not tolerance or neurotransmitter levels. Choose third-party-tested products and review overlapping ingredients.</p>${x.sources.map(([name,url])=>`<p><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></p>`).join('')}<p class="hint">References require internet; all notes work offline.</p></details></div>`;
    }
    if(kind==='log')content=head(state.groups.find(g=>g[0]===e.group)[1],e.name)+`<div class="dialog-body">${activeIds(state).length?`<nav class="superset-tabs" aria-label="Active superset">${activeIds(state).map((pid,i)=>`<button data-action="open" data-id="${pid}" class="${pid===eid?'selected':''}"><span>${String.fromCharCode(65+i)}</span>${html(exerciseById(state,pid).name)}<small data-countdown="${pid}"></small></button>`).join('')}</nav>`:''}${logger(e)}</div>`;
    if(kind==='alternate')content=head('INDEPENDENT HISTORY','Add custom alternate',true)+`<form id="alternate-form" class="dialog-body" data-parent="${eid}"><p class="hint">Under ${html(e.name)}. This variation keeps its own weights, reps and seat memory. It shares this movement slot’s cooldown and points.</p><label>Name<input name="name" type="text" maxlength="100" required placeholder="e.g. Lying Leg Curl" autocomplete="off"></label><div class="form-grid"><label>Sets<input type="number" name="sets" value="${e.sets}" min="1" max="10" required></label></div><label>Rep range<input type="text" name="reps" value="${html(e.reps)}" maxlength="30" required></label><label>Target RIR<input name="rir" maxlength="5" value="${html(e.rir||'')}" placeholder="e.g. 1–2"></label><p class="hint">Rest is inherited from the parent. Completing any variation satisfies the same movement slot.</p><button class="primary full" type="submit">Create alternate</button><p id="form-error" class="error" tabindex="-1" role="alert"></p></form>`;
    if(kind==='folder'){
      const folder=state.folders.find(f=>f.id===ui.modal.folderId);
      content=head('LINKED, NOT DUPLICATED',folder?'Edit station':'Create a station')+`<form id="folder-form" class="dialog-body" data-folder="${folder?.id||''}"><label>Station name<input name="name" type="text" maxlength="60" required value="${html(folder?.name||'')}" placeholder="e.g. Cable Station"></label><p class="hint">Select exercises to link. Logs and seat settings update everywhere.</p><div class="folder-checklist">${state.groups.map(([gid,name])=>`<fieldset><legend>${html(name)}</legend>${state.exercises.filter(e=>e.group===gid&&!e.archived&&!e.parent).map(e=>`<label class="folder-choice"><input type="checkbox" name="exercise" value="${e.id}" ${folder?.exerciseIds.some(id=>slotId(state,id)===e.id)?'checked':''}><span>${html(e.name)}${e.parent?'<small>Custom alternate</small>':''}</span></label>`).join('')}</fieldset>`).join('')}</div><button type="submit" class="primary full">Save station</button>${folder?`<button type="button" class="danger full" data-action="delete-folder" data-id="${folder.id}">Delete folder · keep exercise history</button>`:''}<p id="form-error" class="error" tabindex="-1" role="alert"></p></form>`;
    }
    if(kind==='settings')content=head('LOCAL. PRIVATE. YOURS.','Misc')+`<nav class="settings-tabs"><button data-action="misc-tab" data-tab="data" class="${!ui.hardware?'selected':''}">Data & app</button><button data-action="misc-tab" data-tab="hardware" class="${ui.hardware?'selected':''}">Hardware Settings</button></nav>`+`<div class="dialog-body"><label class="setting-row"><span>Weight unit<small>Original history units are preserved.</small></span><select id="units"><option value="lbs" ${state.settings.unit==='lbs'?'selected':''}>lbs</option><option value="kg" ${state.settings.unit==='kg'?'selected':''}>kg</option></select></label><div class="settings-actions"><button data-action="export">↓ Export / Backup Data</button><button data-action="import">↑ Restore V2 Backup</button>${unreadable!==null?'<button data-action="raw-export">Download unreadable original</button>':''}<button data-action="install">↗ Install app</button><button class="danger" data-action="reset-fatigue">Reset Daily Fatigue</button><button class="danger" data-action="reset-cooldowns">Reset All Cooldowns</button></div><input id="backup-file" type="file" accept=".json,application/json" hidden><p class="hint">Reset Daily Fatigue clears today’s score and counted exercises, keeping set checkmarks and cooldowns. Newly completed exercises add points again. Resetting cooldowns marks every folder Ready and clears its last-hit indicator for this block. It preserves weights, reps, dates, partial flags, seat positions and today’s completed sets / points. Undo is available for 3 seconds.</p><p class="hint">${state.history.length} saved sets · ${state.exercises.length} exercises<br>${html(offline)}</p><p class="hint">Rest days count local calendar midnights, not 24-hour periods. Paired exercises alternate with three local midnights of recovery after a complementary hit, and reset together after six inactive calendar days. Standalone exercises retain their own cycle. Folders stay muted when all choices are cold or recovering. Logging is always available. These are planning labels, not a physiological recovery measurement. Tier points are your planning score.</p><p class="hint">Export before clearing site data, changing browsers or moving devices. Phone settings can block wake lock, sound or vibration. Background / locked-screen alerts are not guaranteed.</p><p id="form-error" class="error" tabindex="-1" role="alert"></p></div>`;
    if(kind==='settings'&&ui.hardware)content=head('ANDROID CHROME · GALAXY S10','Misc')+`<nav class="settings-tabs"><button data-action="misc-tab" data-tab="data">Data & app</button><button data-action="misc-tab" data-tab="hardware" class="selected">Hardware Settings</button></nav><div class="dialog-body"><label class="setting-row"><span>Audio tone</span><input type="checkbox" id="sound" ${state.settings.sound?'checked':''}></label><label>Volume <output id="volume-value">${Math.round(state.settings.volume*100)}%</output><input type="range" id="volume" min="0" max="1" step="0.05" value="${state.settings.volume}"></label><label class="setting-row"><span>Haptic vibration</span><input type="checkbox" id="haptics" ${state.settings.haptics?'checked':''}></label><label>Haptic intensity <output id="hapticIntensity-value">${Math.round(state.settings.hapticIntensity*100)}%</output><input type="range" id="hapticIntensity" min="0" max="1" step="0.1" value="${state.settings.hapticIntensity}"></label><p class="hint">Adjusts pulse length, not motor amplitude. Android controls physical vibration strength.</p><button class="primary full" data-action="test-hardware">Test tone & vibration</button><p class="hint" id="hardware-status">Audio: ${audio?.state||'waiting for a tap'} · Vibration API: ${navigator.vibrate?'available':'unavailable'}</p><p class="hint">Keep media volume on. Silent mode, Do Not Disturb, background suspension and power saving may suppress alerts. Timers remain accurate when you return. Screen wake lock is requested during rest.</p><p id="form-error" class="error" role="alert"></p></div>`;
    if(kind==='workout')content=head('NO RUSH. JUST GOOD SETS.','Workout clock')+`<div class="dialog-body"><div class="big-clock" id="big-clock">${duration(Math.floor(workoutMillis(state)/1000))}</div><p class="hint">Starts with your first logged set, or start it manually. Keeps elapsed time through navigation and reloads.</p><div class="button-row"><button class="primary" data-action="clock-toggle">${state.clock.ended?'Start new workout':state.clock.startedAt!==null?'Pause':state.clock.elapsed?'Resume':'Start'}</button><button data-action="end-workout" class="danger" ${state.clock.ended?'disabled':''}>End workout</button></div><p class="hint">End workout saves the final duration, stops all rest timers and clears the active tray. Your logs, cooldowns and fatigue stay intact. Reset fatigue separately in Settings.</p></div>`;
    if(kind==='rest')content=head('EXERCISE TIMER',e.name,true)+`<form id="rest-form" class="dialog-body" data-id="${eid}"><label>Rest in seconds<input type="number" min="15" max="900" step="1" name="seconds" value="${state.rest[eid]||(e.rest[0]+e.rest[1])/2}" required></label><p class="hint">Prescribed range: ${duration(e.rest[0])}–${duration(e.rest[1])}. Applies to this exercise’s next checked set.</p><button class="primary full">Save rest duration</button><p id="form-error" class="error" tabindex="-1" role="alert"></p></form>`;
    if(kind==='edit-exercise')content=head('YOUR EXERCISE','Edit exercise')+`<form id="exercise-edit-form" class="dialog-body" data-id="${eid}"><label>Name<input name="name" maxlength="100" required value="${html(e.name)}"></label><div class="form-grid"><label>Number of sets<input name="sets" type="number" inputmode="numeric" min="1" max="10" required value="${e.sets}"></label><label>Target reps<input name="reps" maxlength="7" required value="${html(e.reps)}" placeholder="8–12"></label></div><label>Slot tier / fatigue points<select name="tier">${[1,2,3].map(t=>`<option value="${t}" ${e.tier===t?'selected':''}>Tier ${t} · ${4-t} pts</option>`).join('')}</select></label><div class="form-grid"><label>Rest min (seconds)<input name="restMin" type="number" inputmode="numeric" min="15" max="900" required value="${e.rest[0]}"></label><label>Rest max (seconds)<input name="restMax" type="number" inputmode="numeric" min="15" max="900" required value="${e.rest[1]}"></label></div><p class="hint">Use the same value for a fixed rest. 90 seconds = 1½ min; 180 = 3 min. Rest changes apply to the next timer.</p><label>Target RIR<input name="rir" maxlength="5" value="${html(e.rir||'')}" placeholder="e.g. 1–2"></label><label>Slot rest cycle<select name="restCycle"><option value="3" ${e.restCycle===3?'selected':''}>3 days · twice weekly</option><option value="7" ${e.restCycle===7?'selected':''}>7 days · once weekly</option></select></label><label>Category<select name="group">${state.groups.filter(g=>!state.hiddenGroups.includes(g[0])).map(g=>`<option value="${g[0]}" ${e.group===g[0]?'selected':''}>${html(g[1])}</option>`).join('')}</select></label><label>Seat / setup notes<input name="seat" maxlength="200" value="${html(e.seat)}"></label><button class="primary full">Save changes</button><button type="button" class="danger full" data-action="archive-exercise" data-id="${eid}">Delete exercise</button><p class="hint">Deleting removes this exercise and its alternates from active lists. History remains in your backup. Undo is available for 3 seconds.</p><p id="form-error" class="error" role="alert"></p></form>`;
    if(kind==='edit-group'){
      const gid=ui.modal.groupId,g=state.groups.find(g=>g[0]===gid);
      content=head('YOUR CATEGORY','Edit category')+`<form id="group-edit-form" class="dialog-body" data-group="${gid}"><label>Name<input name="name" maxlength="60" required value="${html(g[1])}"></label><button class="primary full">Save name</button><button type="button" data-action="add-exercise" data-id="${gid}">＋ Add an exercise</button><label>Move or restore an existing exercise here<select name="existing"><option value="">Choose exercise…</option>${state.exercises.filter(e=>e.group!==gid||e.archived).map(e=>`<option value="${e.id}">${html(e.name)}${e.archived?' (deleted)':''}</option>`).join('')}</select></label><button type="button" data-action="move-existing" data-id="${gid}">Add selected exercise</button><button type="button" class="danger full" data-action="archive-group" data-id="${gid}">Delete category and its exercises</button><p class="hint">Saved history stays in your backup. Undo is available for 3 seconds.</p><p id="form-error" class="error" role="alert"></p></form>`;
    }
    if(kind==='new-exercise')content=head('YOUR MOVEMENT','Add exercise')+`<form id="exercise-new-form" class="dialog-body" data-group="${ui.modal.groupId}"><label>Name<input name="name" maxlength="100" required></label><div class="form-grid"><label>Tier<select name="tier"><option value="1">Tier 1 · 3 pts</option><option value="2" selected>Tier 2 · 2 pts</option><option value="3">Tier 3 · 1 pt</option></select></label><label>Sets<input name="sets" type="number" min="1" max="10" value="3" required></label></div><label>Rep range<input name="reps" maxlength="30" value="8–12" required></label><label>Target RIR<input name="rir" maxlength="5" placeholder="e.g. 1–2"></label><label>Rest (seconds)<input name="rest" type="number" min="15" max="900" value="120" required></label><button class="primary full">Add exercise</button><p id="form-error" class="error" role="alert"></p></form>`;
    if(kind==='tools')content=toolsPanel(e);
    if(kind==='graph')content=graphPanel(e);
    $('#dialog-content').innerHTML=content;
    refreshWeightFields();tickLabels();
  }
  function toolsPanel(e){
    const unit=state.settings.unit,plateList=unit==='lbs'?[45,35,25,10,5,2.5]:[20,15,10,5,2.5,1.25];
    const total=Number(ui.plate.bar)+2*ui.plate.plates.reduce((n,p)=>n+p,0),c=completion(state,e.id,today);
    return head('TAPS, NOT MENTAL MATH','Load tools',true)+`<div class="dialog-body"><label>Apply to set<select id="tool-set">${Array.from({length:c.target},(_,i)=>`<option value="${i}" ${i===ui.focusSet?'selected':''} ${dailyRecords(state,e.id,today).some(r=>r.index===i)?'disabled':''}>Set ${i+1}</option>`).join('')}</select></label><p class="hint">Quick steps use the unfinished input, or its previous-session weight when empty.</p><div class="button-row">${[-5,5,10].map(n=>`<button data-action="quick-weight" data-id="${e.id}" data-amount="${n}">${n>0?'+':''}${n} ${unit}</button>`).join('')}</div><div class="plate-box"><span class="eyebrow">SYMMETRICAL PLATE LOADING</span><div class="plate-total">${total.toLocaleString()}<small>${unit} total</small></div><label>Bar / sled starting weight<input id="plate-bar" type="number" min="0" max="1000" step="any" value="${ui.plate.bar}"></label><p class="hint">Tap a plate to add it to <strong>each side</strong>.</p><div class="plate-buttons">${plateList.map(n=>`<button data-action="plate-add" data-amount="${n}">${n}</button>`).join('')}</div><p class="plate-list">Per side: ${ui.plate.plates.length?ui.plate.plates.join(' + '):'No plates'}</p><div class="button-row"><button data-action="plate-remove">Remove last pair</button><button data-action="plate-clear">Clear plates</button></div><button class="primary full" data-action="plate-apply" data-id="${e.id}">Use ${total} ${unit}</button></div><p id="form-error" class="error" tabindex="-1" role="alert"></p></div>`;
  }
  function graphPanel(e){
    const series=graphSeries(state,e.id,ui.graph),volume=ui.graph==='volume',unit=state.settings.unit;
    const width=380,height=220,pad={left:52,right:16,top:20,bottom:38};
    const max=Math.max(1,...series.map(p=>p.value)),minDay=series.length?ordinal(series[0].day):0,maxDay=series.length?ordinal(series.at(-1).day):0;
    const x=p=>pad.left+(maxDay===minDay?(width-pad.left-pad.right)/2:(ordinal(p.day)-minDay)/(maxDay-minDay)*(width-pad.left-pad.right));
    const y=p=>height-pad.bottom-p.value/max*(height-pad.top-pad.bottom);
    const chosen=series[ui.graphPoint ?? series.length-1];
    const chart=series.length?`<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">${html(e.name)}: ${volume?'daily volume load':'estimated one-rep max'}</title><desc id="chart-desc">${series.length} training days. Values are also listed in the table below. Select a point to inspect it.</desc>${[0,.5,1].map(v=>`<line x1="${pad.left}" x2="${width-pad.right}" y1="${height-pad.bottom-v*(height-pad.top-pad.bottom)}" y2="${height-pad.bottom-v*(height-pad.top-pad.bottom)}" stroke="#283125"/><text x="${pad.left-8}" y="${height-pad.bottom-v*(height-pad.top-pad.bottom)+4}" text-anchor="end">${Math.round(max*v).toLocaleString()}</text>`).join('')}<path d="${series.map((p,i)=>`${i?'L':'M'} ${x(p)} ${y(p)}`).join(' ')}" fill="none" stroke="#cefb79" stroke-width="2.5"/>${series.map((p,i)=>`<circle cx="${x(p)}" cy="${y(p)}" r="${i===(ui.graphPoint??series.length-1)?6:4}" fill="#cefb79" stroke="#11180b" stroke-width="2" data-point="${i}" tabindex="0" role="button" aria-label="${dateLabel(p.day)}: ${p.value} ${unit}${volume?' reps':''}"><title>${dateLabel(p.day)} · ${p.value.toLocaleString()}</title></circle>`).join('')}<text x="${pad.left}" y="${height-10}">${dateLabel(series[0].day)}</text>${series.length>1?`<text x="${width-pad.right}" y="${height-10}" text-anchor="end">${dateLabel(series.at(-1).day)}</text>`:''}</svg>`:'<div class="empty chart-empty">Your next baseline starts here.<br>Log a set to build this graph.</div>';
    return head('YOUR PROGRESS',e.name,true)+`<div class="dialog-body"><div class="segmented"><button data-action="graph-metric" data-metric="volume" class="${volume?'selected':''}">Volume load</button><button data-action="graph-metric" data-metric="e1rm" class="${!volume?'selected':''}">Estimated 1RM</button></div><div class="graph-value"><strong>${chosen?chosen.value.toLocaleString():'—'}</strong><span>${volume?`${unit} × reps`:unit}${chosen?` · ${dateLabel(chosen.day)}`:''}</span></div>${chart}<p class="hint">${volume?'Daily sum of weight × reps, including drop rounds. Legacy partial reps are not counted. More sets also raise volume.':'Best Epley estimate per day: weight × (1 + full reps ÷ 30). Only sets with 1–12 reps, nonzero load and no partial flag qualify. This is an estimate, not a tested maximum.'} Text-only loads stay in set history and are excluded from these graphs. Numeric values use ${unit}. For dumbbells, use a consistent per-hand convention.</p>${series.length?`<details class="data-table"><summary>Show daily values (${series.length})</summary><table><thead><tr><th>Date</th><th>${volume?'Volume load':'e1RM'}</th></tr></thead><tbody>${[...series].reverse().map(p=>`<tr><td>${dateLabel(p.day)}</td><td>${p.value.toLocaleString()}</td></tr>`).join('')}</tbody></table></details>`:''}<details class="data-table"><summary>Set history (${state.history.filter(r=>r.exerciseId===e.id).length})</summary>${[...state.history].reverse().filter(r=>r.exerciseId===e.id).map(r=>`<div class="history-row"><span>${exactTime(r.at)}<small>Set ${r.index+1}</small></span><b>${metric(r)}</b></div>`).join('')||'<p class="hint">No sets yet.</p>'}</details></div>`;
  }
  function syncTimers(){if(Object.keys(state.timers).length)acquireWake();else releaseWake();}
  async function acquireWake(){if(wake||wakePending||!Object.keys(state.timers).length||document.visibilityState!=='visible'||!navigator.wakeLock)return;wakePending=true;try{const lock=await navigator.wakeLock.request('screen');if(!Object.keys(state.timers).length){await lock.release();return;}wake=lock;lock.addEventListener('release',()=>{if(wake===lock)wake=null;tickLabels();});}catch{}finally{wakePending=false;tickLabels();}}
  function releaseWake(){const lock=wake;wake=null;lock?.release().catch(()=>{});}
  function tickLabels(){
    document.querySelectorAll('[data-countdown]').forEach(el=>{const timer=state.timers[el.dataset.countdown];el.textContent=timer?duration(Math.max(0,Math.ceil((timer.end-Date.now())/1000))):'';});
    const elapsed=duration(Math.floor(workoutMillis(state)/1000));if($('#stopwatch'))$('#stopwatch').textContent=elapsed;if($('#big-clock'))$('#big-clock').textContent=elapsed;
    if($('#wake-label'))$('#wake-label').textContent=wake?'screen awake':'wake lock off';
  }
  function tick(){
    const day=localDay();if(day!==today){today=day;dismissUndo();renderAll();toast('A new calendar day. Today’s sets and fatigue start fresh.');}
    const ended=Object.entries(state.timers).filter(([,t])=>t.end<=Date.now());
    if(ended.length){const next=copy(state);ended.forEach(([eid])=>delete next.timers[eid]);if(persist(next))state=next;else ended.forEach(([eid])=>delete state.timers[eid]);renderTop();renderModal();syncTimers();alarm();const names=ended.map(([eid])=>exerciseById(state,eid).name).join(', ');$('#announce').textContent=`Rest complete: ${names}`;if(!undo)toast(`Ready: ${names}`);}
    tickLabels();
  }
  function renderAll(){renderTop();renderMain();renderModal();syncTimers();refreshWeightFields();}
  function currentRow(eid,index){const scope=$('#dialog').open?$('#dialog-content'):$('#content');return scope.querySelector(`[data-row="${index}"][data-id="${eid}"]`);}
  function openExercise(eid){mutate(s=>selectVariation(s,eid),{render:false});if(ui.returnY===null)ui.returnY=window.scrollY;showModal('log',eid);}
  function finishSetView(){
    const y=ui.returnY??window.scrollY;document.activeElement?.blur();ui.exercise=null;ui.group=null;ui.folder=null;ui.floating=false;ui.search='';$('#search').value='';
    if($('#dialog').open)closeModal();ui.modal=null;renderAll();
    // Retain enough page height for the original pixel offset after collapsing.
    document.body.style.minHeight=`${y+window.innerHeight}px`;
    requestAnimationFrame(()=>{window.scrollTo({top:y,behavior:'instant'});requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'}));});ui.returnY=null;
  }
  function download(text,name){const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  async function restore(file){if(!file)return;try{if(file.size>40*1024*1024)throw Error('Choose a V2 backup smaller than 40 MB.');const next=migrateState(JSON.parse(await file.text()));if(!confirm(`Restore ${next.history.length} sets? This replaces your current V2 data. Export a backup first if you want to keep it.`))return;if(persist(next,true)){state=next;dismissUndo();renderAll();toast('Backup restored.');}}catch(e){error(e instanceof SyntaxError?'That file is not valid JSON. Existing data is unchanged.':e.message);}}
  async function install(){if(installPrompt){const p=installPrompt;installPrompt=null;await p.prompt();return;}error('Open the HTTPS app in Chrome → browser menu → Install app / Add to Home screen. On iPhone: Safari → Share → Add to Home Screen.');}
  function applyLoad(eid,weight){const index=ui.focusSet;if(!Number.isFinite(weight)||weight<0||weight>10000){error('Choose a load from 0 to 10,000.');return;}if(dailyRecords(state,eid,today).some(r=>r.index===index)){error('Choose an unfinished set.');return;}if(mutate(s=>writeDraft(s,eid,index,'weight',String(Math.round(weight*100)/100),today),{render:false})){openExercise(eid);renderMain();currentRow(eid,index)?.querySelector('[data-field=reps]')?.focus();}}

  document.addEventListener('click',event=>{
    const point=event.target.closest('[data-point]');if(point){ui.graphPoint=Number(point.dataset.point);renderModal();return;}
    const b=event.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,eid=b.dataset.id,index=Number(b.dataset.index);
    if(b.closest('summary'))event.preventDefault();
    if(a==='supplements'){showModal('supplements');return;}
    if(a==='supplement-info'){showModal('supplement-info',eid);return;}
    if(a==='supplement-check'){today=localDay();mutate(s=>setSupplement(s,eid,today,!supplementDates(s,eid).includes(today)));return;}
    if(a==='edit-exercise'){showModal('edit-exercise',eid);return;}
    if(a==='edit-group'){showModal('edit-group',null,{groupId:eid});return;}
    if(a==='add-exercise'){showModal('new-exercise',null,{groupId:eid});return;}
    if(a==='move-existing'){const selected=$('#group-edit-form select').value;if(!selected)return;if(mutate(s=>moveExercise(s,selected,eid),{render:false})){closeModal();renderAll();}return;}
    if(a==='archive-exercise'||a==='archive-group'){
      if(mutate(s=>a==='archive-exercise'?archiveExercise(s,eid):archiveGroup(s,eid),{render:false,message:'Removed from active lists. History kept.',canUndo:true})){closeModal();renderAll();}return;
    }
    if(a==='undo'){const fn=undo;dismissUndo();fn?.();return;}
    if(a==='close'){if(ui.modal?.kind==='supplement-info')showModal('supplements');else closeModal();return;}
    if(a==='back'){openExercise(ui.modal.id);return;}
    if(a==='page'){ui.page=b.dataset.page;ui.exercise=null;ui.group=null;ui.folder=null;ui.returnY=null;renderMain();return;}
    if(a==='filter'){ui.filter=b.dataset.filter;ui.floating=false;ui.group=null;ui.folder=null;ui.exercise=null;ui.returnY=null;renderMain();return;}
    if(a==='open'){openExercise(eid);return;}
    if(a==='pin'){mutate(s=>togglePin(s,eid));return;}
    if(a==='clear-pins'){mutate(s=>{s.pinned=[];});return;}
    if(a==='drops'){
      const key=draftKey(today,eid,index),rec=dailyRecords(state,eid,today).find(r=>r.index===index),drops=rec?.drops||state.drafts[key]?.drops||[];
      ui.dropOpen[key]=!(ui.dropOpen[key]??!!drops.length);
      if(ui.dropOpen[key]&&!drops.length&&!rec)mutate(s=>editDrop(s,eid,index,'add'),{render:false});
      renderAll();return;
    }
    if(a==='drop-add'||a==='drop-remove'){mutate(s=>editDrop(s,eid,index,a==='drop-add'?'add':'remove',Number(b.dataset.round)));return;}
    if(a==='set'){
      if(localDay()!==today){today=localDay();renderAll();toast('Midnight crossed. Review today’s inputs before logging.');return;}
      unlockAudio();const row=currentRow(eid,index),record=dailyRecords(state,eid,today).find(r=>r.index===index);
      const values={weight:row.querySelector('[data-field=weight]').value,reps:row.querySelector('[data-field=reps]').value,partial:state.drafts[draftKey(today,eid,index)]?.partial||false,drops:state.drafts[draftKey(today,eid,index)]?.drops||[]};
      const completedBefore=completion(state,eid,today).complete;
      if(mutate(s=>record?unlogSet(s,eid,index,today):completeWithHistory(s,eid,index,values),{render:false,message:record?'Set unchecked.':'Set saved.',canUndo:true})){buzz();if(!record){if(!completedBefore&&completion(state,eid,today).complete&&!state.fatigueResets[today]?.includes(eid))$('#announce').textContent=`${exerciseById(state,eid).name} complete. ${points(exerciseById(state,eid))} points added.`;finishSetView();}else renderAll();}return;
    }
    if(a==='copy'){if(mutate(s=>copyPrevious(s,eid,index,today))){buzz();currentRow(eid,index)?.querySelector('[data-field=weight]')?.focus({preventScroll:true});}return;}
    if(a==='target-plus'||a==='target-minus'){mutate(s=>changeTarget(s,eid,targetSets(s,eid,today)+(a==='target-plus'?1:-1),today));return;}
    if(a==='graph'){ui.graph='volume';ui.graphPoint=null;showModal('graph',eid);return;}
    if(a==='graph-metric'){ui.graph=b.dataset.metric;ui.graphPoint=null;renderModal();return;}
    if(a==='alternate'){showModal('alternate',eid);return;}
    if(a==='settings'){ui.hardware=false;showModal('settings');return;}
    if(a==='misc-tab'){ui.hardware=b.dataset.tab==='hardware';renderModal();return;}
    if(a==='test-hardware'){unlockAudio().then(()=>alarm()).then(()=>{if($('#hardware-status'))$('#hardware-status').textContent=`Audio: ${audio?.state||'unavailable'} · Vibration API: ${navigator.vibrate?'available':'unavailable'}`;});return;}
    if(a==='workout'){showModal('workout');return;}
    if(a==='rest-setting'){showModal('rest',eid);return;}
    if(a==='new-folder'){showModal('folder');return;}
    if(a==='edit-folder'){showModal('folder',null,{folderId:eid});return;}
    if(a==='delete-folder'){if(mutate(s=>{s.folders=s.folders.filter(f=>f.id!==eid);},{render:false,message:'Folder removed. History kept.',canUndo:true})){closeModal();renderAll();}return;}
    if(a==='reset-cooldowns'){mutate(resetCooldowns,{message:'Cooldowns reset. History and points kept.',canUndo:true});return;}
    if(a==='clock-toggle'){unlockAudio();mutate(s=>{if(s.clock.startedAt!==null)pauseClock(s);else startWorkout(s);});return;}
    if(a==='end-workout'){mutate(s=>endWorkout(s),{message:'Workout ended. Logs and final time saved.',canUndo:true});return;}
    if(a==='reset-fatigue'){mutate(s=>resetDailyFatigue(s,today),{message:'Daily fatigue reset. Logs and cooldowns kept.',canUndo:true});return;}
        if(a==='timer-stop'){mutate(s=>{delete s.timers[eid];});return;}
    if(a==='export'){download(JSON.stringify(state,null,2),`flex-log-v2-${today}.json`);return;}
    if(a==='raw-export'){download(unreadable||'','flex-log-unreadable.json');return;}
    if(a==='import'){$('#backup-file').click();return;}
    if(a==='install'){install();return;}
    if(a==='tools'){const unfinished=Array.from({length:targetSets(state,eid,today)},(_,i)=>i).filter(i=>!dailyRecords(state,eid,today).some(r=>r.index===i));if(!unfinished.length){toast('All sets are logged. Add a set to use load tools.');return;}if(!unfinished.includes(ui.focusSet))ui.focusSet=unfinished[0];ui.plate={bar:state.settings.unit==='lbs'?45:20,plates:[]};showModal('tools',eid);return;}
    if(a==='quick-weight'){try{const draft=state.drafts[draftKey(today,eid,ui.focusSet)],last=previousSet(state,eid,ui.focusSet,today);const base=draft?.weight!==undefined&&draft.weight!==''?parseWeight(draft.weight):last?inUnit(last,state.settings.unit):0;if(base===null)throw Error('Enter a numeric load to use weight adjustments.');applyLoad(eid,Math.max(0,base+Number(b.dataset.amount)));}catch(e){error(e.message);}return;}
    if(a==='plate-add'){ui.plate.plates.push(Number(b.dataset.amount));renderModal();return;}
    if(a==='plate-remove'){ui.plate.plates.pop();renderModal();return;}
    if(a==='plate-clear'){ui.plate.plates=[];renderModal();return;}
    if(a==='plate-apply'){if(String(ui.plate.bar).trim()===''||!Number.isFinite(Number(ui.plate.bar))||Number(ui.plate.bar)<0||Number(ui.plate.bar)>1000){error('Enter a bar / sled weight from 0 to 1,000.');return;}applyLoad(eid,Number(ui.plate.bar)+2*ui.plate.plates.reduce((n,p)=>n+p,0));return;}
  });
  document.addEventListener('keydown',event=>{if(event.target.matches('[role=tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?'upper':event.key==='End'?'lower':ui.filter==='upper'?'lower':'upper';document.querySelector(`[data-action=filter][data-filter=${next}]`)?.click();document.getElementById(`tab-${next}`)?.focus();}});
  document.addEventListener('keydown',event=>{if(event.target.matches('[data-point]')&&['Enter',' '].includes(event.key)){event.preventDefault();event.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
  $('#content').addEventListener('click',event=>{
    const floatingSummary=event.target.closest('[data-floating] > summary');
    if(floatingSummary){if(!floatingSummary.parentElement.open&&ui.returnY===null)ui.returnY=window.scrollY;ui.floating=!floatingSummary.parentElement.open;return;}
    const summary=event.target.closest('summary');if(!summary||event.target.closest('[data-action]'))return;const details=summary.parentElement;
    if(details.matches('[data-group]')){event.preventDefault();if(!details.open&&ui.group===null)ui.returnY=window.scrollY;ui.group=details.open?null:details.dataset.group;ui.exercise=null;renderMain();}
    if(details.matches('[data-folder]')){event.preventDefault();if(!details.open&&ui.folder===null)ui.returnY=window.scrollY;ui.folder=details.open?null:details.dataset.folder;ui.exercise=null;renderMain();}
    if(details.matches('[data-exercise]')){event.preventDefault();ui.exercise=details.open?null:details.dataset.exercise;renderMain();}
  });
  document.addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.matches('textarea[data-field=weight]')){event.preventDefault();event.target.blur();}});
  document.addEventListener('focusin',event=>{if(event.target.matches('[data-field=weight]'))ui.focusSet=Number(event.target.dataset.index);});
  document.addEventListener('input',event=>{
    const el=event.target;
    if(['volume','hapticIntensity'].includes(el.id)){if(mutate(s=>{s.settings[el.id]=Number(el.value);},{render:false})){document.getElementById(el.id+'-value').textContent=`${Math.round(Number(el.value)*100)}%`;}return;}
    if(el.id==='search'){ui.search=el.value;renderMain();return;}
    if(el.matches('[data-seat]')){mutate(s=>{exerciseById(s,el.dataset.seat).seat=el.value;},{render:false});return;}
    if(el.dataset?.dropField){
      mutate(s=>editDrop(s,el.dataset.id,Number(el.dataset.index),'edit',Number(el.dataset.round),el.dataset.dropField,el.value),{render:false});
      if(el.tagName==='TEXTAREA'){el.style.height='auto';el.style.height=el.scrollHeight+'px';}return;
    }
    if(el.matches('[data-field]')){
      const eid=el.dataset.id,index=Number(el.dataset.index),field=el.dataset.field;
      mutate(s=>writeDraft(s,eid,index,field,field==='partial'?el.checked:el.value,today),{render:false});
      if(field==='weight')updateWeightField(el);
      if(field!=='partial'){const last=previousSet(state,eid,index,today),previous=last?(field==='weight'?inUnit(last,state.settings.unit):last.reps):null;let value;try{value=field==='weight'?parseWeight(el.value):Number(el.value);}catch{value=NaN;}el.classList.toggle('overload',previous!==null&&value!==null&&el.value!==''&&value>previous);}
    }
    if(el.id==='plate-bar'){ui.plate.bar=el.value;const total=Number(el.value)+2*ui.plate.plates.reduce((n,p)=>n+p,0);$('.plate-total').innerHTML=`${Number.isFinite(total)?total:'—'}<small>${state.settings.unit} total</small>`;const button=$('[data-action=plate-apply]');button.textContent=`Use ${Number.isFinite(total)?total:'—'} ${state.settings.unit}`;}
  });
  document.addEventListener('change',event=>{const el=event.target;
    if(el.dataset?.variation){if(mutate(s=>selectVariation(s,el.value),{render:false})){ui.exercise=el.value;renderAll();openExercise(el.value);}return;}
    if(el.id==='units'&&!mutate(s=>changeUnits(s,el.value)))el.value=state.settings.unit;
    if(el.id==='sound'){mutate(s=>{s.settings.sound=el.checked;});unlockAudio();}
    if(el.id==='haptics'){mutate(s=>{s.settings.haptics=el.checked;});if(!el.checked)navigator.vibrate?.(0);else buzz();}
    if(el.id==='hapticIntensity')buzz();
    if(el.id==='backup-file')restore(el.files[0]);
    if(el.id==='tool-set')ui.focusSet=Number(el.value);
  });
  document.addEventListener('submit',event=>{
    const form=event.target;if(!['alternate-form','folder-form','rest-form','exercise-edit-form','group-edit-form','exercise-new-form'].includes(form.id))return;event.preventDefault();const data=new FormData(form);
    if(form.id==='exercise-edit-form'){if(mutate(s=>editExercise(s,form.dataset.id,{name:String(data.get('name')),sets:Number(data.get('sets')),reps:String(data.get('reps')),tier:Number(data.get('tier')),restMin:Number(data.get('restMin')),restMax:Number(data.get('restMax')),rir:String(data.get('rir')),restCycle:Number(data.get('restCycle')),group:String(data.get('group')),seat:String(data.get('seat'))}),{render:false})){closeModal();renderAll();}return;}
    if(form.id==='group-edit-form'){if(mutate(s=>renameGroup(s,form.dataset.group,String(data.get('name'))),{render:false})){closeModal();renderAll();}return;}
    if(form.id==='exercise-new-form'){if(mutate(s=>{const created=createExercise(s,form.dataset.group,String(data.get('name')),{tier:Number(data.get('tier')),sets:Number(data.get('sets')),reps:String(data.get('reps')),rest:Number(data.get('rest'))});setRir(s,created.id,String(data.get('rir')).trim());},{render:false})){ui.group=form.dataset.group;closeModal();renderAll();}return;}
    if(form.id==='alternate-form'){let created;const originFolder=ui.page==='stations'?ui.folder:null;
      if(mutate(s=>{created=addAlternate(s,form.dataset.parent,String(data.get('name')),{sets:Number(data.get('sets')),reps:String(data.get('reps')).trim()});setRir(s,created.id,String(data.get('rir')).trim());selectVariation(s,created.id);if(originFolder){const f=s.folders.find(f=>f.id===originFolder),root=slotId(s,created.id);if(f&&!f.exerciseIds.some(eid=>slotId(s,eid)===root))f.exerciseIds.push(root);}},{render:false})){ui.exercise=created.id;renderTop();renderMain();openExercise(created.id);toast('Alternate added with independent history.');}
    }
    if(form.id==='folder-form'){const fid=form.dataset.folder||id();if(mutate(s=>setFolder(s,fid,String(data.get('name')),data.getAll('exercise')),{render:false})){ui.page='stations';ui.folder=fid;closeModal();renderAll();toast('Station saved. All entries stay linked.');}}
    if(form.id==='rest-form'){const seconds=Number(data.get('seconds'));if(mutate(s=>{if(!Number.isInteger(seconds)||seconds<15||seconds>900)throw Error('Choose 15–900 whole seconds.');s.rest[form.dataset.id]=seconds;},{render:false})){openExercise(form.dataset.id);toast('Rest duration saved.');}}
  });
  let hold=null,suppressClickUntil=0;
  function editTarget(target){
    if(target.closest('input,select,textarea,[data-action=pin]'))return null;
    const summary=target.closest('summary');
    if(summary){const d=summary.parentElement;if(d.dataset.exercise)return ()=>showModal('edit-exercise',d.dataset.exercise);if(d.dataset.group)return ()=>showModal('edit-group',null,{groupId:d.dataset.group});if(d.dataset.folder)return ()=>showModal('folder',null,{folderId:d.dataset.folder});}
    const pin=target.closest('.pin-card');if(pin)return ()=>showModal('edit-exercise',pin.dataset.id);
    if(target.closest('#dialog-title')&&ui.modal?.id&&exerciseById(state,ui.modal.id))return ()=>showModal('edit-exercise',ui.modal.id);
    return null;
  }
  function cancelHold(){if(hold)clearTimeout(hold.timer);hold=null;}
  document.addEventListener('pointerdown',event=>{
    cancelHold();if(event.button!==0)return;const edit=editTarget(event.target);if(!edit)return;
    hold={x:event.clientX,y:event.clientY,timer:setTimeout(()=>{suppressClickUntil=Date.now()+900;cancelHold();buzz();edit();},550)};
  });
  document.addEventListener('pointermove',event=>{if(hold&&Math.hypot(event.clientX-hold.x,event.clientY-hold.y)>10)cancelHold();});
  for(const type of ['pointerup','pointercancel','scroll'])document.addEventListener(type,cancelHold,true);
  document.addEventListener('click',event=>{if(Date.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}},true);
  document.addEventListener('contextmenu',event=>{const edit=editTarget(event.target);if(edit){event.preventDefault();cancelHold();if(Date.now()>=suppressClickUntil)edit();}},true);
  document.addEventListener('keydown',event=>{if(event.key==='F2'||event.shiftKey&&event.key==='F10'){const edit=editTarget(event.target);if(edit){event.preventDefault();edit();}}});
  let swipe=null;
  document.addEventListener('pointerdown',event=>{const row=event.target.closest('[data-row]');if(row&&!event.target.closest('input,textarea,button,label,.drop-rounds')&&!row.classList.contains('logged'))swipe={x:event.clientX,y:event.clientY,eid:row.dataset.id,index:Number(row.dataset.row)};else swipe=null;});
  document.addEventListener('pointerup',event=>{if(swipe&&event.clientX-swipe.x>65&&Math.abs(event.clientY-swipe.y)<40){const {eid,index}=swipe;let copied=false;if(mutate(s=>{copied=copySetAbove(s,eid,index,today);},{message:'',render:false})&&copied){renderAll();buzz();toast('Copied set above.');}}swipe=null;});
  document.addEventListener('pointercancel',()=>{swipe=null;});
  $('#dialog').addEventListener('cancel',event=>{if(ui.modal?.kind==='supplement-info'){event.preventDefault();showModal('supplements');}});
  $('#dialog').addEventListener('close',()=>{if(!$('#dialog').open){ui.modal=null;renderTop();renderMain();attachFloating();}});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){tick();acquireWake();}else releaseWake();});
  window.addEventListener('pageshow',()=>{tick();acquireWake();});
  
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
  window.addEventListener('storage',event=>{if(event.key!==key)return;try{state=event.newValue?migrateState(JSON.parse(event.newValue)):initialState();dismissUndo();renderAll();toast('Updated from another tab.');}catch{blocked=true;warn('Another tab saved unreadable data. Export your current log before reloading.');}});
  if('serviceWorker' in navigator&&(location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname))){navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(()=>navigator.serviceWorker.ready).then(()=>{offline='Offline app files are ready on this device.';if(ui.modal?.kind==='settings')renderModal();}).catch(()=>{offline='Offline setup failed. Reopen while online to retry.';if(ui.modal?.kind==='settings')renderModal();});}
  else offline='Use HTTPS or localhost to enable offline installation.';
  renderAll();tick();setInterval(tick,250);
}
