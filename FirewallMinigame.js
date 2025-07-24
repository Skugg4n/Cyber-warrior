const FirewallMinigame = ({ timeLeft, onGameEnd }) => {
    const canvasRef = React.useRef(null);
    const [score, setScore] = React.useState(0);
    const playerRef = React.useRef({ x: 150, y: 280, char: '^' });
    const projectilesRef = React.useRef([]);
    const enemiesRef = React.useRef([]);
    const keysRef = React.useRef({ left: false, right: false, fire: false });
    const cooldownRef = React.useRef(0);
    const gameOverRef = React.useRef(false);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.font = '16px monospace';
        let animationFrameId;
        let spawnCounter = 0;

        const handleKeyDown = (e) => {
            if (e.code === 'ArrowLeft') keysRef.current.left = true;
            if (e.code === 'ArrowRight') keysRef.current.right = true;
            if (e.code === 'Space') keysRef.current.fire = true;
        };
        const handleKeyUp = (e) => {
            if (e.code === 'ArrowLeft') keysRef.current.left = false;
            if (e.code === 'ArrowRight') keysRef.current.right = false;
            if (e.code === 'Space') keysRef.current.fire = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const spawnEnemy = () => {
            const r = Math.random();
            if (r < 0.33) enemiesRef.current.push({ x: Math.random()*290, y: -10, char: '#', speed: 1, hp: 1 });
            else if (r < 0.66) enemiesRef.current.push({ x: Math.random()*290, y: -10, char: '*', speed: 2, hp: 1 });
            else enemiesRef.current.push({ x: Math.random()*290, y: -10, char: '@', speed: 1, hp: 2 });
        };

        const gameLoop = () => {
            if (gameOverRef.current) return;
            ctx.clearRect(0, 0, 300, 300);
            ctx.fillStyle = '#00FF00';

            const player = playerRef.current;
            if (keysRef.current.left && player.x > 0) player.x -= 3;
            if (keysRef.current.right && player.x < 290) player.x += 3;
            if (keysRef.current.fire && cooldownRef.current <= 0) {
                projectilesRef.current.push({ x: player.x + 3, y: player.y - 10, speed: 4 });
                cooldownRef.current = 15;
            }
            if (cooldownRef.current > 0) cooldownRef.current -= 1;

            ctx.fillText(player.char, player.x, player.y);

            spawnCounter++;
            if (spawnCounter % 40 === 0) spawnEnemy();

            projectilesRef.current.forEach(p => {
                p.y -= p.speed;
                ctx.fillText('|', p.x, p.y);
            });
            projectilesRef.current = projectilesRef.current.filter(p => p.y > -10);

            enemiesRef.current.forEach(e => {
                e.y += e.speed;
                ctx.fillText(e.char, e.x, e.y);
            });

            enemiesRef.current.forEach((e, ei) => {
                projectilesRef.current.forEach((p, pi) => {
                    if (Math.abs(p.x - e.x) < 8 && Math.abs(p.y - e.y) < 16) {
                        e.hp -= 1;
                        projectilesRef.current.splice(pi, 1);
                        if (e.hp <= 0) {
                            enemiesRef.current.splice(ei, 1);
                            setScore(s => s + 10);
                        }
                    }
                });
                if (Math.abs(e.x - player.x) < 10 && Math.abs(e.y - player.y) < 16) {
                    gameOverRef.current = true;
                    onGameEnd(score);
                    return;
                }
            });

            enemiesRef.current = enemiesRef.current.filter(e => e.y < 310);

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (!gameOverRef.current) onGameEnd(score);
        };
    }, [onGameEnd, score]);

    const btnDown = (key) => { keysRef.current[key] = true; };
    const btnUp = (key) => { keysRef.current[key] = false; };

    return (
        <div>
            <canvas ref={canvasRef} width="300" height="300" className="bg-black border border-green-500 w-full" />
            <div className="flex justify-around mt-2 md:hidden">
                <button className="px-2 py-1 bg-green-800" onMouseDown={() => btnDown('left')} onMouseUp={() => btnUp('left')} onTouchStart={() => btnDown('left')} onTouchEnd={() => btnUp('left')}>&lt;</button>
                <button className="px-2 py-1 bg-green-800" onMouseDown={() => btnDown('fire')} onMouseUp={() => btnUp('fire')} onTouchStart={() => btnDown('fire')} onTouchEnd={() => btnUp('fire')}>FIRE</button>
                <button className="px-2 py-1 bg-green-800" onMouseDown={() => btnDown('right')} onMouseUp={() => btnUp('right')} onTouchStart={() => btnDown('right')} onTouchEnd={() => btnUp('right')}>&gt;</button>
            </div>
            <p className="text-center text-green-400 text-xs mt-1">SCORE: {score} | TIME LEFT: {timeLeft}s</p>
        </div>
    );
};
