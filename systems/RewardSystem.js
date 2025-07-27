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
  global.RewardSystem = { awardFlawlessExecution, rollDataSpike };
})(window);
