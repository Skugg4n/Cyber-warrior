function FirewallMinigame({ timeLeft, onGameEnd }) {
    const width = 15;
    const height = 10;
    const [playerX, setPlayerX] = React.useState(Math.floor(width / 2));
    const [shots, setShots] = React.useState([]); // {x,y}
    const [enemies, setEnemies] = React.useState([]); // {x,y}
    const [score, setScore] = React.useState(0);

    React.useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'ArrowLeft') {
                setPlayerX(x => Math.max(0, x - 1));
            } else if (e.key === 'ArrowRight') {
                setPlayerX(x => Math.min(width - 1, x + 1));
            } else if (e.key === ' ') {
                setShots(s => [...s, { x: playerX, y: height - 2 }]);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [playerX]);

    React.useEffect(() => {
        const moveInterval = setInterval(() => {
            setShots(s => s.map(p => ({ ...p, y: p.y - 1 })).filter(p => p.y >= 0));
            setEnemies(es => es.map(e => ({ ...e, y: e.y + 1 })).filter(e => e.y < height - 1));
        }, 150);
        return () => clearInterval(moveInterval);
    }, []);

    React.useEffect(() => {
        const spawnInterval = setInterval(() => {
            setEnemies(es => [...es, { x: Math.floor(Math.random() * width), y: 0 }]);
        }, 700);
        return () => clearInterval(spawnInterval);
    }, []);

    React.useEffect(() => {
        setShots(s => s.filter(p => {
            const hitIndex = enemies.findIndex(e => e.x === p.x && e.y === p.y);
            if (hitIndex !== -1) {
                setEnemies(es => es.filter((_, i) => i !== hitIndex));
                setScore(sc => sc + 10);
                return false;
            }
            return true;
        }));
    }, [shots, enemies]);

    React.useEffect(() => {
        if (enemies.some(e => e.y >= height - 1)) {
            onGameEnd(score);
        }
    }, [enemies, onGameEnd, score]);

    React.useEffect(() => {
        if (timeLeft <= 0) onGameEnd(score);
    }, [timeLeft, onGameEnd, score]);

    const rows = [];
    for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
            if (playerX === x && y === height - 1) row += '^';
            else if (shots.some(s => s.x === x && s.y === y)) row += '|';
            else if (enemies.some(e => e.x === x && e.y === y)) row += '*';
            else row += '.';
        }
        rows.push(row);
    }

    return (
        <div className="bg-black border border-green-500 p-2 mt-2 text-center text-xs text-green-400 font-mono">
            <pre className="leading-none">{rows.join('\n')}</pre>
            <p>SCORE: {score}</p>
        </div>
    );
}

window.FirewallMinigame = FirewallMinigame;
