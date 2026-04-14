/**
 * API Configuration
 * 
 * This file centralizes the backend endpoint configuration for the TMS Japfa frontend.
 * In Monorepo mode, we use relative paths to route to Vercel Serverless Functions.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'; // Target the separate backend

export const API_ENDPOINTS = {
    AUTH: `${API_BASE_URL}/api/auth`,
    MONITORING: `${API_BASE_URL}/api/monitoring`,
    ORDERS: `${API_BASE_URL}/api/orders`,
    TRUCKS: `${API_BASE_URL}/api/trucks`,
    ANALYTICS: `${API_BASE_URL}/api/analytics`,
    ROUTING: `${API_BASE_URL}/api/routing`,
};

export default {
    API_BASE_URL,
    API_ENDPOINTS
};
