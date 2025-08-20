import React, { useState, useEffect } from "react";

export default function Task() {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Form state
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState(""); 
  const [priority, setPriority] = useState("medium"); // New state for priority

  // Progress form state
  const [progressDate, setProgressDate] = useState("");
  const [progressNote, setProgressNote] = useState("");
  const [editProgressIdx, setEditProgressIdx] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [progressPage, setProgressPage] = useState(1);
  const [progressPerPage] = useState(5);

  // Available categories
  const categories = ["Project A", "Testing", "Bug Fixing", "Documentation", "Meeting"];
  
  // Priority options with their colors
  const priorities = [
    { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-800" },
    { value: "high", label: "High", color: "bg-red-100 text-red-800" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    setTasks(saved ? JSON.parse(saved) : []);
  }, []);

  // Pagination calculations for tasks
  const indexOfLastTask = currentPage * rowsPerPage;
  const indexOfFirstTask = indexOfLastTask - rowsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / rowsPerPage);

  // Pagination function for tasks
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic for progress items
  const getProgressItems = () => {
    if (!selectedTask || !selectedTask.progress || !Array.isArray(selectedTask.progress)) {
      return [];
    }
    const indexOfLastProgress = progressPage * progressPerPage;
    const indexOfFirstProgress = indexOfLastProgress - progressPerPage;
    return selectedTask.progress.slice(indexOfFirstProgress, indexOfLastProgress);
  };

  const totalProgressPages = selectedTask?.progress 
    ? Math.ceil(selectedTask.progress.length / progressPerPage) 
    : 0;

  // Pagination function for progress
  const paginateProgress = (pageNumber) => setProgressPage(pageNumber);

  // Function to get color based on status
  const getStatusColors = (status) => {
    switch(status) {
      case "completed":
        return {
          bg: "bg-green-50",
          border: "border-green-500",
          badge: "bg-green-200 text-green-800"
        };
      case "pending":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-500",
          badge: "bg-yellow-200 text-yellow-800"
        };
      case "on-progress":
        return {
          bg: "bg-blue-50",
          border: "border-blue-500",
          badge: "bg-blue-200 text-blue-800"
        };
      case "cancelled":
        return {
          bg: "bg-red-50",
          border: "border-red-500",
          badge: "bg-red-200 text-red-800"
        };
      case "on-hold":
        return {
          bg: "bg-purple-50",
          border: "border-purple-500",
          badge: "bg-purple-200 text-purple-800"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-500",
          badge: "bg-gray-200 text-gray-800"
        };
    }
  };

  // Format status text
  const formatStatus = (status) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Tambah task baru
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title || !startDate) return;
    const newTask = {
      id: Date.now(),
      title,
      description: "",
      status: "pending",
      startDate,
      endDate: endDate || "",
      category: category || "Uncategorized",
      priority: priority || "medium", // Add priority field
      progress: [], // Ensure this is always initialized as an empty array
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTitle("");
    setStartDate("");
    setEndDate("");
    setCategory("");
    setPriority("medium"); // Reset priority
    setShowAddModal(false);
  };

  // Get unique categories from tasks for display
  const getUniqueCategories = () => {
    const uniqueCategories = new Set(tasks.map(task => task.category || "Uncategorized"));
    return Array.from(uniqueCategories);
  };

  // Tampilkan modal detail
  const handleShowDetail = (task) => {
    // Make sure progress is always an array
    const taskWithProgress = {
      ...task,
      progress: Array.isArray(task.progress) ? task.progress : []
    };
    setSelectedTask(taskWithProgress);
    setProgressDate("");
    setProgressNote("");
    setEditProgressIdx(null);
    setProgressPage(1);
    setShowDetailModal(true);
  };

  // Tutup modal detail
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTask(null);
    setProgressDate("");
    setProgressNote("");
    setEditProgressIdx(null);
  };

  // Ubah status task
  const toggleStatus = (id) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        // Set end date when task is completed, clear it when moved back to pending
        const newEndDate = newStatus === "completed" ? 
          (task.endDate || new Date().toISOString().split('T')[0]) : "";
        
        return { ...task, status: newStatus, endDate: newEndDate };
      }
      return task;
    });
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  // Hapus task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updated = tasks.filter((task) => task.id !== id);
      setTasks(updated);
      localStorage.setItem("tasks", JSON.stringify(updated));
    }
  };

  // Tambah atau edit progress
  const handleAddOrEditProgress = (e) => {
    e.preventDefault();
    if (!progressDate || !progressNote) return;
    let updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        let newProgress = [...(task.progress || [])];
        if (editProgressIdx !== null) {
          // Edit progress
          newProgress[editProgressIdx] = { date: progressDate, note: progressNote };
        } else {
          // Add progress
          newProgress.push({ date: progressDate, note: progressNote });
        }
        return { ...task, progress: newProgress };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // Update selectedTask in modal
    const updatedSelected = updatedTasks.find((t) => t.id === selectedTask.id);
    setSelectedTask(updatedSelected);
    setProgressDate("");
    setProgressNote("");
    setEditProgressIdx(null);
  };
  
  const handleDeleteProgress = (idx) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        let newProgress = [...(task.progress || [])];
        newProgress.splice(idx, 1);
        return { ...task, progress: newProgress };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    // Update selectedTask in modal
    const updatedSelected = updatedTasks.find((t) => t.id === selectedTask.id);
    setSelectedTask(updatedSelected);
    setEditProgressIdx(null);
    setProgressDate("");
    setProgressNote("");
  };

  // Edit progress
  const handleEditProgress = (idx) => {
    setEditProgressIdx(idx);
    setProgressDate(selectedTask.progress[idx].date);
    setProgressNote(selectedTask.progress[idx].note);
  };

  // Batal edit progress
  const handleCancelEditProgress = () => {
    setEditProgressIdx(null);
    setProgressDate("");
    setProgressNote("");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition font-semibold"
        >
          <i className="fa-solid fa-plus mr-2"></i> Add Task
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada task.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left">No</th>
                <th className="px-4 py-2 border-b text-left">Title</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
                <th className="px-4 py-2 border-b text-left">Priority</th>
                <th className="px-4 py-2 border-b text-left">Start Date</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, idx) => {
                const colorSet = getStatusColors(task.status);
                const priorityColor = priorities.find(p => p.value === task.priority)?.color || "bg-gray-200 text-gray-800";
                
                return (
                  <tr
                    key={task.id}
                    className={colorSet.bg}
                  >
                    <td className="px-4 py-2 border-b">{indexOfFirstTask + idx + 1}</td>
                    <td className="px-4 py-2 border-b">{task.title}</td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${colorSet.badge}`}
                      >
                        {formatStatus(task.status)}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {task.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>
                        {task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : "Medium"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">{task.startDate}</td>
                    <td className="px-4 py-2 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShowDetail(task)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded text-lg flex items-center justify-center"
                          title="Detail & Progress"
                        >
                          <i className="fa-solid fa-list-check"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded text-lg flex items-center justify-center"
                          title="Delete"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {/* Pagination for tasks */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <nav className="flex items-center">
                <button 
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  &laquo;
                </button>
                
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => paginate(idx + 1)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  >
                    {idx + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </div>
      )}

      {/* Modal Add Task */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Task</h2>
            <form onSubmit={handleAddTask}>
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 font-semibold w-1/3">Title</td>
                    <td>
                      <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold">Category</td>
                    <td>
                      <select
                        className="border rounded px-3 py-2 w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold">Priority</td>
                    <td>
                      <div className="flex gap-4">
                        {priorities.map(p => (
                          <label key={p.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="priority"
                              value={p.value}
                              checked={priority === p.value}
                              onChange={() => setPriority(p.value)}
                              className="form-radio text-indigo-600"
                            />
                            <span className={`px-2 py-1 rounded-full text-xs ${p.color}`}>
                              {p.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold">Start Date</td>
                    <td>
                      <input
                        type="date"
                        className="border rounded px-3 py-2 w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold">End Date</td>
                    <td>
                      <input
                        type="date"
                        className="border rounded px-3 py-2 w-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition font-semibold text-lg"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail & Progress */}
      {showDetailModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
            <button
              onClick={handleCloseDetailModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Task Detail & Progress</h2>
            <div className="mb-4">
              <div className="mb-2">
                <span className="font-semibold">Title:</span> {selectedTask.title}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColors(selectedTask.status).badge}`}
                >
                  {formatStatus(selectedTask.status)}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Category:</span>{" "}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {selectedTask.category || "Uncategorized"}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Start Date:</span> {selectedTask.startDate}
              </div>
              {selectedTask.endDate && (
                <div>
                  <span className="font-semibold">End Date:</span> {selectedTask.endDate}
                </div>
              )}
            </div>
            <hr className="my-4" />
            <h3 className="text-lg font-bold mb-2">Progress</h3>
            {/* Form tambah/edit progress */}
            <form onSubmit={handleAddOrEditProgress} className="flex gap-2 mb-4">
              <input
                type="date"
                className="border rounded px-3 py-2"
                value={progressDate}
                onChange={(e) => setProgressDate(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Kegiatan"
                className="border rounded px-3 py-2 flex-1"
                value={progressNote}
                onChange={(e) => setProgressNote(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`${
                  editProgressIdx !== null
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white px-4 py-2 rounded transition flex items-center gap-2`}
              >
                <i className={`fa-solid ${editProgressIdx !== null ? "fa-pen-to-square" : "fa-plus"}`}></i>
                {editProgressIdx !== null ? "Save" : "Add"}
              </button>
              {editProgressIdx !== null && (
                <button
                  type="button"
                  onClick={handleCancelEditProgress}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
                >
                  Cancel
                </button>
              )}
            </form>
            {/* Tabel progress */}
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b text-left">Tanggal</th>
                  <th className="px-4 py-2 border-b text-left">Kegiatan</th>
                  <th className="px-4 py-2 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {!selectedTask.progress || selectedTask.progress.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-500 py-4">
                      Belum ada progress.
                    </td>
                  </tr>
                ) : (
                  getProgressItems().map((item, idx) => {
                    const actualIdx = (progressPage - 1) * progressPerPage + idx;
                    return (
                      <tr key={actualIdx}>
                        <td className="px-4 py-2 border-b">{item.date}</td>
                        <td className="px-4 py-2 border-b">{item.note}</td>
                        <td className="px-4 py-2 border-b flex gap-2">
                          <button
                            onClick={() => handleEditProgress(actualIdx)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteProgress(actualIdx)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            
            {/* Pagination for progress */}
            {totalProgressPages > 1 && (
              <div className="flex justify-center mt-4">
                <nav className="flex items-center">
                  <button 
                    onClick={() => paginateProgress(progressPage > 1 ? progressPage - 1 : 1)}
                    disabled={progressPage === 1}
                    className={`mx-1 px-3 py-1 rounded ${progressPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  >
                    &laquo;
                  </button>
                  
                  {[...Array(totalProgressPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => paginateProgress(idx + 1)}
                      className={`mx-1 px-3 py-1 rounded ${progressPage === idx + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => paginateProgress(progressPage < totalProgressPages ? progressPage + 1 : totalProgressPages)}
                    disabled={progressPage === totalProgressPages}
                    className={`mx-1 px-3 py-1 rounded ${progressPage === totalProgressPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                  >
                    &raquo;
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}