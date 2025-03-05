import React from "react";
import TallyMarks from "./TallyMarks";
import './TaskList.css';

const Task = ({ task, onDelete, onUpdateTally }) => {
  const incrementTally = () => {
    onUpdateTally(task.id, task.tally + 1)
  }

  const decrementTally = () => {
    onUpdateTally(task.id, task.tally - 1)
  }

  return (
    <div className="task-container">
      <div className="task-left">
        <h2 className="task-title">{task.name}</h2>
        <div className="task-buttons">
          <button onClick={incrementTally}>+</button>
          <button disabled={task.tally === 0} onClick={decrementTally}>-</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="task-middle">
        {task.description && (
          <div className="task-description">
            {task.description.startsWith("data:image") ? (
              <img src={task.description} alt="Task Drawing" className="task-drawing" />
            ) : (
              <h3 className="task-description-text">Description: {task.description}</h3>
            )}
          </div>
        )}
      </div>
      <div className="task-right">
        <div className="tally-marks-container">
          <TallyMarks count={task.tally} color="rgb(200, 155, 97)" crossColor="rgb(200, 155, 97)" />
        </div>
      </div>
    </div>
  )
}

export default Task;