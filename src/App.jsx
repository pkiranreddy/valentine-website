import { useState, useEffect } from "react";
import ValentinesWeek from "./components/ValentinesWeek";
import "./App.css";

function App() {
  const [isValentine, setIsValentine] = useState(false);
  const [yesSize, setYesSize] = useState(1); // Scale factor for Yes button
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 }); // No button position
  const [cries, setCries] = useState([]);
  const [audio, setAudio] = useState(null);

  const moveNoButton = () => {
    setYesSize((prev) => Math.min(prev + 0.2, 3)); // Max scale limit at 3x
    setNoPosition({
      x: Math.random() * 150 - 75, // Adjusted to prevent going too far off-screen
      y: Math.random() * 100 - 50,
    });

    if (!audio) {
      const newAudio = new Audio('/music/cry.mp3');

      newAudio.addEventListener("ended", () => {
        setAudio(null); // reset when finished
      });

      newAudio.play();
      setAudio(newAudio);
    }


  // Generate crying emojis (same logic as hearts)
  const newCries = Array.from({ length: 25 }).map((_, i) => ({
    id: Date.now() + i,
    left: Math.random() * 100,
    size: Math.random() * 1.5 + 1,
    delay: Math.random() * 5,
  }));

  setCries(newCries);
  };

  return (
    <div className="app-container">
      <div className="hearts-container">
        {cries.map((cry) => (
          <div
            key={cry.id}
            className="heart"
            style={{
              left: `${cry.left}%`,
              fontSize: `${cry.size}rem`,
              animationDelay: `${cry.delay}s`,
            }}
          >
            😭
          </div>
        ))}
      </div>

      {!isValentine ? (
        <div className="valentine-question">
          <h1>Hi Lolitha Parlapalli,</h1>
          <p>Will you be my Valentine? 💖</p>
          <div className="buttons">
            <button
              className="yes-button"
              style={{ transform: `scale(${yesSize})` }}
              onClick={() => {
                setIsValentine(true);
                audio && audio.pause(); 
                setAudio(null); 
                setCries([])}
              }
            >
              Yes! 💕
            </button>
            <button
              className="no-button"
              style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
              onClick={moveNoButton}
            >
              No 😜
            </button>
          </div>
        </div>
      ) : (
        <ValentinesWeek />
      )}
    </div>
  );
}

export default App;
