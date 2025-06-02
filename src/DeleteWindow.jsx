import React, { useEffect } from 'react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@radix-ui/react-dialog';
import './ModalWindow.css';

const DeleteWindow = ({ isOpen, onRequestClose, onConfirmDelete }) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add('noScroll');
    else document.body.classList.remove('noScroll');
    return () => document.body.classList.remove('noScroll');
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirmDelete();
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => (val ? null : onRequestClose())}>
      <DialogPortal>
        <DialogOverlay className="dialogOverlay" />
        <DialogContent className="dialogContent">
          <DialogClose asChild>
            <button className="dialogCloseButton">✕</button>
          </DialogClose>

          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task?
          </DialogDescription>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteWindow;
