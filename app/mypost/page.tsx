'use client';

import {RootState} from '@/redux/store';
import {useSelector} from 'react-redux';

export default function Page() {
  const post = useSelector((state: RootState) => state.user.user?.posts?.length);
  return (
    <div className="flex justify-center items-center w-full min-h-[75vh] mx-auto bg-slate-50 p-14 ">
      {post ? (
        <span className="text-purple-700">Click to preview post</span>
      ) : (
        <span className="text-red-700">No post found</span>
      )}
    </div>
  );
}
