import React from 'react';

interface SmallHeaderProps {
  title: string;
}

const SmallHeader: React.FC<SmallHeaderProps> = ({ title }) => {
  return (
    <div className="small-header">
    <h2>{title}</h2>
  </div>
  
  );
};

export default SmallHeader;