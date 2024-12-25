'use client';

import {selectPostsByUserId} from '@/redux/selector';
import {RootState} from '@/redux/store';
import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import SideBar from '../post/SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isMypost = true; // Update logic here as needed
  const userId = useSelector((state: RootState) => state.user.user?._id);

  const userPosts = useSelector((state: RootState) => selectPostsByUserId(`${userId}`)(state));

  const handlePost = (_postId: string, authorName: string, title: string) => {
    router.push(
      `/mypost/${_postId}?author=${encodeURIComponent(authorName)}&title=${encodeURIComponent(
        title
      )}`
    );
  };

  return (
    <div className="min-h-[85vh] ">
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex flex-col-reverse lg:flex-row gap-8 w-full">
              <div className="flex flex-col border p-4">
                <SideBar isMypost={isMypost} posts={userPosts} handlePost={handlePost} />
                {!userPosts ||
                  (userPosts.length === 0 && (
                    <div className="text-red-700 italic">No posts found for this user.</div>
                  ))}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
