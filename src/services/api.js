const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3007';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/news/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};
