import React from "react";

interface ScrollProgressBarProps {
  height?: string;
  progress: number;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  height = "5px",
  progress,
}) => {
  return (
    <div
      className={`bg-accentColor`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height,
        zIndex: 1000,
        transition: "width 0.2s ease-out",
      }}
    />
  );
};

export default ScrollProgressBar;
