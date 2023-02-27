import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Card.scss";
const Card = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-header">
            <span className={`topic-${task.topic.id}`}> {task.topic.name}</span>
          </div>
          <p>{task.content}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
