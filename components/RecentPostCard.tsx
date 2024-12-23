'use client';
import {Card, CardContent} from '@/components/ui/card';

import {cn, Post} from '@/lib/utils';
import {ArrowUpRightIcon} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

type RecentPostCardProps = {
  recentPost: Post;
  index: number;
};

export const RecentPostCard = ({recentPost, index}: RecentPostCardProps) => {
  const router = useRouter();

  const handlePost = (id: string, author: string, title: string) => {
    router.push(
      `/post/${id}?author=${encodeURIComponent(author)}&title=${encodeURIComponent(title)}`
    );
  };

  const authorName = `${recentPost.author?.firstname || 'Unknown'} ${
    recentPost.author?.lastname || ''
  }`.trim();

  return (
    <Card
      className={cn(
        'group overflow-hidden',
        index === 0 && 'lg:row-span-2',
        index === 3 && 'lg:col-span-2 mt-20'
      )}>
      <CardContent
        className={cn(
          'p-0 gap-6',
          (index === 1 || index === 2) && 'md:grid md:grid-cols-2',
          index === 0 && 'lg:grid lg:grid-cols-1',
          index === 3 && 'lg:grid lg:grid-cols-2'
        )}>
        {recentPost.imageUrl ? (
          <Image
            src={recentPost.imageUrl[0]}
            alt={recentPost.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="text-red-500">No image avalaible for this post</div>
        )}
        <div className="p-2">
          <div className="flex items-center space-x-2 text-sm mb-2 text-purple-700">
            <span>{authorName}</span>
            <span>•</span>
            <span>{recentPost.date}</span>
          </div>

          <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
            {recentPost.title}
            <button onClick={() => handlePost(recentPost._id, authorName, recentPost.title)}>
              <ArrowUpRightIcon className="ml-2 opacity-100 group-hover:opacity-100 transition-opacity border rounded-full bg-slate-100" />
            </button>
          </h3>
          <p
            className={cn(
              'mb-4',
              (index === 1 || index === 2) && 'line-clamp-1',
              index === 0 && 'line-clamp-4',
              index === 3 && 'line-clamp-2'
            )}>
            {recentPost.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {recentPost.tags?.map((tag, tagIndex) => (
              <span
                key={`${recentPost._id}-${tag}-${tagIndex}`}
                className={cn(
                  'px-3 py-1 text-sm rounded-full',
                  tag === 'Design' && 'bg-purple-100 text-purple-700',
                  tag === 'Research' && 'bg-blue-100 text-blue-700',
                  tag === 'Presentation' && 'bg-pink-100 text-pink-700',
                  tag === 'Development' && 'bg-green-100 text-green-700',
                  tag === 'Leadership' && 'bg-yellow-100 text-yellow-700',
                  tag === 'Management' && 'bg-gray-100 text-gray-700',
                  tag === 'Strategy' && 'bg-orange-100 text-orange-700',
                  tag === 'Marketing' && 'bg-red-100 text-red-700',
                  tag === 'Technology' && 'bg-indigo-100 text-indigo-700',
                  tag === 'Innovation' && 'bg-teal-100 text-teal-700',
                  tag === 'Education' && 'bg-cyan-100 text-cyan-700',
                  tag === '' && 'bg-gray-200 text-gray-800'
                )}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
