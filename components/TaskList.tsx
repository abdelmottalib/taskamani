import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskModal from "./TaskModal";
import { Task } from "@/types/types";
import TaskCard from "./TaskCard";
import { AnimatePresence } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onTaskSubmit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onTaskSubmit,
}) => {
  const [showForm, setShowForm] = useState<{ [key: string]: boolean }>({
    TODO: false,
    IN_PROGRESS: false,
    DONE: false,
  });
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const categoryMatch = categoryFilter === "all" || task.category.toLowerCase() === categoryFilter.toLowerCase();
      const priorityMatch = priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter.toLowerCase();
      return categoryMatch && priorityMatch;
    });
    setFilteredTasks(filtered);
  }, [tasks, categoryFilter, priorityFilter]);

  const handleAddTask = (status: string) => {
    setShowForm((prev) => ({ ...prev, [status]: true }));
  };

  const handleTaskAdded = (newTask: Task) => {
    setShowForm((prev) => ({ ...prev, [newTask.status]: false }));
    onTaskSubmit(newTask);
  };

  const groupedTasks: { [key: string]: Task[] } = {
    TODO: filteredTasks.filter((task) => task.status === "TODO"),
    IN_PROGRESS: filteredTasks.filter((task) => task.status === "IN_PROGRESS"),
    DONE: filteredTasks.filter((task) => task.status === "DONE"),
  };

  Object.keys(groupedTasks).forEach((status) => {
    groupedTasks[status as keyof typeof groupedTasks].sort((a, b) => {
      const aUpdated = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bUpdated = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      if (aUpdated !== bUpdated) {
        return bUpdated - aUpdated;
      }
      return (b.createdAt ? new Date(b.createdAt).getTime() : 0) - 
             (a.createdAt ? new Date(a.createdAt).getTime() : 0);
    });
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${categoryFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-background-light text-gray-300 hover:bg-blue-500 hover:text-white'}`}
            onClick={() => setCategoryFilter('all')}
          >
            All Categories
          </button>
          {['work', 'personal', 'general'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${categoryFilter === category ? 'bg-blue-500 text-white' : 'bg-background-light text-gray-300 hover:bg-blue-500 hover:text-white'}`}
              onClick={() => setCategoryFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${priorityFilter === 'all' ? 'bg-purple-500 text-white' : 'bg-background-light text-gray-300 hover:bg-purple-500 hover:text-white'}`}
            onClick={() => setPriorityFilter('all')}
          >
            All Priorities
          </button>
          {['low', 'medium', 'high'].map((priority) => (
            <button
              key={priority}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${priorityFilter === priority ? 'bg-purple-500 text-white' : 'bg-background-light text-gray-300 hover:bg-purple-500 hover:text-white'}`}
              onClick={() => setPriorityFilter(priority)}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          <div key={status} className="bg-background-dark p-4 rounded-xl">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  status === "TODO"
                    ? "bg-purple-500"
                    : status === "IN_PROGRESS"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              ></span>
              {status.replace("_", " ")}
              <span className="ml-2 text-gray-400">{statusTasks.length}</span>
            </h2>
            {showForm[status] ? (
              <TaskForm
                onTaskAdded={handleTaskAdded}
                onCancel={() =>
                  setShowForm((prev) => ({ ...prev, [status]: false }))
                }
                initialStatus={status as "TODO" | "IN_PROGRESS" | "DONE"}
              />
            ) : (
              <button
                className="w-full text-center text-2xl text-gray-100 hover:text-white bg-background-light rounded-xl p-4 mb-4"
                onClick={() => handleAddTask(status)}
              >
                +
              </button>
            )}
            <AnimatePresence>
              {statusTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  {...task}
                  onEdit={(editedTask) => onTaskSubmit(editedTask)}
                  onDelete={onDelete}
                  onClick={() => handleTaskClick(task)}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default TaskList;
