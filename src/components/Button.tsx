import React from 'react';

interface ButtonProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode; // Add this line
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  startIcon,
  endIcon,
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} className="btn">
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
