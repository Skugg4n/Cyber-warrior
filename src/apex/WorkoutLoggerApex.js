// This component renders the workout logger used by both the
// Sleeper and AEGIS interfaces. It relies on the global React
// instance provided in index.html so we don't import React as a
// module. The component is attached to the `window` object at the
// bottom of the file for use in inline Babel scripts.
const { useState, useEffect } = React;

// Parent component manages all logged sets across exercises.
function WorkoutLoggerApex({ directive, stats, onHalt }) {
  // loggedSets: { [exercise.id]: Array<{ set: number, weight: number, reps: number, time: number }> }
  const [loggedSets, setLoggedSets] = useState({});
  const [expandedExerciseId, setExpandedExerciseId] = useState(null);

  const toggleExercise = (id) => {
    setExpandedExerciseId(prev => (prev === id ? null : id));
  };

  const handleToggleSet = (exerciseId, setNumber, data) => {
    setLoggedSets(prev => {
      const exerciseSets = prev[exerciseId] ? [...prev[exerciseId]] : [];
      const existingIndex = exerciseSets.findIndex(s => s.set === setNumber);
      if (existingIndex >= 0) {
        exerciseSets.splice(existingIndex, 1);
      } else {
        exerciseSets.push({ set: setNumber, ...data });
      }
      return { ...prev, [exerciseId]: exerciseSets };
    });
  };

  const getModifierSymbol = (modifier) => {
    if (modifier === 'unilateral') return <span className="text-cyan-400 text-xs ml-2">[⇋]</span>;
    if (modifier === 'x2') return <span className="text-cyan-400 text-xs ml-2">[x2]</span>;
    return null;
  };

  return (
    <div className="w-full max-w-lg bg-black border-2 border-green-500 font-mono text-green-400 p-2" onContextMenu={(e)=>e.preventDefault()}>
      <div className="border-b-2 border-green-700 pb-2 mb-2">
        <h2 className="text-lg font-bold text-red-500 animate-pulse">{'>'}! ACTIVE DIRECTIVE: {directive.title}</h2>
        <div className="text-xs flex justify-between text-white">
          <span>TIME: {stats.time}</span>
          <span>VOL: {stats.volume}</span>
          <span>C-Creds: {stats.cCreds}c</span>
        </div>
      </div>
      <div className="space-y-1">
        {directive.exercises.map(ex => {
          const exSets = loggedSets[ex.id] || [];
          const isComplete = exSets.length >= ex.targetSets;
          const isExpanded = expandedExerciseId === ex.id;
          return (
            <div key={ex.id} className="border border-gray-800">
              <button onClick={() => toggleExercise(ex.id)} className="w-full text-left p-2 hover:bg-gray-800 flex justify-between items-center">
                <span className="text-base text-white flex items-center">
                  {'>'} {ex.name} {getModifierSymbol(ex.modifier)}
                </span>
                <div className="flex items-center space-x-4">
                  <span className={`text-xs font-bold ${isComplete ? 'text-green-400' : 'text-gray-500'}`}>{exSets.length}/{ex.targetSets} {isComplete ? '[OK]' : '[..]'}</span>
                  <span className="text-xl">{isExpanded ? '[-]' : '[+]'}</span>
                </div>
              </button>
              {isExpanded && (
                <SetLoggerDropdown
                  exercise={ex}
                  loggedSets={exSets}
                  onToggle={(setNumber, data) => handleToggleSet(ex.id, setNumber, data)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="border-t-2 border-green-700 pt-2 mt-2">
        <button
          onClick={onHalt}
          className="w-full bg-red-800 text-white font-bold py-2 px-3 border border-red-700 hover:bg-red-700"
        >
          [HALT DIRECTIVE]
        </button>
      </div>
    </div>
  );
}

function SetLoggerDropdown({ exercise, loggedSets, onToggle }) {
  const rowData = Array.from({ length: exercise.targetSets }, (_, i) => i + 1);
  return (
    <div className="bg-black/50 p-2 md:p-4">
      <table className="w-full text-xs text-center table-fixed">
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '19%' }} />
        </colgroup>
        <thead>
          <tr className="text-green-400">
            <th className="p-1 font-normal">SET</th>
            <th className="p-1 font-normal">PREVIOUS</th>
            <th className="p-1 font-normal" colSpan={exercise.type === 'timed' || exercise.type === 'reps_only' ? 2 : 1}>{exercise.type === 'timed' ? 'TIME (S)' : 'WEIGHT'}</th>
            {exercise.type === 'weight_reps' && <th className="p-1 font-normal">REPS</th>}
            <th className="p-1"></th>
          </tr>
        </thead>
        <tbody>
          {rowData.map(setNumber => {
            const isLogged = loggedSets.some(s => s.set === setNumber);
            const data = loggedSets.find(s => s.set === setNumber) || {};
            return (
              <SetRow
                key={setNumber}
                setNumber={setNumber}
                exercise={exercise}
                isLogged={isLogged}
                defaults={data}
                onToggle={(info) => onToggle(setNumber, info)}
              />
            );
          })}
        </tbody>
      </table>
      <div className="border-t border-green-800 pt-2 mt-3 text-xs text-gray-500 text-center">
        <p>LAST: 2025-07-24 // BEST SET: 12.5kg x 22 reps</p>
      </div>
    </div>
  );
}

function SetRow({ setNumber, exercise, isLogged, defaults, onToggle }) {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const prevString = exercise.previous[setNumber - 1] || '';
    if (exercise.type === 'weight_reps') {
      const match = prevString.match(/(\d+\.?\d*)kg x (\d+)/);
      if (match) {
        setWeight(match[1]);
        setReps(match[2]);
      }
    } else if (exercise.type === 'timed') {
      const match = prevString.match(/(\d+)/);
      if (match) setTime(match[1]);
    }
  }, [exercise, setNumber]);

  const handleClick = () => {
    if (isLogged) {
      onToggle({});
    } else {
      const data = exercise.type === 'timed'
        ? { time: parseInt(time, 10) }
        : { weight: parseFloat(weight), reps: parseInt(reps, 10) };
      onToggle(data);
    }
  };

  const renderInputs = () => {
    if (isLogged) {
      if (exercise.type === 'timed') return <td colSpan="2" className="p-1 text-white">{time}s</td>;
      return (
        <>
          <td className="p-1 text-white">{weight}</td>
          <td className="p-1 text-white">{reps}</td>
        </>
      );
    }
    switch (exercise.type) {
      case 'timed':
        return (
          <td colSpan="2" className="p-1">
            <input type="number" value={time} onChange={e => setTime(e.target.value)} className="bg-black border border-green-600 text-white w-full text-center p-1" />
          </td>
        );
      case 'reps_only':
        return (
          <td colSpan="2" className="p-1">
            <input type="number" value={reps} onChange={e => setReps(e.target.value)} className="bg-black border border-green-600 text-white w-full text-center p-1" />
          </td>
        );
      default:
        return (
          <>
            <td className="p-1">
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="bg-black border border-green-600 text-white w-full text-center p-1" />
            </td>
            <td className="p-1">
              <input type="number" value={reps} onChange={e => setReps(e.target.value)} className="bg-black border border-green-600 text-white w-full text-center p-1" />
            </td>
          </>
        );
    }
  };

  return (
    <tr className={isLogged ? 'text-gray-500' : 'bg-green-900/50'}>
      <td className="p-1 text-white">{setNumber}</td>
      <td className="p-1 text-gray-400">{exercise.previous[setNumber - 1] || '-'}</td>
      {renderInputs()}
      <td className="p-1">
        <button
          onClick={handleClick}
          className={`border w-full h-full font-bold ${isLogged ? 'border-green-500 bg-green-500 text-black' : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-black'}`}
        >
          {isLogged ? '✔' : 'LOG'}
        </button>
      </td>
    </tr>
  );
}

window.WorkoutLoggerApex = WorkoutLoggerApex;
