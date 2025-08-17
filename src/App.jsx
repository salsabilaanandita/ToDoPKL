import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Task from "./pages/Task";
import Status from "./pages/Status";
import { useEffect } from "react";
import { loadTasks } from "./utils/storage";

function App() {
  // Initialize localStorage if needed
  useEffect(() => {
    // Check if tasks exist in localStorage
    const tasks = localStorage.getItem("tasks");
    if (!tasks) {
      // Initialize with empty array if not exists
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);

  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1 md:ml-64 pt-20 md:pt-10">
          <div className="p-4 md:p-6 mt-4 md:mt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<Task />} />
              <Route path="/status" element={<Status />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;