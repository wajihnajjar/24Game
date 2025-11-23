 import React from 'react';

function ExpressionSlots({ expression, handleRemove, refProp }) {
  return (
    <div ref={refProp} style={{ display: "flex", marginBottom: "1rem" }}>
      {expression.map((value, index) => (
        <p
          key={index}
          onClick={() => handleRemove(index)}
          style={{
            margin: "0 1rem",
            height: "3em",
            width: "3em",
            border: "4px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
            color: "white",
            backgroundColor: value ? "rgba(255, 255, 255, 0.2)" : "transparent",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
        >
          {value}
        </p>
      ))}
    </div>
  );
}

export default ExpressionSlots;