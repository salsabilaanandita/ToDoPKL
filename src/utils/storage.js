// Helper functions for localStorage operations

// Save tasks to localStorage
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
    return false;
  }
};

// Load tasks from localStorage
export const loadTasks = () => {
  try {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

// Add a new task
export const addTask = (task) => {
  const tasks = loadTasks();
  const updatedTasks = [...tasks, task];
  return saveTasks(updatedTasks) ? updatedTasks : null;
};

// Update a task
export const updateTask = (taskId, updates) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId ? {...task, ...updates} : task
  );
  return saveTasks(updatedTasks) ? updatedTasks : null;
};

// Delete a task
export const deleteTask = (taskId) => {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  return saveTasks(updatedTasks) ? updatedTasks : null;
};