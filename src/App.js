import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { fetchBanner } from './apiOperations'; // Import the API operations
import './App.css';

function App() {
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

  return (
    <Router>
      <div>
        <Banner
          visible={banner.visible}
          description={banner.description}
          link={banner.link}
          timer={banner.timer}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<center><h1>Home Page</h1></center>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
