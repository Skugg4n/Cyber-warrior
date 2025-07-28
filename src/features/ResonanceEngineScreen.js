const { useState } = React;

function ResonanceEngineScreen({ operator, onUpgrade, onNav }) {
  const [showUpgrades, setShowUpgrades] = useState(false);
  const { engine } = operator;

  const outputRate = engine.charge * engine.components.resonator.multiplier;

  const getCost = (comp) => (engine.components[comp].level + 1) * 100;

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg font-bold mb-2 text-green-400">&gt; //RESONANCE_ENGINE</h2>
      <div className="border border-green-500 p-2 bg-black/50 space-y-2">
        <div>CHARGE LEVEL: {Math.floor(engine.charge)} / {engine.maxCharge}</div>
        <div className="w-full bg-gray-700 h-2">
          <div className="bg-green-500 h-full" style={{width:`${(engine.charge/engine.maxCharge)*100}%`}}></div>
        </div>
        <div>DECAY RATE: -{engine.components.field.decayRate}/hr (Lvl {engine.components.field.level} Field)</div>
        <div>CURRENT OUTPUT: {outputRate.toFixed(1)} C-Creds / hr</div>
        <div className="text-xs text-gray-400">(Charge * {engine.components.resonator.multiplier} from Lvl {engine.components.resonator.level} Resonator)</div>
        <button onClick={() => setShowUpgrades(s => !s)} className="border border-green-500 px-2 py-1">
          {showUpgrades ? '[HIDE UPGRADES]' : '[VIEW COMPONENT UPGRADES]'}
        </button>
        {showUpgrades && (
          <div className="mt-2 space-y-2">
            {Object.keys(engine.components).map(key => {
              const comp = engine.components[key];
              const cost = getCost(key);
              return (
                <div key={key} className="border border-green-700 p-2">
                  <p className="text-green-400 capitalize">{key} - Lvl {comp.level}</p>
                  <p className="text-sm">Cost: {cost} C-Creds</p>
                  <button onClick={() => onUpgrade(key, cost)} disabled={operator.cCreds < cost} className="mt-1 bg-green-600 text-black px-2 py-1 border border-green-400 disabled:opacity-50">UPGRADE</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <button onClick={() => onNav('board')} className="mt-4 bg-green-600 text-black font-bold py-1 px-3 hover:bg-green-400 border border-green-400">&lt; RETURN TO BOARD</button>
    </div>
  );
}

window.ResonanceEngineScreen = ResonanceEngineScreen;

