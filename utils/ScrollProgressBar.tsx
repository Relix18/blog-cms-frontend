import React, { useState, useEffect } from "react";

interface ScrollProgressBarProps {
  color?: string;
  height?: string;
  progress: number;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  color = "#4caf50",
  height = "5px",
  progress,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height,
        backgroundColor: color,
        zIndex: 1000,
        transition: "width 0.2s ease-out",
      }}
    />
  );
};

export default ScrollProgressBar;
