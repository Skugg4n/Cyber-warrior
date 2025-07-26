const initialOperatorData = {
  level: 1,
  xp: 0,
  xpToNextLevel: 1000,
  xpMultiplier: 1,
  systemIntegrity: '100.0%',
  cCreds: 0,
  augments: ['Stock Chassis Mk I'],
  inventory: [],
};

const missionsData = [
  {
    id: 'mission_push_v1',
    title: 'SYSTEM DIRECTIVE: PUSH PROTOCOL',
    from: 'AEGIS_COMMAND',
    description: '// Execute standard chest, shoulder, and triceps sub-routines. Focus on controlled power output and muscular hypertrophy.',
    reward: '2500 DATA_PACKETS, SCHEMATIC: AEGIS_PAULDRONS_MKII',
    xp: 2500,
    cCredBonus: 50,
    exercises: [
      { id: 'ex_dbp', name: 'Dumbbell Bench Press', type: 'weight_reps', targetSets: 3, targetReps: '20-30', previous: '12.5kg x 20-30 reps' },
      { id: 'ex_dssp', name: 'Dumbbell Seated Shoulder Press', type: 'weight_reps', targetSets: 3, targetReps: '10-12', previous: '8-12.5kg x 10-12 reps' },
      { id: 'ex_dbalr', name: 'Dumbbell Bent Arm Lateral Raise', type: 'weight_reps', targetSets: 3, targetReps: '15-20', previous: '8kg x 15-20 reps' },
      { id: 'ex_dk', name: 'Dumbbell Kickback', type: 'weight_reps', targetSets: 4, targetReps: '10-15', previous: '8-12.5kg x 10-15 reps' },
      { id: 'ex_dpu', name: 'Deep Push Up (hands on DBs)', type: 'reps_only', targetSets: 3, targetReps: 'max', previous: 'Body-weight x max reps' },
      {
        id: 'ex_bbp',
        name: 'Barbell Bench Press',
        type: 'weight_reps',
        targetSets: 3,
        targetReps: '8-10',
        previous: '50-55kg x 8-10 reps',
        alternatives: [
          { id: 'ex_dbp', name: 'Dumbbell Bench Press', penalty: -5 },
          { id: 'ex_dpu', name: 'Deep Push Up (hands on DBs)', penalty: -10 }
        ]
      },
      { id: 'ex_kte', name: 'Kettlebell Triceps Extension', type: 'weight_reps', targetSets: 2, targetReps: '10-12', previous: '8-12kg x 10-12 reps' },
    ],
  },
  {
    id: 'mission_pull_v1',
    title: 'SYSTEM DIRECTIVE: PULL PROTOCOL',
    from: 'AEGIS_COMMAND',
    description: '// Execute standard back and biceps sub-routines. Focus on contractile force and developing system bandwidth.',
    reward: '2200 DATA_PACKETS, SCHEMATIC: MYOMER_CONDUITS_V2',
    xp: 2200,
    cCredBonus: 50,
    exercises: [
      { id: 'ex_dir', name: 'Dumbbell Incline Row', type: 'weight_reps', targetSets: 3, targetReps: '15-20', previous: '12.5kg x 15-20 reps' },
      { id: 'ex_bor', name: 'Bent Over Row', type: 'weight_reps', targetSets: 3, targetReps: '20-30', previous: '12.5kg x 20-30 reps' },
      { id: 'ex_dashc', name: 'Dumbbell Alternate Seated Hammer Curl', type: 'weight_reps', targetSets: 4, targetReps: '15-20', previous: '12.5kg x 15-20 reps' },
      { id: 'ex_ds', name: 'Dumbbell Shrug', type: 'weight_reps', targetSets: 3, targetReps: '30-40', previous: '12.5kg x 30-40 reps' },
      { id: 'ex_bor_alt', name: 'Bent-Over Row (barbell / DB alt.)', type: 'weight_reps', targetSets: 3, targetReps: '20-25', previous: '12.5kg x 20-25 reps' },
    ],
  },
  {
    id: 'mission_legs_core_v1',
    title: 'SYSTEM DIRECTIVE: LEGS & CORE PROTOCOL',
    from: 'AEGIS_COMMAND',
    description: '// Full system diagnostic. Calibrate foundational and core stability systems for maximum operational readiness.',
    reward: '3000 DATA_PACKETS, SCHEMATIC: GYRO_STABILIZERS_MKIII',
    xp: 3000,
    cCredBonus: 75,
    exercises: [
      {
        id: 'ex_fs',
        name: 'Full Squat (barbell)',
        type: 'weight_reps',
        targetSets: 3,
        targetReps: '8-10',
        previous: '50kg x 8-10 reps',
        alternatives: [
          { id: 'ex_gs', name: 'Goblet Squat (KB/DB)', penalty: -5 },
          { id: 'ex_bw_squat', name: 'Bodyweight Squat', penalty: -10 }
        ]
      },
      { id: 'ex_dl', name: 'Deadlift (conventional)', type: 'weight_reps', targetSets: 3, targetReps: '15-16', previous: '50kg x 15-16 reps' },
      { id: 'ex_brdl', name: 'Barbell Romanian Deadlift', type: 'weight_reps', targetSets: 3, targetReps: '12-15', previous: '50kg x 12-15 reps' },
      { id: 'ex_gs', name: 'Goblet Squat (KB/DB)', type: 'weight_reps', targetSets: 3, targetReps: '15-20', previous: '12.5-16kg x 15-20 reps' },
      { id: 'ex_dlu', name: 'Dumbbell Lunge', type: 'weight_reps', targetSets: 3, targetReps: '10-12', previous: '12.5kg x 10-12 reps' },
      { id: 'ex_bscr', name: 'Barbell Standing Calf Raise', type: 'weight_reps', targetSets: 3, targetReps: '30-32', previous: '50kg x 30-32 reps' },
      { id: 'ex_dgb', name: 'Dumbbell Glute Bridge', type: 'weight_reps', targetSets: 3, targetReps: '20', previous: '12.5-16kg x 20 reps' },
      { id: 'ex_kbs', name: 'Kettlebell Swing', type: 'weight_reps', targetSets: 3, targetReps: '20', previous: '16kg x 20 reps' },
      { id: 'ex_wr', name: 'Wheel Rollout', type: 'reps_only', targetSets: 3, targetReps: '10-12', previous: 'Body-weight x 10-12 reps' },
      { id: 'ex_wsltc', name: 'Weighted Straight Leg Toe Touch Crunch', type: 'weight_reps', targetSets: 3, targetReps: '20-30', previous: '12.5-16kg x 20-30 reps' },
      { id: 'ex_hlr', name: 'Hanging Leg Raise', type: 'reps_only', targetSets: 3, targetReps: '10', previous: 'Body-weight x 10 reps' },
      { id: 'ex_lrhl', name: 'Leg Raise Hip Lift', type: 'reps_only', targetSets: 3, targetReps: '10-15', previous: 'Body-weight x 10-15 reps' },
      { id: 'ex_su', name: 'Sit-Up', type: 'reps_only', targetSets: 3, targetReps: '30', previous: 'Body-weight x 30 reps' },
      { id: 'ex_krt', name: 'Kettlebell Russian Twist', type: 'weight_reps', targetSets: 3, targetReps: '20', previous: '16kg x 20 reps' },
      { id: 'ex_tt', name: 'Toe Touch (body-weight)', type: 'reps_only', targetSets: 3, targetReps: '20', previous: 'Body-weight x 20 reps' },
    ],
  },
  {
    id: 'mission_cond_v1',
    title: 'SYSTEM DIRECTIVE: CONDITIONING & MOBILITY',
    from: 'SYS_MAINTENANCE',
    description: '// Run system optimization and defragmentation protocols. Purge latency and improve data throughput.',
    reward: '500 DATA_PACKETS',
    xp: 500,
    cCredBonus: 25,
    exercises: [
      { id: 'ex_hb', name: 'Heavy Bag', type: 'timed', targetSets: 1, targetReps: '10-15 min', previous: '10-15 min' },
      { id: 'ex_ym', name: 'Yoga & Mobility', type: 'timed', targetSets: 1, targetReps: '5-10 min', previous: '5-10 min flow' },
    ],
  },
  {
    id: 'event_glitch_01',
    title: '[GLITCHED] D@T$_H&D R3C0VRY',
    from: '[UNKNOWN]',
    description: '// C0rrupt3d data str3am d3tect3d. R3qu!r3 0perat0r t0 run high-v0lum3 PULL sub-r0ut!n3s t0 f0rc3-sync th3 arch!v3. T!m3 !s cr!t!cal.',
    specialCondition: 'This mission has a 2-hour time limit to accept once it appears.',
    reward: '3000 DATA_PACKETS, SCHEMATIC: CORRUPTED_HOLOTAG',
    xp: 3000,
    cCredBonus: 150,
    exercises: [
      { id: 'ex_dir', name: 'Dumbbell Incline Row', type: 'weight_reps', targetSets: 5, targetReps: '15-20', previous: '12.5kg x 15-20 reps' },
      { id: 'ex_bor', name: 'Bent Over Row', type: 'weight_reps', targetSets: 5, targetReps: '20-30', previous: '12.5kg x 20-30 reps' },
      { id: 'ex_dashc', name: 'Dumbbell Alternate Seated Hammer Curl', type: 'weight_reps', targetSets: 5, targetReps: '15-20', previous: '12.5kg x 15-20 reps' },
      { id: 'ex_ds', name: 'Dumbbell Shrug', type: 'weight_reps', targetSets: 5, targetReps: '30-40', previous: '12.5kg x 30-40 reps' },
      { id: 'ex_bor_alt', name: 'Bent-Over Row (barbell / DB alt.)', type: 'weight_reps', targetSets: 5, targetReps: '20-25', previous: '12.5kg x 20-25 reps' },
    ],
  },
  {
    id: 'event_endurance_01',
    title: 'ENDURANCE TEST: THE AEGIS FORGE',
    from: 'SYS_ADMIN',
    description: '// We need to stress-test the system\'s limits. This directive combines PUSH and PULL protocols into a single, high-intensity session. For advanced Operators only.',
    specialCondition: 'Requires Operator Level 5 or higher to accept.',
    reward: '5000 DATA_PACKETS, SCHEMATIC: FORGE_EMBLEM',
    xp: 5000,
    cCredBonus: 200,
    exercises: [
      { id: 'ex_dbp', name: 'Dumbbell Bench Press', type: 'weight_reps', targetSets: 3, targetReps: '20-30', previous: '12.5kg x 20-30 reps' },
      { id: 'ex_bbp', name: 'Barbell Bench Press', type: 'weight_reps', targetSets: 3, targetReps: '8-10', previous: '50-55kg x 8-10 reps' },
      { id: 'ex_dir', name: 'Dumbbell Incline Row', type: 'weight_reps', targetSets: 3, targetReps: '15-20', previous: '12.5kg x 15-20 reps' },
      { id: 'ex_bor', name: 'Bent Over Row', type: 'weight_reps', targetSets: 3, targetReps: '20-30', previous: '12.5kg x 20-30 reps' },
    ],
  },
  {
    id: 'event_lore_01',
    title: 'ARCHIVE DIVE: The First Operator',
    from: 'THE_LIBRARIAN',
    description: '// Fragments of an old log file have surfaced. They appear to belong to Operator #000001. Executing the original diagnostic routine may unlock the rest of the file. [REDACTED]',
    specialCondition: 'Unlock [REDACTED] with a DECRYPTION_KEY to reveal a piece of lore about the AEGIS system\'s origin.',
    reward: '1500 DATA_PACKETS',
    xp: 1500,
    cCredBonus: 50,
    exercises: [
      { id: 'ex_pushups', name: 'Push-ups', type: 'reps_only', targetSets: 3, targetReps: '15-20', previous: 'Body-weight x 15-20 reps' },
      { id: 'ex_bw_squat', name: 'Bodyweight Squat', type: 'reps_only', targetSets: 3, targetReps: '20-25', previous: 'Body-weight x 20-25 reps' },
      { id: 'ex_plank', name: 'Plank', type: 'timed', targetSets: 3, targetReps: '30s', previous: '30s hold' },
    ],
  },
];

const marketItems = [
  { id: 'item_gf', name: 'Glitch_Filter.pak', cost: 150, description: '// A single-use data packet that purges one system integrity fault from your log. (Prevents one missed day from breaking a consistency streak).' },
  { id: 'item_oc', name: 'Overclock.exe', cost: 250, description: '// Temporarily overclocks your data port for one directive. Earn 1.5x DATA_PACKETS (XP) from all logged sets in your next session.' },
  { id: 'item_pa', name: 'Predictive_Analysis.scr', cost: 100, description: '// Before your next directive, this script will highlight one "critical sub-routine." Earn 2x C-Creds from any PERFORMANCE_BREAKTHROUGH on that specific exercise.' },
  { id: 'item_dk_v1', name: 'DECRYPTION_KEY_V1', cost: 75, description: '// A standard issue decryption key. Capable of unlocking most Tier-1 encrypted data fragments found on the //MSG_BOARD.' },
  { id: 'schematic_chassis_green', name: 'CHASSIS_CHROMA_PACK [TERMINAL]', cost: 500, description: '// Unlocks a new color theme for the AEGIS interface, matching the classic green phosphor of a VT100 terminal.' },
  { id: 'schematic_chassis_amber', name: 'CHASSIS_CHROMA_PACK [VINTAGE]', cost: 500, description: '// Unlocks a new color theme for the AEGIS interface, using the amber monochrome of early network systems.' },
  { id: 'schematic_tag_corrupt', name: 'CORRUPTED_HOLOTAG', cost: 1000, description: '// A glitched, unstable holotag for your Operator Profile, rendered in flickering ASCII.' },
];

window.initialOperatorData = initialOperatorData;
window.missionsData = missionsData;
window.marketItems = marketItems;
