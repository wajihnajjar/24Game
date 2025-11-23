import React from 'react';

function ResetButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
      }}
    >
      Reset Level
    </button>
  );
}

export default ResetButton;