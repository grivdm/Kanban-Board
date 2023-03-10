import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./EditButton.scss";



const EditButton = ({cardId, setIsEdit, isEdit, deleteTask}) => {
  const [isActive, setIsActive] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: "Edit",
      onClick: () => {
        setIsEdit(!isEdit);
        setIsActive(false);
      },
    },
    {
      id: 2,
      name: "Delete",
      onClick: () => {
        deleteTask(cardId);
        setIsActive(false);
      },
    },
  ];
  const handleClick = () => setIsActive(!isActive);

  return (
    <div className="edit-button-place">
      <div className="edit-button" onClick={() => setIsActive(!isActive)}>
        <button onClick={handleClick}>
          <BsThreeDotsVertical />
        </button>
        {isActive ? (
          <ul className="menu">
            {menuItems.map((item) => {
              return (
                <li className="menu-item" key={item.id}>
                  <button onClick={item.onClick}>{item.name}</button>
                </li>
              );
            })
            }
          </ul>
        ) : null}
      </div>
      <div className="accordion-item">
      
      </div>
    </div>
  );
};

export default EditButton;
