import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';

const DeleteWindow = ({isOpen, onRequestClose, onConfirmDelete}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onRequestClose}>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
                <button onClick={onConfirmDelete}>Yes</button>
                <DialogClose asChild>
                    <button>No</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteWindow