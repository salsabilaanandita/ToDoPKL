import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import AddTask from "../pages/AddTask";
import Task from "../pages/Task";
import Status from "../pages/Status";
// import Pending from "../pages/Pending";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Task />} />
      <Route path="/status" element={<Status />} />
      {/* <Route path="/pending" element={<Pending />} /> */}
    </Routes>
  );
}