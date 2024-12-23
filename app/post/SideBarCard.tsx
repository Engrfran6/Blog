'use client';

import {Card, CardContent} from '@/components/ui/card';
import {Post} from '@/lib/utils';
import Image from 'next/image';

type SideBarCardPostProps = {
  post: Post;
  handlePost: (_postId: string, authorName: string, title: string) => void;
};

const SideBarCard = ({post, handlePost}: SideBarCardPostProps) => {
  return (
    <Card
      className="group cursor-pointer"
      onClick={() =>
        handlePost(
          post._id,
          `${post.author?.firstname || 'Unknown'} ${post.author?.lastname || ''}`,
          post.title
        )
      }>
      <CardContent className="p-1 flex gap-2">
        <div className="w-[100px] h-[50px] overflow-hidden rounded">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl[0]}
              alt={post.title}
              width={100}
              height={70}
              className="rounded object-cover w-full h-full"
            />
          ) : (
            <div className="text-red-500">No image available for this post</div>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium truncate group-hover:text-blue-600">{post.title}</h3>
          <div className="flex flex-col justify-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{`${post.author?.firstname || 'Unknown'} ${post.author?.lastname || ''}`}</span>
            {/* <span>•</span> */}
            <span>{new Date(post.date).toISOString().split('T')[0]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideBarCard;
