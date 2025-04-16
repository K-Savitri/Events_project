import React, { useState } from 'react';


interface CategoryFilterProps {
  onFilterChange: (selectedCategories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilterChange }) => {
  const categories = [
    'Academic',
    'Cultural',
    'Sports',
    'Career',
    'Club',
    'Entertainment',
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryToggle = (category: string) => {
    const updatedSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedSelection);
    onFilterChange(updatedSelection);
  };

  return (
    <div className="category-filter">
      <h3>Filter Events</h3>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategories.includes(category) ? 'active' : ''
            }`}
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </button>
          
        ))}
        <button
  className="clear-button"
  onClick={() => {
    setSelectedCategories([]);
    onFilterChange([]);
  }}
>
  Clear Filters
</button>
      </div>
    </div>
  );
};

export default CategoryFilter;