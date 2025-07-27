// The unified app is executed directly in the browser without a
// bundler. React and ReactDOM are loaded via CDN which exposes them
// as globals. Additional components are included through separate
// Babel scripts and attached to `window`.
const { useState, useEffect, createContext, useContext } = React;
const { render } = ReactDOM;
const WorkoutLoggerApex = window.WorkoutLoggerApex;
const AwakeningEvent = window.AwakeningEvent;

// Use the existing global databases provided by the project
const sleeperRoutines = window.sleeperRoutines || [];
const aegisDirectives = window.missionsData || [];

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [hasAwakened, setHasAwakened] = useState(() => {
    return localStorage.getItem('aegis_hasAwakened') === 'true';
  });

  const triggerAwakening = () => setHasAwakened(true);
  const resetToSleeper = () => setHasAwakened(false);

  useEffect(() => {
    localStorage.setItem('aegis_hasAwakened', hasAwakened);
  }, [hasAwakened]);

  return (
    <AppContext.Provider value={{ hasAwakened, triggerAwakening, resetToSleeper }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

// Helper icons used in the UI
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

// Debug menu to toggle awakening state
const DebugMenu = ({ onForceAwakening }) => {
  const { resetToSleeper } = useAppContext();
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 bg-opacity-80 p-2 rounded border border-gray-600 text-white text-xs z-50">
      <h4 className="font-bold text-center">Debug</h4>
      <button onClick={onForceAwakening} className="block w-full text-left p-1 hover:bg-gray-700">Force Awakening</button>
      <button onClick={resetToSleeper} className="block w-full text-left p-1 hover:bg-gray-700">Reset to Sleeper</button>
    </div>
  );
};

// --- SLEEPER APP COMPONENTS ---
const SleeperHomeScreen = ({ onStart }) => (
  <div className="p-4">
    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
    <p className="text-gray-400 mb-6">Your next scheduled workout is ready.</p>
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">{sleeperRoutines[0]?.name}</h2>
      <button onClick={onStart} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg">Start Workout</button>
    </div>
  </div>
);

const SleeperApp = ({ onStartAwakening }) => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeRoutine, setActiveRoutine] = useState(null);

  const NavButton = ({ screen, icon }) => (
    <button onClick={() => setActiveScreen(screen)} className={`p-2 rounded-lg ${activeScreen === screen ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'}`}>{icon}</button>
  );

  const handleStart = () => {
    setActiveRoutine(sleeperRoutines[0]);
    setActiveScreen('logger');
  };

  const renderContent = () => {
    if (activeScreen === 'logger' && activeRoutine) {
      const directive = { title: activeRoutine.name, exercises: activeRoutine.exercises };
      return (
        <WorkoutLoggerApex
          directive={directive}
          stats={{ time: 0, volume: 0, cCreds: 0 }}
          onHalt={() => setActiveScreen('home')}
        />
      );
    }
    if (activeScreen === 'routines') {
      return <div className="p-4"><h1 className="text-3xl font-bold text-white">Routines</h1></div>;
    }
    return <SleeperHomeScreen onStart={handleStart} />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-gray-200 rounded-lg shadow-lg font-sans flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
      <div className="flex-shrink-0 border-t border-gray-800 px-4 py-2">
        <div className="mb-2">
          <p className="text-xs text-center text-gray-500 mb-1 tracking-widest">RESONANCE SYNC</p>
          <div className="w-full bg-gray-700 h-px"><div className="bg-white h-px" style={{ width: '15%' }}></div></div>
        </div>
        <div className="flex justify-around items-center">
          <NavButton screen="home" icon={<HomeIcon />} />
          <NavButton screen="routines" icon={<ClipboardListIcon />} />
        </div>
      </div>
    </div>
  );
};

// --- AEGIS APP COMPONENTS ---
const AegisHeader = ({ onNavigate }) => (
  <div className="border-2 border-green-500 p-2 font-mono text-green-400 bg-black">
    <div className="flex justify-between items-center border-b-2 border-green-500 pb-1 mb-1">
      <h1 className="text-lg font-bold">[A.E.G.I.S] PROTOCOL</h1>
      <div className="text-xs text-right">
        <div>OPERATOR ID: #TEST</div>
        <div>LEVEL: 1</div>
      </div>
    </div>
    <div className="flex justify-around text-xs">
      <button onClick={() => onNavigate('board')} className="hover:bg-green-500 hover:text-black p-1">[1] //MSG_BOARD</button>
      <button onClick={() => onNavigate('market')} className="hover:bg-green-500 hover:text-black p-1">[2] //BLACK_MARKET</button>
    </div>
  </div>
);

const AegisMissionBoard = ({ onAccept }) => (
  <div className="p-2 md:p-4 font-mono text-green-400">
    <h2 className="text-lg font-bold mb-2">{'>'} INCOMING DIRECTIVES...</h2>
    <div className="space-y-4">
      {aegisDirectives.map(mission => (
        <div key={mission.id} className="border border-green-500 p-2 bg-black/50">
          <p className="font-bold">{mission.title}</p>
          <p className="text-xs text-gray-400 mb-2">FROM: {mission.from}</p>
          <p className="text-sm mb-2 text-gray-300">{mission.description}</p>
          <button onClick={() => onAccept(mission)} className="bg-green-600 text-black font-bold py-1 px-3 hover:bg-green-400 border border-green-400">ACCEPT</button>
        </div>
      ))}
    </div>
  </div>
);

const AegisBlackMarket = ({ onBack }) => (
  <div className="p-2 md:p-4 font-mono text-green-400">
    <h2 className="text-lg font-bold mb-2">//BLACK_MARKET - Encrypted Node</h2>
    <div className="border border-green-500 p-2 bg-black/50 space-y-2">
      {window.marketItems.map(item => (
        <div key={item.id} className="border-b border-gray-700 pb-2">
          <p>{'> '} {item.name} [COST: {item.cost}c]</p>
          <p className="text-xs text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
    <button onClick={onBack} className="mt-4 bg-green-600 text-black font-bold py-1 px-3 hover:bg-green-400 border border-green-400">&lt; RETURN TO BOARD</button>
  </div>
);

const AegisApp = () => {
  const [screen, setScreen] = useState('board');
  const [activeMission, setActiveMission] = useState(null);

  const handleAccept = (mission) => {
    setActiveMission(mission);
    setScreen('logger');
  };

  const handleHalt = () => {
    setActiveMission(null);
    setScreen('board');
  };

  const renderContent = () => {
    if (screen === 'logger' && activeMission) {
      return (
        <WorkoutLoggerApex
          directive={activeMission}
          stats={{ time: 0, volume: 0, cCreds: 0 }}
          onHalt={handleHalt}
        />
      );
    }
    if (screen === 'market') {
      return <AegisBlackMarket onBack={() => setScreen('board')} />;
    }
    return <AegisMissionBoard onAccept={handleAccept} />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black text-green-400 rounded-lg shadow-lg font-mono flex flex-col">
      <AegisHeader onNavigate={setScreen} />
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

// --- MAIN APP SHELL ---
const AppContent = () => {
  const { hasAwakened, triggerAwakening } = useAppContext();
  const [isAwakening, setIsAwakening] = useState(false);

  const startAwakening = () => setIsAwakening(true);
  const handleAwakeningComplete = () => {
    setIsAwakening(false);
    triggerAwakening();
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      {isAwakening && <AwakeningEvent onComplete={handleAwakeningComplete} />}
      {!isAwakening && (
        hasAwakened ? <AegisApp /> : <SleeperApp onStartAwakening={startAwakening} />
      )}
      {!isAwakening && <DebugMenu onForceAwakening={startAwakening} />}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

render(<App />, document.getElementById('root'));
window.App = App;
