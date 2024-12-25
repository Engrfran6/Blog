'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserAction = async (formdata: FormData) => {
  try {
    const rawFormData = {
      userId: formdata.get('userId'),
      username: formdata.get('username'),
      firstname: formdata.get('firstname'),
      lastname: formdata.get('lastname'),
    };

    const response = await fetch(`${baseUrl}/api/auth/settings/userinfo`, {
      method: 'POST',
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      return {success: false, error: `Network response was not ok: ${response.statusText}`};
    }

    const data = await response.json();

    return {success: true, data: data, message: 'Username and user info updated successfully'};
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};
export const updatePasswordAction = async (formdata: FormData) => {
  try {
    const rawFormData = {
      userId: formdata.get('userId'),
      password: formdata.get('password'),
      newPassword: formdata.get('newPassword'),
    };

    const response = await fetch(`${baseUrl}/api/auth/settings/password`, {
      method: 'POST',
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      return {success: false, error: `Failed to update paasword: ${response.statusText}`};
    }

    return {success: true, message: 'Password updated successfully'};
  } catch (error) {
    console.error('Error submitting proccessing request:', error);
    throw error;
  }
};

export const profileUploadAction = async (formdata: FormData) => {
  const rawFormData = {
    userId: formdata.get('userId'),
    imageUrl: formdata.get('imageUrl'),
  };

  try {
    const response = await fetch(`${baseUrl}/api/auth/settings/photo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawFormData),
    });

    if (!response.ok) {
      return {success: false, error: `Failed to upload profile photo: ${response.statusText}`};
    }

    const {photo} = await response.json();

    return {
      success: true,
      data: photo,
      message: 'Profile photo updated successfully!',
    };
  } catch (error) {
    console.log('Error: Failed to upload profile photo:', error);
  }
};
