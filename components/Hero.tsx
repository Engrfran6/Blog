'use client';
import {PostProps} from './Posts';
import RecentPost from './RecentPost';

const Hero = ({Posts}: PostProps) => {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-7xl font-bold tracking-tighter mb-16 text-center">THE BLOG</h1>
      <RecentPost recentPosts={Posts} />
    </main>
  );
};

export default Hero;
