'use server';

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const loginAction = async (prev: {message: string}, formData: FormData) => {
  const rawFormData = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch(`${base_url}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(rawFormData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {message: responseData.error || ' Login failed'};
    }
    return {
      message: responseData.success || 'Login successful.',
      user: responseData.user,
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {message: 'An unexpected error occurred.'};
  }
};

export const registerAction = async (prev: {message: string}, formData: FormData) => {
  const rawFormData = {
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    dob: formData.get('dob'),
    location: formData.get('location'),
    // photo: formData.get('photo'),
    username: formData.get('username'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch(`${base_url}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(rawFormData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {message: responseData.error || 'Registration failed.'};
    }

    return {
      message: responseData.success || 'Registration successful.',
      user: responseData.user,
    };
  } catch (error) {
    console.error(error || 'An unexpected error occurred.');
    return {message: 'An unexpected error occurred.'};
  }
};
