import React, { useState, useEffect } from 'react';
import { fetchBanner, updateBanner } from '../apiOperations'; // Import the API functions
import './Dashboard.css';

const Dashboard = () => {
  const [banner, setBanner] = useState({
    visible: false,
    description: '',
    timer: 0,
    link: ''
  });

  useEffect(() => {
    const getBannerData = async () => {
      const bannerData = await fetchBanner();
      setBanner(bannerData);
    };

    getBannerData();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setBanner({
      ...banner,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    try {
      await updateBanner(banner); // Save the banner data
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };
  

  return (
    <div className="container">
      <h2>Internal Dashboard</h2>
      <form>
        <label>
          Banner Description:
          <input
            type="text"
            name="description"
            value={banner.description}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label>
          Banner Timer (in seconds):
          <input
            type="number"
            name="timer"
            value={banner.timer}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label>
          Banner Link:
          <input
            type="text"
            name="link"
            value={banner.link}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label>
          Banner Visible:
          <input
            type="checkbox"
            name="visible"
            checked={banner.visible}
            onChange={handleChange}
            className="form-checkbox"
          />
        </label>
        <button type="button" onClick={handleSave} className="primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
