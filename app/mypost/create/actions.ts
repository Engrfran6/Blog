'use server';

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export async function createPost(prev: {message: string}, formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    date: formData.get('date') as string,
    description: formData.get('description') as string,
    tags: formData.getAll('tags'),
    imageUrl: formData.get('imageUrl') as string,
    author: formData.get('userId') as string,
  };

  const firstname = formData.get('firstname') as string;
  const lastname = formData.get('lastname') as string;
  const authorName = `${firstname} ${lastname}`;

  try {
    const response = await fetch(`${base_url}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawFormData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        post: null,
        success: false,
        message: `Failed to create post: ${response.statusText}`,
        redirect: null,
      };
    }

    return {
      post: responseData?.post,
      success: true,
      message: 'Post created successfully',
      redirect: `/mypost/${responseData?.post._id}?author=${encodeURIComponent(
        authorName
      )}&title=${encodeURIComponent(responseData?.post.title)}`,
    };
  } catch (error) {
    return {
      post: null,
      success: false,
      message: 'An unexpected error occurred while creating the post.',
      error,
    };
  }
}
