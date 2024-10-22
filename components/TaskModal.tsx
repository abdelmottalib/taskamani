import React, { useEffect } from "react";
import { Task } from "@/types/types";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CategoryBadge from "./CategoryBadge";
import PriorityBadge from "./PriorityBadge";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose }) => {
 
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background-light rounded-xl p-6 max-w-2xl w-full mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <h2
              className="text-2xl font-bold text-white truncate max-w-[90%]"
              title={task.title}
            >
              {task.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <CategoryBadge category={task.category} />
            <PriorityBadge priority={task.priority} />
          </div>
          <div className="mb-6">
            <p className="text-gray-300 whitespace-pre-wrap break-words mt-2">
              {task.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Status</p>
              <p className="text-white">{task.status}</p>
            </div>
            {task.dueDate && (
              <div>
                <p className="text-gray-400">Due Date</p>
                <p className="text-blue-400">
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskModal;
