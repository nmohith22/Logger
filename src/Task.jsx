import React, { useState } from "react";
import TallyMarks from "./TallyMarks";
import './TaskList.css';

const Task = ({task, onDelete, onUpdateTally}) => {
    //const [tally, setTally] = useState(0)
    const incrementTally = () => {
        onUpdateTally(task.id, task.tally+1)
    }
    const decrementTally = () => {
        onUpdateTally(task.id, task.tally-1)
    }

//Days: {tally} 
return (
    <div>
        <h2>{task.name}</h2>
        {task.description && <h3>Description: {task.description}</h3>}
        <div style={{padding:10}}>
            <TallyMarks count={task.tally} color="rgb(200, 155, 97)" crossColor="rgb(200, 155, 97)"/>
        </div>
        <button style={{padding: 10}} onClick={incrementTally}>+</button>
        <button disabled={task.tally===0} style={{padding: 10}} onClick={decrementTally}>-</button> 
        <button onClick={onDelete}>Delete</button>
    </div>
)
}
export default Task