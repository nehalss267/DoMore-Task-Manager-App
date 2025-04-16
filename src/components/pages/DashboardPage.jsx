import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/auth';
import { getTasks, addTask, updateTask, deleteTask } from '../services/tasks';
import Header from '../components/Layout/Header';
import ViewToggle from '../components/Layout/ViewToggle';
import TaskList from '../components/Dashboard/TaskList';
import TaskBoard from '../components/Dashboard/TaskBoard';
import TaskForm from '../components/Dashboard/TaskForm';
import TaskView from '../components/Dashboard/TaskView';
import Notification from '../components/Dashboard/Notification';
import '../styles/dashboard.css';

const DashboardPage = () => {
  const { currentUser, logout, checkSessionTimeout, sessionWarning, extendSession } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });

  useEffect(() => {
    if (currentUser) {
      setTasks(getTasks(currentUser));
    }
    
    // Check session timeout every minute
    const interval = setInterval(() => {
      checkSessionTimeout();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [currentUser, checkSessionTimeout]);

  const handleAddTask = () => {
    setCurrentTask(null);
    setActiveOverlay('taskForm');
  };

  const handleTaskClick = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setCurrentTask(task);
      setActiveOverlay('taskView');
    }
  };

  const handleEditTask = () => {
    setActiveOverlay('taskForm');
  };

  const handleDeleteTask = () => {
    if (currentTask) {
      deleteTask(currentUser, currentTask.id);
      setTasks(getTasks(currentUser));
      setActiveOverlay(null);
      showNotification('Task deleted successfully');
      setCurrentTask(null);
    }
  };

  const handleSubmitTask = (taskData) => {
    if (currentTask) {
      // Update existing task
      updateTask(currentUser, currentTask.id, taskData);
      setTasks(getTasks(currentUser));
      showNotification('Task updated successfully');
    } else {
      // Add new task
      addTask(currentUser, taskData);
      setTasks(getTasks(currentUser));
      showNotification('Task added successfully');
    }
    setActiveOverlay(null);
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  const filterTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="content-container">
      <Notification show={notification.show} message={notification.message} />
      
      {sessionWarning && (
        <div className="notification pink-background" id="sessionWarning" onClick={extendSession}>
          <iconify-icon icon="mdi:alert-circle-outline" width="24" height="24"></iconify-icon>
          <p>Your session will expire soon. Click to extend.</p>
        </div>
      )}

      <Header onAddTask={handleAddTask} onSignOut={logout} />
      
      <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      
      <div className="max-width-container">
        {viewMode === 'list' ? (
          <div className="list-view">
            <TaskList 
              status="To do" 
              tasks={filterTasksByStatus('To do')} 
              onTaskClick={handleTaskClick}
            />
            <TaskList 
              status="Doing" 
              tasks={filterTasksByStatus('Doing')} 
              onTaskClick={handleTaskClick}
            />
            <TaskList 
              status="Done" 
              tasks={filterTasksByStatus('Done')} 
              onTaskClick={handleTaskClick}
            />
          </div>
        ) : (
          <div className="board-view">
            <TaskBoard 
              status="To do" 
              tasks={filterTasksByStatus('To do')} 
              onTaskClick={handleTaskClick}
            />
            <TaskBoard 
              status="Doing" 
              tasks={filterTasksByStatus('Doing')} 
              onTaskClick={handleTaskClick}
            />
            <TaskBoard 
              status="Done" 
              tasks={filterTasksByStatus('Done')} 
              onTaskClick={handleTaskClick}
            />
          </div>
        )}
      </div>

      {activeOverlay === 'taskForm' && (
        <TaskForm 
          task={currentTask} 
          onSubmit={handleSubmitTask} 
          onClose={closeOverlay}
        />
      )}

      {activeOverlay === 'taskView' && currentTask && (
        <TaskView 
          task={currentTask} 
          onEdit={handleEditTask} 
          onDelete={handleDeleteTask} 
          onClose={closeOverlay}
        />
      )}
    </div>
  );
};

export default DashboardPage;
