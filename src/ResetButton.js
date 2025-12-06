import React from 'react';

function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="reset-btn"
    >
      Reset Level
    </button>
  );
}

export default ResetButton;