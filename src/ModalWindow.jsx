import React from "react";
import Modal from 'react-modal'
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';

Modal.setAppElement('#root')

const ModalWindow = ({isOpen, onRequestClose, createTask}) => {
    const [taskName, setTaskName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    const handleCreate = (e) => {
        e.preventDefault()
        if(taskName.trim()) {
            createTask({name: taskName, description: taskDescription})
            setTaskName('')
            setTaskDescription('')
            onRequestClose();
        }
    }

return (
    <Dialog asChild open={isOpen} onOpenChange={onRequestClose}>
        
        <DialogContent>
            <DialogTitle>Create a New Task!</DialogTitle>
            
            <form onSubmit={handleCreate}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter Task Name"
                    style={{margin: 10}}
                    required
                    color="blue"
                    >
                </input>
                <textarea
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Enter Task Description"
                    style={{margin: 10}}
                    autoComplete="on"
                    rows={10} cols={40}>
                </textarea>
            </div>
            <button type="submit">Add Task</button>
            </form>
            <DialogClose asChild>
                <button>Exit</button>
            </DialogClose>
        </DialogContent>
    </Dialog>
)

}

export default ModalWindow