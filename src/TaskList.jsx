import React, { useEffect } from "react";
import { useState } from "react";
import Task from "./Task";
import './TaskList.css'
import ModalWindow from "./ModalWindow";
import DeleteWindow from "./DeleteWindow";
import {motion, AnimatePresence} from "framer-motion"


const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const [isWindowOpen, setIsWindowOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    
    useEffect(() => {
        const storedTasks=JSON.parse(localStorage.getItem("tasks") || "[]")
        if(storedTasks) {
            setTasks(storedTasks)
        }
        console.log("Stored tasks on load:", storedTasks);
        setIsInitialLoad(false)
    }, [])

    useEffect(() => {
        if(isInitialLoad) return
        localStorage.setItem("tasks", JSON.stringify(tasks))
        console.log("Updating localStorage:", tasks);
    }, [tasks, isInitialLoad])

    const createTask = (task) => {
        const nTask = {id: Date.now(), tally:0, ...task}
        setTasks([...tasks, nTask])   
    }

    const openWindow = () => {
        setIsWindowOpen(true)
    }

    const closeWindow = () => {
        setIsWindowOpen(false)
    }

    const openDelete = (task) => {
        setToDelete(task)
        setIsDeleteOpen(true)
    }

    const closeDelete = () => {
        setToDelete(null)
        setIsDeleteOpen(false)
    }

    const confirmDelete = () => {
        setTasks(tasks.filter(task => task !== toDelete))
        closeDelete()
    }

    const updateTally = (taskID, newTally) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskID ? {...task, tally: newTally} : task
        )
        setTasks(updatedTasks)
    }

    return (
        <div style={{height: "100%", display: "flex", flexDirection: "column", margin: 10}}>
            <button style={{margin: 10}} onClick={openWindow}>Create New Task</button>
            <div className="task-list-container"> 
                <AnimatePresence>
                    {tasks.map((task, idx) => (
                        <motion.div
                            key={idx}
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y:0}}
                            exit={{opacity: 0}}
                            transition={{
                                type: "tween",
                                visualDuration: 0.5,
                                bounce: 0.75,
                                ease: "easeInOut"
                            }}
                            >
                            <Task key={task.id} task={task} onDelete={()=>openDelete(task)} onUpdateTally={updateTally}/>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <ModalWindow isOpen={isWindowOpen} onRequestClose={closeWindow} createTask={createTask}></ModalWindow>
            <DeleteWindow isOpen={isDeleteOpen} onRequestClose={closeDelete} onConfirmDelete={confirmDelete}></DeleteWindow>
        </div> 
    )
}

export default TaskList