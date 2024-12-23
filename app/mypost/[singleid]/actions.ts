'use server';

import {Post} from '@/lib/utils';

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const deletePostAction = async (
  postId: string
): Promise<{success: boolean; message: string}> => {
  try {
    const response = await fetch(`${base_url}/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {success: false, message: `Failed to delete post: ${response.statusText}`};
    }

    return {success: true, message: 'Post deleted successfully'};
  } catch (error) {
    console.error('Error deleting post:', error);
    return {success: false, message: 'An error occurred while deleting the post.'};
  }
};

export async function updatePostAction(prev: {message: string}, formData: FormData) {
  const postId = formData.get('postId');

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
    const response = await fetch(`${base_url}/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawFormData),
    });

    const updatedPost: Post = await response.json();

    if (!response.ok) {
      return {success: false, message: `Failed to update post: ${response.statusText}`};
    }

    // Redirect immediately
    return {
      post: updatedPost,
      success: true,
      message: 'Post updated successfully',
      redirect: `/mypost/${updatedPost?._id}?author=${encodeURIComponent(
        authorName
      )}&title=${encodeURIComponent(updatedPost?.title)}`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred while updating the post.',
      error,
    };
  }
}
