// src/utils/tokenValidation.js
import Cookies from 'js-cookie';

export const validateToken = async () => {
  const token = Cookies.get('authToken');
  
  if (!token) {
    return { valid: false, message: 'No token found' };
  }

  try {
    // Replace with your backend API endpoint that validates the token
    const response = await fetch('/api/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return { valid: false, message: 'Invalid token' };
    }

    const data = await response.json();

    if (data.isValid) {
      return { valid: true, message: 'Token is valid' };
    } else {
      return { valid: false, message: 'Invalid token' };
    }
  } catch (error) {
    return { valid: false, message: 'Error validating token' };
  }
};
