"use client";

import { Task } from "@/types/types"; 
import { motion } from "framer-motion";
import React, { useState } from "react";

const isValidOption = <T extends string>(value: string, options: readonly T[]): value is T =>
  options.includes(value as T);

const STATUS_OPTIONS = ['TODO', 'IN_PROGRESS', 'DONE'] as const;
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'] as const;
const CATEGORY_OPTIONS = ['GENERAL', 'WORK', 'PERSONAL'] as const;

type Status = typeof STATUS_OPTIONS[number];
type Priority = typeof PRIORITY_OPTIONS[number];
type Category = typeof CATEGORY_OPTIONS[number];

const TaskForm: React.FC<{
  onTaskAdded: (task: Task) => void;
  onCancel: () => void;
  initialTask?: Task;
  initialStatus?: Status;
}> = ({ onTaskAdded, onCancel, initialTask, initialStatus }) => {
  const [task, setTask] = useState<Task>({
    id: initialTask?.id,
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    status: (initialTask?.status || initialStatus || "TODO") as Status,
    priority: (initialTask?.priority || "MEDIUM") as Priority,
    category: (initialTask?.category || "GENERAL") as Category,
    dueDate: initialTask?.dueDate || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedTask = { ...task };
    if (!initialTask) {
      delete submittedTask.id;
    }
    onTaskAdded(submittedTask);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="bg-background-light rounded-xl p-4 mb-4"
    >
      <div className="mb-4">
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          placeholder="Task title"
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          placeholder="Task description"
          rows={3}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {initialTask && (
          <div>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={(e) => {
                const value = e.target.value;
                if (isValidOption(value, STATUS_OPTIONS)) {
                  setTask({ ...task, status: value });
                }
              }}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>
        )}
        <div>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={(e) => {
              const value = e.target.value;
              if (isValidOption(value, PRIORITY_OPTIONS)) {
                setTask({ ...task, priority: value });
              }
            }}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={(e) => {
              const value = e.target.value;
              if (isValidOption(value, CATEGORY_OPTIONS)) {
                setTask({ ...task, category: value });
              }
            }}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="GENERAL">General</option>
            <option value="WORK">Work</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {initialTask ? "Update Task" : "Create Task"}
        </button>
      </div>
    </motion.form>
  );
};

export default TaskForm;
