import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@radix-ui/react-dialog";
import Canvas from "./canvas";
import "./ModalWindow.css";

const ModalWindow = ({ isOpen, onRequestClose, createTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (isOpen) body.classList.add("noScroll");
    else body.classList.remove("noScroll");
    return () => body.classList.remove("noScroll");
  }, [isOpen]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    let description = taskDescription;
    if (useCanvas && window.p5Instance && window.p5Instance.canvas) {
      description = window.p5Instance.canvas.toDataURL();
    }

    createTask({ name: taskName, description });
    setTaskName("");
    setTaskDescription("");
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

          <DialogTitle>Add a New Task</DialogTitle>
          <DialogDescription>
            Enter a name, description, or draw on the canvas.
          </DialogDescription>

          <form onSubmit={handleCreate} style={{ marginTop: "1rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label>
                Task Name:
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  style={{ marginLeft: "0.5rem" }}
                  required
                />
              </label>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>
                Use Canvas:
                <input
                  type="checkbox"
                  checked={useCanvas}
                  onChange={(e) => setUseCanvas(e.target.checked)}
                  style={{ marginLeft: "0.5rem" }}
                />
              </label>
            </div>

            {useCanvas ? (
              <Canvas setTaskDescription={setTaskDescription} />
            ) : (
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Description:
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    rows={4}
                    cols={40}
                    style={{ display: "block", marginTop: "0.5rem" }}
                    required={!useCanvas}
                  />
                </label>
              </div>
            )}

            <button type="submit">Add Task</button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ModalWindow;
