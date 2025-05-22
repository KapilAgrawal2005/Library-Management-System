import axios from 'axios';

const api = axios.create({
    baseURL: 'https://library-management-system-zn3r.vercel.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Ensure credentials are included
        config.withCredentials = true;
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.error('Response error:', error);
        if (error.response?.status === 401) {
            // Redirect to login on authentication error
            window.location.href = '/login';
        } else if (error.response?.status === 404) {
            console.error('Resource not found:', error.config.url);
        } else if (error.response?.status === 400) {
            console.error('Bad request:', error.response.data);
            // If it's an authentication error, redirect to login
            if (error.response.data.message?.includes('not authenticated')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api; 