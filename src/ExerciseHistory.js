// Displays historical stats for a specific exercise while logging.
// History is an array of previous workout sessions saved in localStorage.
function ExerciseHistory({ exerciseId, history }) {
    // Flatten history to just the sets for this exercise with their timestamps
    const sets = React.useMemo(() => {
        let result = [];
        history.forEach(entry => {
            const setsForEx = entry.sets[exerciseId];
            if (setsForEx) {
                setsForEx.forEach(s => result.push({ ...s, date: entry.timestamp }));
            }
        });
        return result;
    }, [history, exerciseId]);

    if (sets.length === 0) {
        return (
            <div className="text-xs text-gray-400">// No prior data</div>
        );
    }

    // Compute last session date and best overall set
    const lastDate = new Date(Math.max(...sets.map(s => s.date)));
    const formattedDate = lastDate.toISOString().slice(0,10);

    const bestSet = sets.reduce((best, curr) => {
        if (!best) return curr;
        const bestVolume = (best.weight || 0) * best.reps;
        const currVolume = (curr.weight || 0) * curr.reps;
        return currVolume > bestVolume ? curr : best;
    }, null);

    return (
        <div className="bg-gray-800 text-green-400 p-1 mb-1 text-xs">
            <p>LAST LOGGED: {formattedDate}</p>
            <p>BEST SET: {bestSet.weight ? `${bestSet.weight}kg x ${bestSet.reps} reps` : `${bestSet.reps} reps`}</p>
        </div>
    );
}

window.ExerciseHistory = ExerciseHistory;
