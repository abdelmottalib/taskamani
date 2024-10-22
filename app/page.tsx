"use client";

import { useState, useEffect } from 'react';
import Dashboard from "@/components/Dashboard";
import Statistics from "@/components/Statistics";

export default function Home() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStats({
          totalTasks: data.totalTasks,
          completedTasks: data.completedTasks,
          inProgressTasks: data.tasksByStatus.IN_PROGRESS || 0,
          overdueTasks: data.overdueTasks,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Dashboard>
      <h1 className="text-3xl font-semibold mb-6 text-white">Dashboard</h1>
      <Statistics
        totalProjects={stats.totalTasks}
        completedProjects={stats.completedTasks}
        updatedProjects={stats.inProgressTasks}
        newProjects={stats.overdueTasks}
      />
    </Dashboard>
  );
}
