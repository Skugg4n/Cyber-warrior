// AwakeningEvent renders the brief glitch animation that plays when the
// user crosses the resonance threshold. It uses the global React object
// exposed in index.html, so we don't import React as a module.
const { useState, useEffect } = React;

// This component renders the "glitch" awakening animation. Display it
// fullscreen when the RESONANCE_SYNC bar reaches 100% and handle the
// onComplete callback to transition to the AEGIS protocol.
const AwakeningEvent = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [typedMessage, setTypedMessage] = useState('');

  const messages = [
    "// RESONANCE THRESHOLD REACHED...",
    "// SYMBIOTIC LINK ESTABLISHED...",
    "// ANOMALY STABILIZED.",
    "",
    "// ANALYZING HOST BIOMETRICS...",
    "// OPERATOR #8A5C2F DESIGNATED.",
    "",
    "// WE ARE AWAKE."
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => setStage(4), 3000),
      setTimeout(() => onComplete(), 12000)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (stage === 4) {
      let fullText = messages.join('\n');
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setTypedMessage(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const styles = `
    @keyframes static-noise {
      0% { background-position: 0 0; }
      10% { background-position: -5% -10%; }
      20% { background-position: -15% 5%; }
      30% { background-position: 7% -25%; }
      40% { background-position: 20% 25%; }
      50% { background-position: -25% 10%; }
      60% { background-position: 15% 5%; }
      70% { background-position: 0 15%; }
      80% { background-position: 25% 35%; }
      90% { background-position: -10% 10%; }
      100% { background-position: 0 0; }
    }
    .static-bg {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////A////wAA////////////AAAAAAAAAAAAAAAAAAAAAAAA////2D5gRQAAABV0Uk5T/////////////////////////wAlr/42AAAAdklEQVR42uzsSQrAIAwE0cT9D3vNQiCEJzZt3H8gQhJicZN8lJS4O4kETuLEH5YhDbECBfN8zQLgZ2ZgJkE2czsDXsno3aCcmZ2chZ4p2T2D2da205M4g5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2Y2s5fQzGzcu2b2L3DBAAHFCTb4PSvLAAAAAElFTkSuQmCC');
      animation: static-noise 0.2s steps(8, end) infinite;
      opacity: 0.7;
    }
    @keyframes flicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;

  switch (stage) {
    case 1:
      return <div className="fixed inset-0 bg-black static-bg" style={{ opacity: 0.2, zIndex: 9998 }} />;
    case 2:
      return <div className="fixed inset-0 bg-black static-bg" style={{ zIndex: 9998 }} />;
    case 3:
    case 4:
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center font-mono text-green-400 z-50 p-4">
          <style>{styles}</style>
          <pre className="text-sm md:text-lg whitespace-pre-wrap">
            {typedMessage}
            {stage === 3 && <span className="animate-ping">_</span>}
            {stage === 4 && typedMessage.length === messages.join('\n').length ? '' : <span className="animate-ping">_</span>}
          </pre>
        </div>
      );
    default:
      return null;
  }
};

window.AwakeningEvent = AwakeningEvent;
