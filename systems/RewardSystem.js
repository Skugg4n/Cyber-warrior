(function(global){
  function awardFlawlessExecution(operator, mission){
    const bonus = mission && mission.cCredBonus ? mission.cCredBonus : 50;
    return { ...operator, cCreds: operator.cCreds + bonus };
  }
  function rollDataSpike(operator){
    const roll = Math.random();
    let updated = { ...operator };
    let message = null;
    if(roll < 0.05){
      updated.cCreds += 10;
      message = '// DATA SPIKE DETECTED! +10 C-Creds';
    }
    return { updated, message };
  }

  function checkStreakBonus(operator){
    const milestones = {7: 20, 30: 50, 100: 150};
    const bonus = milestones[operator.currentStreak] || 0;
    if(bonus > 0){
      return {
        updated: { ...operator, cCreds: operator.cCreds + bonus },
        message: `// STREAK BONUS ACHIEVED! +${bonus} C-Creds`
      };
    }
    return { updated: operator, message: null };
  }
  global.RewardSystem = { awardFlawlessExecution, rollDataSpike, checkStreakBonus };
})(window);
