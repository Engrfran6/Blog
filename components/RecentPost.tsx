'use client';
import {Post} from '@/lib/utils';
import {RecentPostCard} from './RecentPostCard';

type RecentPostProps = {
  recentPosts: Post[];
};

const RecentPost = ({recentPosts}: RecentPostProps) => {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold mb-8">Recent blog posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {recentPosts
          ?.slice(-4)
          .toReversed()
          .map((recentPost, index) => (
            <RecentPostCard recentPost={recentPost} index={index} key={index} />
          ))}
      </div>
    </section>
  );
};

export default RecentPost;
