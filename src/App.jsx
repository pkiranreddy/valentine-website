import { useState, useEffect } from "react";
import ValentinesWeek from "./components/ValentinesWeek";
import "./App.css";

function App() {
  const [isValentine, setIsValentine] = useState(false);
  const [yesSize, setYesSize] = useState(1); // Scale factor for Yes button
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 }); // No button position
  const [hearts, setHearts] = useState([]);

  // Generate multiple hearts dynamically
  useEffect(() => {
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random left position
      size: Math.random() * 1.5 + 1, // Random size between 1x to 2.5x
      delay: Math.random() * 5, // Random delay for animation timing
    }));
    setHearts(newHearts);
  }, []);

  const moveNoButton = () => {
    setYesSize((prev) => Math.min(prev + 0.2, 3)); // Max scale limit at 3x
    setNoPosition({
      x: Math.random() * 150 - 75, // Adjusted to prevent going too far off-screen
      y: Math.random() * 100 - 50,
    });
  };

  return (
    <div className="app-container">
      {/* Floating Hearts */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}rem`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {!isValentine ? (
        <div className="valentine-question">
          <h1>Will you be my Valentine? 💖</h1>
          <div className="buttons">
            <button
              className="yes-button"
              style={{ transform: `scale(${yesSize})` }}
              onClick={() => setIsValentine(true)}
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
