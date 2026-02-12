import { useState, useEffect } from "react";
import { valentinesDays } from "../data";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-"); // Convert YYYY-MM-DD to DD-MM-YYYY
  return `${day}-${month}-${year}`;
};

const getTodayIST = () => {
  const now = new Date();
  now.setHours(now.getHours() + 5, now.getMinutes() + 30); // Convert to IST
  return now.toISOString().split("T")[0]; // Return YYYY-MM-DD format
};

const ValentinesWeek = () => {
  const [today, setToday] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setToday(getTodayIST()); // Set today's date in IST
  }, []);

  const openDay = (day) => {
    const eventDate = new Date(day.date);
    const currentDate = new Date(today);

    if (currentDate >= eventDate) {
      setSelectedDay(day);
      if (audio) audio.pause(); // Stop previous audio
      const newAudio = new Audio(day.music);
      newAudio.play();
      setAudio(newAudio);
    }
  };

  return (
    <div className="scroll-container">
      <div className="valentine-content">
        <h2>💖 {selectedDay?.name || "Valentine's Week"} 💖</h2>
        {selectedDay ? (
          <div className="book-page">
              {/* Show Video if available */}
              {selectedDay.video ? (
                <video
                  src={selectedDay.video}
                  controls
                  autoPlay
                  loop
                  className="video-player"
                />
              ) : (
                <img src={selectedDay.image} alt={selectedDay.name} className="gif" />
              )}
            <p>{selectedDay.message}</p>
            <button className="back-button" onClick={() => setSelectedDay(null)}>Back</button>
          </div>
        ) : (
          <div className="cards">
            {valentinesDays.map((day) => {
              const eventDate = new Date(day.date);
              const currentDate = new Date(today);
              const isUnlocked = currentDate >= eventDate;

              return (
                <div 
                  key={day.id} 
                  className={`card ${isUnlocked ? "unlocked" : "locked"}`}
                  onClick={() => openDay(day)}
                >
                  <h2>{day.name}</h2>
                  {isUnlocked ? <p>{day.emoji} Click to Open</p> : <p>🔒 Unlocks on {formatDate(day.date)}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentinesWeek;
