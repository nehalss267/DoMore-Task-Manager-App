import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ status, tasks, onTaskClick }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'To do': return 'pink';
      case 'Doing': return 'blue';
      case 'Done': return 'green';
      default: return 'pink';
    }
  };

  const color = getStatusColor();

  return (
    <div className={`list-container ${color}`}>
      <h2 className="list-header">
        <span className={`circle ${color}-background`}></span>
        <span className="text">{status}</span>
      </h2>
      <ul className="tasks-list">
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onClick={() => onTaskClick(task.id)}
            isBoardView={false}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
