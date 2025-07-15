import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateTo = ({ to, triggerNextStep, onNavigate }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
    if (onNavigate) {
      onNavigate();
    }
    if (triggerNextStep) {
      setTimeout(() => {
        triggerNextStep();
      }, 0);  // Ensure that the next step is triggered after navigation completes
    }
  }, [navigate, to, triggerNextStep, onNavigate]);

  return null;
};

export default NavigateTo;

