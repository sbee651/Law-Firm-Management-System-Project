// Authentication helper for managing tokens and session state

export const saveAuthToken = (token, role, userEmail) => {
  localStorage.setItem('jwt_token', token);
  localStorage.setItem('user_role', role);
  localStorage.setItem('user_email', userEmail);
};

export const getAuthToken = () => {
  return localStorage.getItem('jwt_token');
};

export const getUserRole = () => {
  return localStorage.getItem('user_role');
};

export const clearAuthSession = () => {
  localStorage.removeItem('jwt_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_email');
};