import React from 'react';
import TaskItem from './TaskItem';

const TaskBoard = ({ status, tasks, onTaskClick }) => {
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
    <div>
      <h2 className="list-header">
        <span className={`circle ${color}-background`}></span>
        <span className="text">{status}</span>
      </h2>
      <ul className={`tasks-list ${color}`}>
        {tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onClick={() => onTaskClick(task.id)}
            isBoardView={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskBoard;
