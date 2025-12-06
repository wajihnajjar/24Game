 import React from 'react';

function ExpressionSlots({ expression, handleRemove, refProp }) {
  return (
    <div ref={refProp} className="expression-area">
      {expression.map((value, index) => (
        <div
          key={index}
          onClick={() => handleRemove(index)}
          className={`expression-slot ${value ? 'filled' : ''}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default ExpressionSlots;