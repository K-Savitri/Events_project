// components/CategoryLabel.tsx
import React from 'react';

interface CategoryLabelProps {
  label: string;
  color: string;
}

const CategoryLabel: React.FC<CategoryLabelProps> = ({ label, color }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span
        style={{
          height: '10px',
          width: '10px',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block',
        }}
      />
      <span>{label}</span>
    </div>
  );
};

export default CategoryLabel;
