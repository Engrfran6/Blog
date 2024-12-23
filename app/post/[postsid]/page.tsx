'use client';

import {selectPostById} from '@/redux/selector';
import {RootState} from '@/redux/store';
import {useParams} from 'next/navigation';
import {useSelector} from 'react-redux';
import SinglePost from '../SinglePost';

const Page = () => {
  const {postsid} = useParams();
  const postById = useSelector((state: RootState) => selectPostById(`${postsid}`)(state));

  if (!postById) {
    return <div>Post not found</div>;
  }

  return (
    <main className="flex-1 max-w-7xl w-full">
      <SinglePost post={postById} />
    </main>
  );
};

export default Page;
