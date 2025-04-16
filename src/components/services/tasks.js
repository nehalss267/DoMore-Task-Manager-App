export const getTasks = (userEmail) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    return allTasks[userEmail] || [];
  };
  
  export const saveTasks = (userEmail, tasks) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    allTasks[userEmail] = tasks;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  };
  
  export const addTask = (userEmail, task) => {
    const tasks = getTasks(userEmail);
    const newTask = { ...task, id: Date.now() };
    const updatedTasks = [...tasks, newTask];
    saveTasks(userEmail, updatedTasks);
    return newTask;
  };
  
  export const updateTask = (userEmail, taskId, updates) => {
    const tasks = getTasks(userEmail);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return null;
    
    const updatedTask = { ...tasks[taskIndex], ...updates };
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    saveTasks(userEmail, updatedTasks);
    return updatedTask;
  };
  
  export const deleteTask = (userEmail, taskId) => {
    const tasks = getTasks(userEmail);
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    saveTasks(userEmail, updatedTasks);
    return taskId;
  };
