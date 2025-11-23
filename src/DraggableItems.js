import React from 'react';
import Draggable from 'react-draggable';

function DraggableItems({ items, onStop, numberRef }) {
  return (
    <div ref={numberRef} style={{ display: "flex", marginBottom: "1rem" }}>
      {items.map((item, index) => (
        <Draggable key={index} onStop={(e, data) => onStop(e, data, index)}>
          <p
            data-key={index}
            style={{
              margin: "0 1rem",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "white",
              cursor: "grab",
              transition: "transform 0.2s"
            }}
          >
            {item}
          </p>
        </Draggable>
      ))}
    </div>
  );
}

export default DraggableItems;