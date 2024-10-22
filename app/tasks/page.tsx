"use client";

import React, { useState, useEffect } from 'react';
import Dashboard from "@/components/Dashboard";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { Task } from '@/types/types';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskSubmit = async (taskData: Task) => {
    try {
      const isNewTask = !taskData.id;
      const url = isNewTask ? '/api/tasks' : `/api/tasks/${taskData.id}`;
      const method = isNewTask ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save task');
      }
      
      const savedTask = await response.json();
      
      if (isNewTask) {
        setTasks(prevTasks => [savedTask, ...prevTasks]);
      } else {
        setTasks(prevTasks => prevTasks.map(task => 
          task.id === savedTask.id ? savedTask : task
        ));
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Dashboard>
      <h1 className="text-3xl font-semibold mb-6 text-white">Tasks</h1>
      <TaskList 
        tasks={tasks} 
        onDelete={handleDeleteTask}
        onTaskSubmit={handleTaskSubmit}
      />
    </Dashboard>
  );
}
