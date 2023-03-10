import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../../components/column/Column";
import Card from "../../components/card/Card";
import AddTask from "../../components/add-task/AddTask";
import "./ProjectPage.scss";

const ProjectPage = () => {
  // tasks data
  const [tasks, setTasks] = useState([
    {
      id: "1",
      content: "Create technical specifications and diagrams",
      topicId: "1",
    },
    {
      id: "2",
      content: "Refactor and optimize code for performance",
      topicId: '2',
    },
    {
      id: "3",
      content: "Develop and implement fixes and patches.",
      topicId: '3',
    },
    {
      id: "4",
      content: "Identify and prioritize bugs and issues.",
      topicId: "3",
    },
  ]);

  // topics data
  const [topics, setTopics] = useState([
    {
      id: "1",
      name: "Design and architecture",
    },
    {
      id: "2",
      name: "Code development",
    },
    {
      id: "3",
      name: "Bug fixing",
    },
  ]);

  // columns data
  const [columns, setColumns] = useState({
    "column-1": {
      title: "To Do",
      taskIds: ["1", "2"],
    },
    "column-2": {
      title: "In Progress",
      taskIds: ["4"],
    },
    "column-3": {
      title: "Testing",
      taskIds: [],
    },
    "column-4": {
      title: "Done",
      taskIds: ["3"],
    },
  });

  // useEffect(() => {
  //   const setColumns((prevState) => ({
  //     ...prevState,
  //     ))
  // }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // dropped outside columnss
    if (!destination) return;

    // dropped in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } else {
      // dropped in different column or same column but different index
      const updatedColumns = updateColumns(source, destination, draggableId);
      setColumns((prevState) => ({ ...prevState, ...updatedColumns }));
      return;
    }
  };



  const updateColumns = (source, destination, draggableId) => {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    // get source task ids
    const sourceTaskIds = sourceColumn.taskIds;

    // remove task from source column
    sourceTaskIds.splice(source.index, 1);

    // add task to destination column
    const newSource = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };

    const destTaskIds = [...destColumn.taskIds];

    // add task to destination column
    destTaskIds.splice(destination.index, 0, draggableId);

    const newDest = {
      ...destColumn,
      taskIds: destTaskIds,
    };
    const newColumns = {
      ...columns,
      [source.droppableId]: newSource,
      [destination.droppableId]: newDest,
    };
    setColumns(newColumns);
    return;
  };




  const handleAddTask = (content, columnId) => {
    const newTask = {
      id: `${tasks.length + 1}`,
      content,
      topicId: '1',
    };
    setTasks([...tasks, newTask]);
    setColumns((columns) => ({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: [...columns[columnId].taskIds, newTask.id],
      },
    }));
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    
    setColumns((columns) => {
      const newColumns = {};
  
      // Remove the task from taskIds array in all columns where it exists
      Object.keys(columns).forEach((columnId) => {
        const column = columns[columnId];
        const taskIds = column.taskIds.filter((id) => id !== taskId);
  
        newColumns[columnId] = { ...column, taskIds };
      });
  
      return newColumns;
    });
  };

  const handleEditTask = (taskId, content) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          task.content = content;
        }
        return task;
      })
    );
  };

  return (
    <div className="project-page">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.entries(columns).map(([columnKey, columnVal]) => {
            const tasksInColumn = columnVal.taskIds.map((taskId) =>
              tasks.find((task) => task.id === taskId)
            );
            return (
              <Column
                key={columnKey}
                title={columnVal.title}
                columnId={columnKey}
              >
                <div className="add-task">
                  <AddTask
                    onAddTask={(content) => handleAddTask(content, columnKey)}
                  />
                </div>
                <div className="card-list">
                  {tasksInColumn.map((task, index) =>
                    task && task.id ? (
                      <Card
                        key={task.id}
                        task={task}
                        topic={topics && topics.find((topic) => topic.id === task.topicId)}
                        index={index}
                        editTask={handleEditTask}
                        deleteTask={handleDeleteTask}
                      />
                    ) : null
                  )}
                </div>
               </Column>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectPage;
