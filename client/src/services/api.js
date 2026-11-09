const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = {
      status: response.status,
      message: data.error || 'Error en la solicitud'
    };
    throw error;
  }
  return data;
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  },
  post: async (endpoint, body) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return handleResponse(response);
  }
};