import { useState, useEffect, useRef } from "react";



<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3577514437376917"
     crossorigin="anonymous"></script>

const LEVELS = [
  { emojis: "🦁 👑", answer: ["the lion king", "lion king"], hint: "Hakuna Matata!" },
  { emojis: "🌹 🚢 💔", answer: ["titanic"], hint: "I'll never let go..." },
  { emojis: "👻 🔫 🚫", answer: ["ghostbusters"], hint: "Who you gonna call?" },
  { emojis: "🧙‍♂️ 💍 🌋", answer: ["lord of the rings", "lotr"], hint: "One ring to rule them all" },
  { emojis: "🕷️ 🧑 🏙️", answer: ["spider-man", "spiderman", "spider man"], hint: "Friendly neighborhood..." },
  { emojis: "👽 📞 🏠", answer: ["et", "e.t.", "e t", "e.t"], hint: "Phone home!" },
  { emojis: "🧊 ❄️ 👸 ⛄", answer: ["frozen"], hint: "Let it go!" },
  { emojis: "🏠 🎄 😈 👦", answer: ["home alone"], hint: "Kevin!" },
  { emojis: "🌌 ⭐ ⚔️", answer: ["star wars"], hint: "A long time ago in a galaxy far far away" },
  { emojis: "🐀 👨‍🍳 🇫🇷", answer: ["ratatouille"], hint: "Anyone can cook" },
  { emojis: "🐟 🔍 🌊", answer: ["finding nemo", "nemo"], hint: "Just keep swimming" },
  { emojis: "🧙‍♀️ ⚡ 🏫 🧹", answer: ["harry potter"], hint: "You're a wizard" },
  { emojis: "🦇 🌃 🦸", answer: ["batman", "the batman", "dark knight", "the dark knight"], hint: "I am the night" },
  { emojis: "🏝️ 🦕 🦖", answer: ["jurassic park", "jurassic world"], hint: "Life finds a way" },
  { emojis: "🤖 ❤️ 🌍 🗑️", answer: ["wall-e", "wall e", "walle"], hint: "A lonely robot on Earth" },
  { emojis: "🧟 🧠 🔫 🏥", answer: ["the walking dead", "walking dead"], hint: "Don't open, dead inside" },
  { emojis: "🎈 🤡 🕳️", answer: ["it", "pennywise"], hint: "We all float down here" },
  { emojis: "🐒 🍌 🛢️ 👸", answer: ["donkey kong"], hint: "It's on like..." },
];

const TOTAL = LEVELS.length;

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => {
    const colors = ["#FF6B6B", "#FFE66D", "#4ECDC4", "#A78BFA", "#FF9A9E", "#FECFEF", "#45B7D1"];
    const color = colors[i % colors.length];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const size = 6 + Math.random() * 8;
    const dur = 1.5 + Math.random() * 1.5;
    return (
      <div key={i} style={{
        position: "fixed", top: -20, left: `${left}%`, width: size, height: size,
        backgroundColor: color, borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animation: `confettiFall ${dur}s ease-out ${delay}s forwards`,
        transform: `rotate(${Math.random() * 360}deg)`, zIndex: 9999, opacity: 0,
      }} />
    );
  });
  return <>{pieces}</>;
}

function LevelComplete({ level }) {
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.4)", zIndex: 100, animation: "fadeIn 0.3s ease",
    }}>
      <div style={{
        background: "#1a1a2e", border: "2px solid #4ECDC4", borderRadius: 20, padding: "40px 50px",
        textAlign: "center", animation: "popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        boxShadow: "0 0 60px rgba(78,205,196,0.3)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 28, color: "#4ECDC4", fontWeight: 800 }}>
          Cracked it!
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#8892b0", marginTop: 8 }}>
          Level {level} decoded
        </div>
      </div>
    </div>
  );
}

function GameComplete({ onRestart }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", background: "linear-gradient(160deg, #0d0d1a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'Baloo 2', sans-serif", padding: 40, textAlign: "center",
    }}>
      <Confetti />
      <div style={{ fontSize: 72, marginBottom: 20, animation: "popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>🏆</div>
      <h1 style={{ fontSize: 42, color: "#FFE66D", margin: 0, lineHeight: 1.2 }}>Master Decoder!</h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#8892b0", marginTop: 16, maxWidth: 400, lineHeight: 1.6 }}>
        You cracked every single code. The Emoji Decoder Ring has no more secrets for you.
      </p>
      <button onClick={onRestart} style={{
        marginTop: 32, padding: "14px 36px", fontSize: 18, fontFamily: "'Baloo 2', sans-serif",
        fontWeight: 700, background: "linear-gradient(135deg, #4ECDC4, #45B7D1)", color: "#0d0d1a",
        border: "none", borderRadius: 12, cursor: "pointer", letterSpacing: 0.5,
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 20px rgba(78,205,196,0.3)",
      }}
        onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 30px rgba(78,205,196,0.5)"; }}
        onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(78,205,196,0.3)"; }}
      >Play Again</button>
    </div>
  );
}

export default function EmojiDecoderRing() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [completed, setCompleted] = useState(new Set());
  const [gameWon, setGameWon] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !showComplete && !gameWon) inputRef.current.focus();
  }, [currentLevel, showComplete, gameWon]);

  const handleSubmit = () => {
    const trimmed = input.trim().toLowerCase().replace(/[''`]/g, "'").replace(/[^a-z0-9\s.'-]/g, "");
    const level = LEVELS[currentLevel];
    if (level.answer.some(a => trimmed === a || trimmed.replace(/[^a-z0-9]/g, "") === a.replace(/[^a-z0-9]/g, ""))) {
      const newCompleted = new Set(completed);
      newCompleted.add(currentLevel);
      setCompleted(newCompleted);
      setInput("");
      setShowHint(false);
      setShowComplete(true);
      setTimeout(() => {
        setShowComplete(false);
        if (newCompleted.size === TOTAL) {
          setGameWon(true);
        } else {
          const next = findNextUnsolved(currentLevel, newCompleted);
          setCurrentLevel(next);
        }
      }, 1200);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const findNextUnsolved = (from, solved) => {
    for (let i = 1; i <= TOTAL; i++) {
      const idx = (from + i) % TOTAL;
      if (!solved.has(idx)) return idx;
    }
    return from;
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSubmit(); };

  if (gameWon) return <GameComplete onRestart={() => { setCurrentLevel(0); setCompleted(new Set()); setGameWon(false); setInput(""); }} />;

  const level = LEVELS[currentLevel];
  const progress = (completed.size / TOTAL) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0d0d1a 0%, #1a1a2e 50%, #16213e 100%)",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes confettiFall { 0% { opacity:1; transform: translateY(0) rotate(0deg); } 100% { opacity:0; transform: translateY(100vh) rotate(720deg); } }
        @keyframes popIn { 0% { transform: scale(0.5); opacity:0; } 100% { transform: scale(1); opacity:1; } }
        @keyframes fadeIn { 0% { opacity:0; } 100% { opacity:1; } }
        @keyframes shakeX { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes slideUp { 0% { transform: translateY(20px); opacity:0; } 100% { transform: translateY(0); opacity:1; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {showComplete && <LevelComplete level={currentLevel + 1} />}

      {/* Header */}
      <div style={{ padding: "24px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{
            fontFamily: "'Baloo 2', sans-serif", fontSize: 26, fontWeight: 800,
            background: "linear-gradient(135deg, #FFE66D, #FF6B6B)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", letterSpacing: -0.5,
          }}>
            🔮 Decoder Ring
          </h1>
        </div>
        <div style={{
          fontFamily: "'Baloo 2', sans-serif", fontSize: 15, color: "#4ECDC4", fontWeight: 700,
          background: "rgba(78,205,196,0.1)", padding: "6px 14px", borderRadius: 20,
          border: "1px solid rgba(78,205,196,0.2)",
        }}>
          {completed.size} / {TOTAL}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "16px 28px 0" }}>
        <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${progress}%`, borderRadius: 3,
            background: "linear-gradient(90deg, #4ECDC4, #45B7D1, #A78BFA)",
            transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }} />
        </div>
      </div>

      {/* Level selector */}
      <div style={{ padding: "20px 28px 0", display: "flex", flexWrap: "wrap", gap: 8 }}>
        {LEVELS.map((_, i) => {
          const solved = completed.has(i);
          const active = i === currentLevel;
          return (
            <button key={i} onClick={() => { if (!solved) { setCurrentLevel(i); setInput(""); setShowHint(false); } }}
              style={{
                width: 36, height: 36, borderRadius: 10, border: "none", cursor: solved ? "default" : "pointer",
                fontSize: 13, fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, transition: "all 0.2s",
                background: solved ? "rgba(78,205,196,0.2)" : active ? "rgba(255,230,109,0.15)" : "rgba(255,255,255,0.04)",
                color: solved ? "#4ECDC4" : active ? "#FFE66D" : "#555",
                border: active && !solved ? "1.5px solid rgba(255,230,109,0.4)" : "1.5px solid transparent",
                transform: active ? "scale(1.1)" : "scale(1)",
              }}
            >
              {solved ? "✓" : i + 1}
            </button>
          );
        })}
      </div>

      {/* Main card */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 28px 40px" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 24, padding: "48px 40px 40px", width: "100%", maxWidth: 480,
          textAlign: "center", animation: "slideUp 0.4s ease",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}>
          <div style={{
            fontFamily: "'Baloo 2', sans-serif", fontSize: 13, fontWeight: 700, color: "#A78BFA",
            textTransform: "uppercase", letterSpacing: 2, marginBottom: 8,
          }}>
            Level {currentLevel + 1}
          </div>

          {completed.has(currentLevel) ? (
            <div style={{ padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 20, color: "#4ECDC4" }}>Already solved!</div>
            </div>
          ) : (
            <>
              <div style={{
                fontSize: 52, letterSpacing: 8, margin: "20px 0 36px",
                animation: "float 3s ease-in-out infinite", lineHeight: 1.4,
              }}>
                {level.emojis}
              </div>

              <div style={{
                animation: shake ? "shakeX 0.4s ease" : "none",
                position: "relative",
              }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your guess..."
                  style={{
                    width: "100%", padding: "16px 20px", fontSize: 18, fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)",
                    borderRadius: 14, color: "#e6e6e6", outline: "none", textAlign: "center",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onFocus={e => { e.target.style.borderColor = "rgba(78,205,196,0.5)"; e.target.style.boxShadow = "0 0 20px rgba(78,205,196,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <button onClick={handleSubmit} style={{
                marginTop: 20, padding: "14px 40px", fontSize: 16, fontFamily: "'Baloo 2', sans-serif",
                fontWeight: 700, background: "linear-gradient(135deg, #FFE66D, #FF6B6B)", color: "#1a1a2e",
                border: "none", borderRadius: 12, cursor: "pointer", letterSpacing: 0.5,
                transition: "transform 0.2s, box-shadow 0.2s", width: "100%",
                boxShadow: "0 4px 20px rgba(255,107,107,0.2)",
              }}
                onMouseEnter={e => { e.target.style.transform = "scale(1.02)"; e.target.style.boxShadow = "0 6px 30px rgba(255,107,107,0.35)"; }}
                onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 20px rgba(255,107,107,0.2)"; }}
              >
                Decode 🔓
              </button>

              <button onClick={() => setShowHint(!showHint)} style={{
                marginTop: 14, background: "none", border: "none", cursor: "pointer",
                fontSize: 14, color: "#8892b0", fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#A78BFA"}
                onMouseLeave={e => e.target.style.color = "#8892b0"}
              >
                {showHint ? "Hide hint" : "Need a hint? 💡"}
              </button>

              {showHint && (
                <div style={{
                  marginTop: 12, padding: "12px 20px", background: "rgba(167,139,250,0.08)",
                  border: "1px solid rgba(167,139,250,0.15)", borderRadius: 12,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#A78BFA",
                  fontStyle: "italic", animation: "fadeIn 0.3s ease",
                }}>
                  {level.hint}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
