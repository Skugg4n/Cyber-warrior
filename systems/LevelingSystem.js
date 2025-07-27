(function(global){
  function calculateXpForSet(set){
    return Math.floor((set.reps || 0) * (set.weight || 1) * 0.5);
  }
  function checkForLevelUp(operator){
    let updated = { ...operator };
    while(updated.xp >= updated.xpToNextLevel){
      updated.xp -= updated.xpToNextLevel;
      updated.level += 1;
      updated.xpToNextLevel = Math.floor(updated.xpToNextLevel * 1.5);
      updated.augments = [...(updated.augments||[]), `System Upgrade v${updated.level}`];
    }
    return updated;
  }
  global.LevelingSystem = { calculateXpForSet, checkForLevelUp };
})(window);
