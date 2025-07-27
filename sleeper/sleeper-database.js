// =================================================================
// AEGIS "SLEEPER" APP - CONTENT DATABASE v1.0
// This file contains all static data for the initial, non-gamified app.
// It uses clean, user-friendly terminology.
// =================================================================

window.sleeperRoutines = [
  {
    id: 'routine_push_a',
    name: 'Push Day A',
    exerciseCount: 7,
    estimatedTime: "45 min",
    exercises: [
      { id: 'ex_dbp', name: 'Dumbbell Bench Press', type: 'weight_reps', targetSets: 3, previous: ['12.5kg x 22', '12.5kg x 20', '12.5kg x 18'] },
      { id: 'ex_dssp', name: 'Dumbbell Seated Shoulder Press', type: 'weight_reps', targetSets: 3, previous: ['10kg x 12', '10kg x 11', '10kg x 10'] },
      { id: 'ex_dbalr', name: 'Dumbbell Bent Arm Lateral Raise', type: 'weight_reps', targetSets: 3, previous: ['8kg x 15', '8kg x 15', '8kg x 14'] },
      { id: 'ex_dk', name: 'Dumbbell Kickback', type: 'weight_reps', targetSets: 4, previous: ['8kg x 12', '8kg x 12', '8kg x 10', '8kg x 10'] },
      { id: 'ex_dpu', name: 'Deep Push Up (on DBs)', type: 'reps_only', targetSets: 3, previous: ['15 reps', '12 reps', '10 reps'] },
      { id: 'ex_bbp', name: 'Barbell Bench Press', type: 'weight_reps', targetSets: 3, previous: ['50kg x 8', '50kg x 8', '55kg x 6'] },
      { id: 'ex_kte', name: 'Kettlebell Triceps Extension', type: 'weight_reps', targetSets: 2, previous: ['12kg x 12', '12kg x 10'] },
    ],
  },
  {
    id: 'routine_pull_a',
    name: 'Pull Day A',
    exerciseCount: 5,
    estimatedTime: "40 min",
    exercises: [
        { id: 'ex_dir', name: 'Dumbbell Incline Row', type: 'weight_reps', targetSets: 3, previous: ['12.5kg x 18', '12.5kg x 16', '12.5kg x 15'] },
        { id: 'ex_bor', name: 'Bent Over Row', type: 'weight_reps', targetSets: 3, previous: ['12.5kg x 25', '12.5kg x 22', '12.5kg x 20'] },
        { id: 'ex_dashc', name: 'Hammer Curl', type: 'weight_reps', targetSets: 4, previous: ['12.5kg x 18', '12.5kg x 16', '12.5kg x 15', '12.5kg x 15'] },
        { id: 'ex_ds', name: 'Dumbbell Shrug', type: 'weight_reps', targetSets: 3, previous: ['12.5kg x 35', '12.5kg x 30', '12.5kg x 30'] },
        { id: 'ex_bor_alt', name: 'Bent-Over Row (Alt)', type: 'weight_reps', targetSets: 3, previous: ['12.5kg x 22', '12.5kg x 20', '12.5kg x 20'] },
    ],
  },
  {
    id: 'routine_legs_core_a',
    name: 'Legs & Core A',
    exerciseCount: 8,
    estimatedTime: "60 min",
    exercises: [
        { id: 'ex_fs', name: 'Full Squat (barbell)', type: 'weight_reps', targetSets: 3, previous: ['50kg x 10', '50kg x 9', '50kg x 8'] },
        { id: 'ex_dl', name: 'Deadlift', type: 'weight_reps', targetSets: 3, previous: ['50kg x 16', '50kg x 15', '50kg x 15'] },
        { id: 'ex_gs', name: 'Goblet Squat', type: 'weight_reps', targetSets: 3, previous: ['16kg x 18', '16kg x 16', '16kg x 15'] },
        { id: 'ex_kbs', name: 'Kettlebell Swing', type: 'weight_reps', targetSets: 3, previous: ['16kg x 20', '16kg x 20', '16kg x 20'] },
        { id: 'ex_wr', name: 'Wheel Rollout', type: 'reps_only', targetSets: 3, previous: ['12 reps', '10 reps', '10 reps'] },
        { id: 'ex_hlr', name: 'Hanging Leg Raise', type: 'reps_only', targetSets: 3, previous: ['10 reps', '10 reps', '8 reps'] },
        { id: 'ex_su', name: 'Sit-Up', type: 'reps_only', targetSets: 3, previous: ['30 reps', '30 reps', '25 reps'] },
        { id: 'ex_krt', name: 'Kettlebell Russian Twist', type: 'weight_reps', targetSets: 3, previous: ['16kg x 20', '16kg x 20', '16kg x 18'] },
    ],
  },
  {
    id: 'routine_core_short',
    name: 'Quick Core Burn',
    exerciseCount: 2,
    estimatedTime: "10 min",
    exercises: [
        { id: 'ex_wr', name: 'Wheel Rollout', type: 'reps_only', targetSets: 3, previous: ['12 reps', '10 reps', '10 reps'] },
        { id: 'ex_krt', name: 'Kettlebell Russian Twist', type: 'weight_reps', targetSets: 3, previous: ['16kg x 20', '16kg x 20', '16kg x 18'] },
    ],
  },
];

