(function(global){
  function calculateBaseline(history, currentBaseline){
    if(currentBaseline){
      return currentBaseline;
    }
    if(!Array.isArray(history) || history.length < 5){
      return null;
    }
    const lastFive = history.slice(-5);
    const values = lastFive.map(h => {
      const vol = h.summary.totalVolume || 0;
      const minutes = (h.summary.timeElapsed || 0) / 60;
      return minutes > 0 ? vol / minutes : 0;
    });
    const avg = values.reduce((a,b)=>a+b,0) / values.length;
    return avg;
  }

  function calculateChargeGained(workoutStats, baseline, injectorMultiplier){
    const perf = workoutStats.volume / workoutStats.durationInMinutes;
    const normalized = perf / (baseline || 1);
    const chargeGained = normalized * 100 * injectorMultiplier;
    return chargeGained;
  }

  function calculateOfflineProgress(engineState){
    const now = Date.now();
    const last = engineState.lastUpdated || now;
    const hoursPassed = (now - last) / 3600000;
    const chargeDecayed = hoursPassed * engineState.components.field.decayRate;
    const newCharge = Math.max(0, engineState.charge - chargeDecayed);
    const cCredsGenerated = hoursPassed * (engineState.charge * engineState.components.resonator.multiplier);
    engineState.lastUpdated = now;
    return { newCharge, cCredsGenerated };
  }

  global.EngineSystem = { calculateBaseline, calculateChargeGained, calculateOfflineProgress };
})(window);

