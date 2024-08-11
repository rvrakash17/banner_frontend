import axios from 'axios';

const API_URL = 'https://banner-backend.onrender.com/api';

// Fetch banner data
// Fetch banner data
export const fetchBanner = async () => {
    try {
      const response = await axios.get(`${API_URL}/banner`);
      return response.data || { visible: false, description: '', timer: 0, link: '' };
    } catch (error) {
      console.error('Error fetching banner data:', error);
      return { visible: false, description: '', timer: 0, link: '' };
    }
  };
  

// Update banner data
export const updateBanner = async (bannerData) => {
  try {
    const response = await axios.post(`${API_URL}/banner`, bannerData);
    return response.data;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
};
