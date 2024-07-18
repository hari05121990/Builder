// axios
import axios from 'axios';
const BaseURL = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/' });

// ==============================|| AXIOS SERVICES ||============================== //

BaseURL.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default BaseURL;
