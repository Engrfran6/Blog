'use client';

import {UploadButton} from '@/lib/uploadthing';
import {Post} from '@/lib/utils';
import {addPost, updatePost} from '@/redux/features/postSlice';
import {RootState} from '@/redux/store';
import Form from 'next/form';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useActionState, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ClientUploadedFileData} from 'uploadthing/types';

import {ToastAction} from '@/components/ui/toast';
import {useToast} from '@/hooks/use-toast';
import {updatePostAction} from '../mypost/[singleid]/actions';
import {createPost} from '../mypost/create/actions';

type FormType = 'create' | 'update';

interface PostFormProps {
  type: FormType;
  post?: Post;
}

const PostForm = ({type, post}: PostFormProps) => {
  const [imageUrls, setImageUrls] = useState<ClientUploadedFileData<{imageUrl: string}>[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const {toast} = useToast();

  const isUpdate = type === 'update';

  const handlePostType = isUpdate ? updatePostAction : createPost;
  const handleStorePost = isUpdate ? updatePost : addPost;

  if (!user) {
    router.push('/login');
  }

  const initialState = {message: ''};

  const handleTagChange = (tag: string, isChecked: boolean) => {
    setSelectedTags((prevTags) =>
      isChecked ? [...prevTags, tag] : prevTags.filter((t) => t !== tag)
    );
  };

  const [state, formAction] = useActionState(
    async (prev: {message: string}, formData: FormData) => {
      if (!user) {
        return {message: 'User ID is required from user to create a post.'};
      }
      formData.append('userId', user._id);
      formData.append('firstname', user.firstname);
      formData.append('lastname', user.lastname);
      formData.append('postId', post?._id || '');
      selectedTags.forEach((tag) => formData.append('tags', tag));
      imageUrls.forEach((image) => formData.append(`imageUrl`, image.url));

      const result = await handlePostType(prev, formData);

      if (result?.success) {
        toast({
          variant: 'success',
          description: state.message,
        });

        dispatch(handleStorePost(result.post));

        if (result.success && result?.redirect) {
          router.push(result.redirect);
        }
      } else {
        toast({
          variant: 'destructive',

          description: state.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }

      return result;
    },
    initialState
  );

  const handleUploadComplete = (res: ClientUploadedFileData<{imageUrl: string}>[]) => {
    if (res.length > 0) {
      setImageUrls((prev) => [...prev, ...res]);
      toast({
        variant: 'success',
        title: 'Image upload',
        description: `Image with url: ${imageUrls[0]} has been uploaded successfully `,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Image upload failed',
        description: `Failed to upload the image with url: ${res[0].url}`,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const tags = ['Leadership', 'Innovation', 'Teamwork', 'Creativity', 'Collaboration'];

  return (
    <Form action={formAction} className="w-full">
      <div className="max-w-7xl w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">
          {isUpdate ? 'Update a New Post' : 'Create a New Post'}
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            defaultValue={isUpdate ? post?.title : ''}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Date */}
        <input
          name="date"
          type="hidden"
          id="date"
          value={isUpdate ? post?.date : new Date().toISOString().split('T')[0]}
        />

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={isUpdate ? post?.description : ''}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="w-full mt-4 p-1 border rounded-md bg-gray-100">
          <div className="h-[170px] md:h-[250px] overflow-hidden">
            {imageUrls?.map((image, index) => (
              <Image
                key={index}
                src={isUpdate ? post?.imageUrl[0] || '' : image?.url}
                alt={image?.name || 'image to m=be updated'}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            ))}
          </div>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            className="mt-4"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 my-6 w-full justify-center">
          {tags.map((tag) => (
            <div key={tag} className="flex gap-2">
              <input
                type="checkbox"
                id={`tag-${tag}`}
                defaultValue={isUpdate ? post?.tags : ''}
                onChange={(e) => handleTagChange(tag, e.target.checked)}
              />
              <span className="px-3 py-1 bg-slate-300 rounded-md">{tag}</span>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-md">
          {isUpdate ? 'Update Post' : ' Create Post'}
        </button>
      </div>
    </Form>
  );
};

export default PostForm;
