import React from 'react';

function LevelDisplay({ currentLevel, totalLevels }) {
  return (
    <div className="level-display">
      Level {currentLevel + 1} / {totalLevels}
    </div>
  );
}

export default LevelDisplay;