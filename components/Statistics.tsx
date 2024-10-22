import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlusCircle, FaPencilAlt, FaFolder } from 'react-icons/fa';

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  subtext: string;
  color: string;
}

const StatCard: React.FC<StatProps> = ({ icon, value, label, subtext, color }) => (
  <motion.div
    className={`bg-black p-4 rounded-lg shadow-md flex items-center`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`${color} p-3 rounded-full mr-4`}>
      {icon}
    </div>
    <div>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold text-white mr-2">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
      <p className="text-xs text-gray-500">{subtext}</p>
    </div>
  </motion.div>
);

interface StatisticsProps {
  totalProjects: number;
  completedProjects: number;
  updatedProjects: number;
  newProjects: number;
}

export default function Statistics({ totalProjects, completedProjects, updatedProjects, newProjects }: StatisticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background-light text-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={<FaFolder className="text-2xl" />}
          value={totalProjects}
          label="Total Tasks"
          subtext="All tasks"
          color="bg-background-light"
        />
        <StatCard 
          icon={<FaCheckCircle className="text-2xl" />}
          value={completedProjects}
          label="Completed"
          subtext="Tasks completed"
          color="bg-green-500"
        />
        <StatCard 
          icon={<FaPencilAlt className="text-2xl" />}
          value={updatedProjects}
          label="In Progress"
          subtext="Tasks being worked on"
          color="bg-yellow-500"
        />
        <StatCard 
          icon={<FaPlusCircle className="text-2xl" />}
          value={newProjects}
          label="Overdue"
          subtext="Tasks past due date"
          color="bg-red-500"
        />
      </div>
    </motion.div>
  );
}
