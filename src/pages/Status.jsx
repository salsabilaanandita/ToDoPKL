import React, { useState, useEffect } from "react";

export default function Status() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    setTasks(saved ? JSON.parse(saved) : []);
  }, []);

  // Function to update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? {...task, status: newStatus} : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Available statuses
  const statuses = [
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "on-progress", label: "on Progress", color: "blue" },
    { value: "completed", label: "Completed", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "red" },
    { value: "on-hold", label: "On Hold", color: "purple" }
  ];

  // Get color set for a status
  const getColorSet = (status) => {
    const statusObj = statuses.find(s => s.value === status) || statuses[0];
    const color = statusObj.color;
    
    const colorSets = {
      "yellow": {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        badge: "bg-yellow-200 text-yellow-800"
      },
      "green": {
        bg: "bg-green-50",
        border: "border-green-500",
        badge: "bg-green-200 text-green-800"
      },
      "blue": {
        bg: "bg-blue-50",
        border: "border-blue-500",
        badge: "bg-blue-200 text-blue-800"
      },
      "red": {
        bg: "bg-red-50",
        border: "border-red-500",
        badge: "bg-red-200 text-red-800"
      },
      "purple": {
        bg: "bg-purple-50",
        border: "border-purple-500",
        badge: "bg-purple-200 text-purple-800"
      }
    };
    
    return colorSets[color];
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Status Management</h1>
      
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          Belum ada task. Tambahkan task baru!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasks.map((task) => {
            const colorSet = getColorSet(task.status);
            
            return (
              <div
                key={task.id}
                className={`p-5 rounded-xl shadow-lg min-h-[200px] flex flex-col justify-between ${colorSet.bg} border-l-4 ${colorSet.border}`}
              >
                <h2 className="text-xl font-semibold mb-3">{task.title}</h2>
                <p className="text-gray-700 mb-4 text-sm">{task.description}</p>
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <select 
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${colorSet.badge} appearance-none pr-8 cursor-pointer`}
                    >
                      {statuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  {/* <span className="text-gray-600 text-sm">
                    Due: {task.dueDate}
                  </span> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}