const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const colorClass =
    {
      low: "bg-green-500",
      medium: "bg-yellow-500",
      high: "bg-red-500",
    }[priority.toLowerCase()] || "bg-gray-500";

  return (
    <span
      className={`text-[10px] xs:text-xs font-semibold px-1 py-0.5 xs:px-2 xs:py-1 rounded-full ${colorClass}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
