'use client';

import {RootState} from '@/redux/store';
import {useRouter} from 'next/navigation';
import {useSelector} from 'react-redux';
import SideBar from './SideBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isSideBarRight = false; // Update logic here as needed
  const posts = useSelector((state: RootState) => state.posts.posts);

  const recentPost = posts.slice(0, 4);
  const olderPost = posts.slice(4);

  const handlePost = (_postId: string, authorName: string, title: string) => {
    router.push(
      `/post/${_postId}?author=${encodeURIComponent(authorName)}&title=${encodeURIComponent(title)}`
    );
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex flex-col-reverse lg:flex-row gap-8 w-full">
              <SideBar isSideBarRight={isSideBarRight} posts={recentPost} handlePost={handlePost} />
              {children}
            </div>
            <SideBar isSideBarRight={!isSideBarRight} posts={olderPost} handlePost={handlePost} />
          </div>
        </div>
      </div>
    </div>
  );
}
