export const mockDirective = {
  title: 'SYSTEM DIRECTIVE: PUSH PROTOCOL',
  exercises: [
    { id: 'ex_dbp', name: 'Dumbbell Bench Press', type: 'weight_reps', targetSets: 3, previous: ['12.5kg x 22', '12.5kg x 20', '12.5kg x 18'], modifier: 'x2' },
    { id: 'ex_dssp', name: 'Dumbbell Seated Shoulder Press', type: 'weight_reps', targetSets: 3, previous: ['10kg x 12', '10kg x 11', '10kg x 10'], modifier: 'x2' },
    { id: 'ex_dk', name: 'Dumbbell Kickback', type: 'weight_reps', targetSets: 4, previous: ['8kg x 12', '8kg x 12', '8kg x 10', '8kg x 10'], modifier: 'unilateral' },
    { id: 'ex_plank', name: 'Plank', type: 'timed', targetSets: 3, previous: ['60s', '50s', '45s'] },
  ],
};

export const mockSessionStats = {
  time: '00:15:32',
  volume: '4500kg',
  cCreds: 15,
};
