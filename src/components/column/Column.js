import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "./Column.scss";

const Column = ({ title, columnId, children }) => {
  return (
    <div className="column">
      <div className={`title ${columnId}`}>{title}</div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="card-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {children}
            <div>{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
