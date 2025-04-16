import React from 'react';
// import iconify from 'iconify-icon';

const TaskItem = ({ task, onClick, isBoardView }) => {
  return (
    <li className="task-item" data-id={task.id}>
      <button className="task-button" onClick={onClick}>
        {isBoardView ? (
          <div>
            <p className="task-name">{task.name}</p>
            <p className="task-due-date">Due on {task.dueDate}</p>
          </div>
        ) : (
          <>
            <p className="task-name">{task.name}</p>
            <p className="task-due-date">Due on {task.dueDate}</p>
          </>
        )}
        <iconify-icon
          icon="material-symbols:arrow-back-ios-rounded"
          style={{ color: 'black' }}
          width="18"
          height="18"
          className="arrow-icon"
        ></iconify-icon>
      </button>
    </li>
  );
};

export default TaskItem;
