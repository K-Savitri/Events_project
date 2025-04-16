import { useNavigate } from 'react-router-dom';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    
    <button onClick={handleBackClick} className="back-button">
      <i className="fa-solid fa-arrow-left"></i> Back
    </button>
  );
};

export default BackButton;
