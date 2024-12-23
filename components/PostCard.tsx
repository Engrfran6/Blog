'use client';

import {Card, CardContent} from '@/components/ui/card';

import {cn, Post} from '@/lib/utils';
import {ArrowUpRightIcon} from 'lucide-react';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';

export type PostCardProps = {
  post: Post;
};

const PostCard = ({post}: PostCardProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const authorName = `${post.author?.firstname || 'Unknown'} ${post.author?.lastname || ''}`.trim();

  const handlePost = (_postId: string, authorName: string, title: string) => {
    router.push(
      `/post/${_postId}?author=${encodeURIComponent(authorName)}&title=${encodeURIComponent(title)}`
    );
  };

  return (
    <Card className="group">
      <CardContent className="p-0">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl[0]}
            alt={post.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="text-red-500">No image avalaible for this post</div>
        )}
        <div className="p-2">
          <div className="flex items-center space-x-2 text-sm mb-2">
            <span>{authorName}</span>
            <span>•</span>
            <span className="text-gray-500">{post.date}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
            {post.title}
            <button onClick={() => handlePost(post._id, authorName, post.title)}>
              <ArrowUpRightIcon className="ml-2 opacity-100 group-hover:opacity-100 transition-opacity border rounded-full bg-slate-100" />
            </button>
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={`tag-${tag}`}
                className={cn(
                  'px-3 py-1 text-sm rounded-full',
                  tag === 'Design' && 'bg-purple-100 text-purple-700',
                  tag === 'Research' && 'bg-blue-100 text-blue-700',
                  tag === 'Leadership' && 'bg-green-100 text-green-700',
                  tag === 'Management' && 'bg-yellow-100 text-yellow-700',
                  tag === 'Product' && 'bg-orange-100 text-orange-700',
                  tag === 'Frameworks' && 'bg-red-100 text-red-700'
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
export default PostCard;
