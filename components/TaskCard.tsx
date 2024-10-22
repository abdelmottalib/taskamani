import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaEllipsisH,
  FaTrash
} from "react-icons/fa";
import CategoryBadge from "./CategoryBadge";
import TaskForm from "./TaskForm";

import { Task } from "@/types/types"; 

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const colorClass = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  }[priority.toLowerCase()] || "bg-gray-500";

  return (
    <span className={`text-[10px] xs:text-xs font-semibold px-1 py-0.5 xs:px-2 xs:py-1 rounded-full ${colorClass}`}>
      {priority}
    </span>
  );
};
interface TaskCardProps extends Task {
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  category,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
  onClick,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if (!e.defaultPrevented && !isEditing) {
      setShowOptions(false);
      onClick();
    }
  };

  const handleOptionsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleTaskEdited = (editedTask: Task) => {
    onEdit({ ...editedTask, id });
    setIsEditing(false);
  };

  return (
    <motion.div
      className="bg-background-light rounded-xl p-4 mb-4 relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      {isEditing ? (
        <div onClick={(e) => e.stopPropagation()}>
          <TaskForm
            onTaskAdded={handleTaskEdited}
            onCancel={() => setIsEditing(false)}
            initialTask={{
              id,
              title,
              description,
              category,
              status,
              priority,
              dueDate,
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3
              className="text-lg font-semibold text-white truncate max-w-[80%]"
              title={title}
            >
              {title}
            </h3>
            <button
              className="text-gray-400 hover:text-white"
              onClick={handleOptionsClick}
            >
              <FaEllipsisH />
            </button>
          </div>
          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute right-0 top-8 py-2 w-48 bg-black rounded-md shadow-xl z-20"
            >
              <button
                className="block px-4 py-2 text-sm capitalize text-gray-300 hover:bg-[#1D1F20] hover:text-white w-full text-left"
                onClick={handleEditClick}
              >
                <FaEdit className="inline mr-2" /> Edit
              </button>
              <button
                className="block px-4 py-2 text-sm capitalize text-gray-300 hover:bg-[#1D1F20] hover:text-white w-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id!);
                }}
              >
                <FaTrash className="inline mr-2" /> Delete
              </button>
            </div>
          )}
          <p className="text-sm text-gray-400 mb-3 break-words line-clamp-4">
            {description}
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <CategoryBadge category={category} />
              <div className="flex flex-col items-end">
                <PriorityBadge priority={priority} />
                {dueDate && (
                  <div className="text-[10px] mt-2 xs:text-xs text-blue-400 ">
                    Due: {new Date(dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TaskCard;
