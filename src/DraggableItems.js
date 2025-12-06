import React from 'react';
import Draggable from 'react-draggable';

function DraggableItems({ items, onStop, numberRef }) {
  return (
    <div ref={numberRef} className="draggable-area">
      {items.map((item, index) => {
        const isOperator = ['+', '-', '*', '/'].includes(item);
        return (
          <Draggable key={index} onStop={(e, data) => onStop(e, data, index)}>
            <div
              data-key={index}
              className={`draggable-item ${isOperator ? 'operator' : ''}`}
            >
              {item}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default DraggableItems;