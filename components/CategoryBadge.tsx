import React from 'react';

const categoryColors: { [key: string]: string } = {
  work: '#55B1DF',
  personal: '#DEB2EB',
  general: '#98D5BB',
  other: '#817DEC',
};

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getBadgeColor = (category: string): string => {
    return categoryColors[category.toLowerCase()] || categoryColors.other;
  };

  return (
    <span 
      className="text-xs font-semibold px-2.5 py-0.5 rounded inline-block" 
      style={{ backgroundColor: getBadgeColor(category), color: '#1A1C1E' }}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
