const DefragMinigame = ({ timeLeft, onGameEnd }) => {
    const canvasRef = React.useRef(null);
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        return () => {
            onGameEnd(score);
        };
    }, [score, onGameEnd]);

    return (
        <div className="bg-black border border-green-500 p-4 mt-2 text-center">
            <p>//DEFRAG MINIGAME ACTIVE</p>
            <p>SCORE: {score}</p>
            <p>TIME LEFT: {timeLeft}s</p>
            <p className="text-xs text-gray-500 mt-2">(Programmer: Implement canvas and game logic here)</p>
            <button onClick={() => setScore(s => s + 10)} className="bg-gray-600 p-1 mt-1">SIMULATE SCORE</button>
        </div>
    );
};
