'use client';

import {cn, Post} from '@/lib/utils';
import {useState} from 'react';
import PostCard from './PostCard';
import {Button} from './ui/button';

export type PostProps = {
  Posts: Post[];
};

const Posts = ({Posts}: PostProps) => {
  const postsPerPage = 20; // Number of posts per page
  const totalPages = Math.ceil(Posts.length / postsPerPage); // Total pages based on posts
  const [activePage, setActivePage] = useState<number>(1);
  const [visiblePage, setVisiblePage] = useState<number[]>([1, 2, 3, 4]);

  const handleClick = (page: number) => {
    setActivePage(page);

    // Adjust the sliding window of numbers
    if (page === visiblePage[visiblePage.length - 1] && page < totalPages) {
      const newVisiblePages = visiblePage.map((n) => n + 1).filter((n) => n <= totalPages);
      setVisiblePage(newVisiblePages);
    } else if (page === visiblePage[0] && page > 1) {
      const newVisiblePages = visiblePage.map((n) => n - 1).filter((n) => n > 0);
      setVisiblePage(newVisiblePages);
    }
  };

  // Determine the posts to display on the current page
  const currentPosts = Posts.slice((activePage - 1) * postsPerPage, activePage * postsPerPage);

  return (
    <main className="container mx-auto px-4 py-12">
      <section>
        <h2 className="text-xl font-semibold mb-8">All blog posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={activePage === 1}
            onClick={() => handleClick(activePage - 1)}>
            Previous
          </Button>
          <div className="flex items-center space-x-2">
            {visiblePage.map((page) => (
              <Button
                key={page}
                variant={page === activePage ? 'default' : 'ghost'}
                className={cn('w-10 h-10')}
                onClick={() => handleClick(page)}>
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            disabled={activePage === totalPages}
            onClick={() => handleClick(activePage + 1)}>
            Next
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Posts;
