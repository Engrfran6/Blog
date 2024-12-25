'use client';

import {deletePostAction} from '@/app/mypost/[singleid]/actions';
import PostForm from '@/app/post/PostForm';
import SinglePost from '@/app/post/SinglePost';
import {ToastAction} from '@/components/ui/toast';
import {useToast} from '@/hooks/use-toast';
import {deletePost} from '@/redux/features/postSlice';
import {selectPostById} from '@/redux/selector';
import {RootState} from '@/redux/store';
import {Edit2Icon, LucideDelete, Undo2Icon} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const Page = () => {
  const {toast} = useToast();
  const {singleid} = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const singlePostById = useSelector((state: RootState) => selectPostById(`${singleid}`)(state));

  if (!singlePostById) {
    return <div>Post not found</div>;
  }

  const handleDeletePost = async (postId: string) => {
    try {
      const result = await deletePostAction(postId);

      if (result.success) {
        toast({
          variant: 'success',
          title: 'Post deleted successfully',
          description: result.message,
        });
        dispatch(deletePost(postId));

        router.push('/mypost');
      } else {
        toast({
          variant: 'destructive',
          title: 'Post deleted successfully',
          description: result.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error('Unexpected error while deleting post:', error);
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full">
      {isEdit ? (
        <PostForm post={singlePostById} type="update" />
      ) : (
        <SinglePost post={singlePostById} />
      )}

      <div className="flex gap-4 mt-20">
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          {isEdit ? (
            <>
              Cancel <Undo2Icon />
            </>
          ) : (
            <>
              Update Post <Edit2Icon />
            </>
          )}
        </button>

        <button
          className="inline-flex gap-2 px-4 py-2 bg-red-600 text-white rounded-md"
          onClick={() => handleDeletePost(singlePostById._id)}>
          Delete Post <LucideDelete />
        </button>
      </div>
    </main>
  );
};
export default Page;
