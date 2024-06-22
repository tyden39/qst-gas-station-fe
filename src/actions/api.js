import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'https://api.qspeco.com', // Replace with your base URL
  timeout: 10000, // Set a timeout limit (10 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token to headers if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Server Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened while setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Centralized error handling function
const handleError = (error) => {
  // Customize error handling logic as needed
  if (error.response) {
    // Handle server errors
    switch (error.response.status) {
      case 400:
        // Handle bad request
        break;
      case 401:
        // Handle unauthorized
        break;
      case 403:
        // Handle forbidden
        break;
      case 404:
        // Handle not found
        break;
      case 500:
        // Handle internal server error
        break;
      default:
        // Handle other statuses
        break;
    }
  } else if (error.request) {
    // Handle network errors
    alert('Network error. Please try again later.');
  } else {
    // Handle unexpected errors
    alert('An unexpected error occurred. Please try again later.');
  }
};

// Service layer with common HTTP methods
const apiService = {
  get: async (url, params = {}) => {
    try {
      return await axiosInstance.get(url, { params });
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      return await axiosInstance.post(url, data);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      return await axiosInstance.put(url, data);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      return await axiosInstance.delete(url);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default apiService;