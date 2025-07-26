function DefragMinigame({ timeLeft, onGameEnd }) {
    const handleDefrag = () => {
        const simulatedScore = 50; // A fixed value for now
        onGameEnd(simulatedScore);
    };

    return (
        <div className="bg-black border border-green-500 p-2 mt-2 text-center">
            <p>//DEFRAG ROUTINE STANDING BY...</p>
            <p>TIME REMAINING: {timeLeft}s</p>
            <button
                onClick={handleDefrag}
                className="bg-green-700 p-1 mt-2 text-sm w-full"
            >
                [RUN DEFRAG: +5 C-Creds]
            </button>
        </div>
    );
}

window.DefragMinigame = DefragMinigame;
