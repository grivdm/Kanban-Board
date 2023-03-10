import React, {useState} from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Card.scss";
import EditButton from "../edit-button/EditButton";
import {IoIosSave} from "react-icons/io";

const Card = ({ task, index, topic, editTask, deleteTask }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [content, setContent] = useState(task.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      editTask(task.id, content);
      setIsEdit(false);
    }
  };
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
            <span className={`topic-${topic.id}`}> {topic.name}</span>
            <EditButton cardId={task.id} setIsEdit={setIsEdit} isEdit={isEdit} deleteTask={deleteTask} />
          </div>
          <div className="card-content">
            {!isEdit ? (
              <p>{task.content}</p>
            ) : (
              <>
                <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleSubmit}><IoIosSave/></button>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
