import React from 'react';

function LevelDisplay({ currentLevel, totalLevels }) {
  return (
    <div style={{ border: "3px solid white", padding: "0.5rem 1rem", marginBottom: "1rem" }}>
      Level {currentLevel + 1} / {totalLevels}
    </div>
  );
}

export default LevelDisplay;