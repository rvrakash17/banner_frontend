import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = ({ visible, description, link, timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [isBannerVisible, setIsBannerVisible] = useState(visible);

  useEffect(() => {
    // Reset timeLeft and visibility when the timer or visible prop changes
    setTimeLeft(timer);
    setIsBannerVisible(visible);

    let interval;

    if (visible) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval); // Stop interval when time reaches 0
            setIsBannerVisible(false); // Hide banner when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or when dependencies change

  }, [visible, timer]); // Only depend on visible and timer

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  if (!isBannerVisible) return null;

  return (
    <div className="banner">
      <p>{description}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer">Click here</a>}
      <div className="timer">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Banner;
