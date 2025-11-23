import React from 'react';

function ResultDisplay({ result }) {
  return (
    <p style={{ fontWeight: "bold", fontSize: "1.5rem", color: "white" }}>
      {result} = 24
    </p>
  );
}

export default ResultDisplay;