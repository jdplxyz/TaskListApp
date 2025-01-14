import { useState, useEffect } from "react";
import "./TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [valueEdit, setValueEdit] = useState("");
  const [index, setIndex] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState([]);

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(""); 
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [errorMsg]);

  const handleSubmit = () => {
    if (value.trim() === "") {
      setErrorMsg("El input no puede estar vacío.");
      return;
    }
    if (tasks.length === 4) {
      setErrorMsg("Límite alcanzado.");
      return;
    }
    setTasks([...tasks, value]);
    setValue("");
    setErrorMsg("");
  };

  const handleDeleteTask = (index) => {
    const updatedTask = tasks.filter((task, indexN) => indexN !== index);
    setTasks(updatedTask);
  };

  const handleOpenModal = (index) => {
    setOpenModal(true);
    setValueEdit(tasks[index]);
    setIndex(index);
  };

  const handleEditTask = () => {
    const updatedTask = tasks.map((task, indexN) =>
      index === indexN ? valueEdit : task
    );
    setTasks(updatedTask);
    setOpenModal(false);
    setIndex(0);
  };

  const handleCancelEdit = () => {
    setOpenModal(false);
    setValueEdit("");
    setIndex(0);
  };

  const handleToggleComplete = (index) => {
    setTaskCompleted((prev) =>
      prev.includes(index)
        ? prev.filter((indexN) => indexN !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="task-list-container">
      {openModal && (
        <section className="container-modal">
          <header className="header">
            <h2 className="title">Edit task</h2>
            <input
              type="text"
              value={valueEdit}
              onChange={(e) => setValueEdit(e.target.value)}
              className="input-modal"
            />
          </header>
          <div className="container-btn">
            <button className="edit-btn" onClick={handleEditTask}>
              Edit
            </button>
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </section>
      )}
      <header className="task-list-header">
        <input
          type="text"
          placeholder="Enter your task"
          className="input-add"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button onClick={handleSubmit} className="btn-add">
          Add
        </button>
      </header>
      <main className="tasks">
        {tasks.length < 1 ? (
          <p>Task not found</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="task">
              <div className="item">
                <input
                  type="checkbox"
                  checked={taskCompleted.includes(index)}
                  onChange={() => handleToggleComplete(index)}
                />
                <p className={taskCompleted.includes(index) ? "completed" : ""}>
                  {task}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                onClick={() => handleDeleteTask(index)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                onClick={() => handleOpenModal(index)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          ))
        )}
      </main>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
    </section>
  );
}