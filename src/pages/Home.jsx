import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CheckCircle, Clock, AlertCircle, XCircle, PauseCircle } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    setTasks(saved ? JSON.parse(saved) : []);
  }, []);

  // Function to get color based on status
  const getStatusColors = (status) => {
    switch(status) {
      case "completed":
        return {
          bg: "bg-green-50",
          border: "border-green-500",
          badge: "bg-green-200 text-green-800",
          chart: "#4ade80"
        };
      case "pending":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-500",
          badge: "bg-yellow-200 text-yellow-800",
          chart: "#facc15"
        };
      case "on-progress":
        return {
          bg: "bg-blue-50",
          border: "border-blue-500",
          badge: "bg-blue-200 text-blue-800",
          chart: "#60a5fa"
        };
      case "cancelled":
        return {
          bg: "bg-red-50",
          border: "border-red-500",
          badge: "bg-red-200 text-red-800",
          chart: "#f87171"
        };
      case "on-hold":
        return {
          bg: "bg-purple-50",
          border: "border-purple-500",
          badge: "bg-purple-200 text-purple-800",
          chart: "#c084fc"
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-500",
          badge: "bg-gray-200 text-gray-800",
          chart: "#9ca3af"
        };
    }
  };

  // Count tasks by status for chart
  const statusCounts = {};
  tasks.forEach(task => {
    statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
  });

  // Prepare chart data
  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
    value: count,
    color: getStatusColors(status).chart
  }));

  // Total tasks
  const totalTasks = tasks.length;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

      {/* Statistic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <CheckCircle className="text-green-500 mb-2" />
          <p className="font-bold">{statusCounts["completed"] || 0}</p>
          <span className="text-sm text-gray-500">Completed</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Clock className="text-blue-500 mb-2" />
          <p className="font-bold">{statusCounts["on-progress"] || 0}</p>
          <span className="text-sm text-gray-500">On Progress</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <AlertCircle className="text-yellow-500 mb-2" />
          <p className="font-bold">{statusCounts["pending"] || 0}</p>
          <span className="text-sm text-gray-500">Pending</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <PauseCircle className="text-purple-500 mb-2" />
          <p className="font-bold">{statusCounts["on-hold"] || 0}</p>
          <span className="text-sm text-gray-500">On Hold</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <XCircle className="text-red-500 mb-2" />
          <p className="font-bold">{statusCounts["cancelled"] || 0}</p>
          <span className="text-sm text-gray-500">Cancelled</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Task Overview</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.slice(-2).reverse().map((task) => {
            const colorSet = getStatusColors(task.status);

            return (
              <div
                key={task.id}
                className={`p-6 rounded-xl shadow-lg ${colorSet.bg} border-l-4 ${colorSet.border}`}
              >
                <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
                <p className="text-gray-700 mb-2 text-sm">{task.description}</p>
                <div className="text-xs text-gray-600 mb-2">
                  <span>Start: {task.startDate || "Not set"}</span> | 
                  <span> End: {task.endDate || "Not set"}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${colorSet.badge}`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
