import React, { useState } from "react";
import "./AddTask.scss"; 
import { IoIosAddCircle } from 'react-icons/io';

const AddTask = ({ onAddTask }) => {
  const [content, setContent] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddTask(content);
      setContent("");
    }
  };

  return (
    <> 

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        <IoIosAddCircle className="submit-button-icon"/>
      </button>
    </form>
    </>
  );
};

export default AddTask;
