import {Post} from '@/lib/utils';
import Image from 'next/image';

interface SinglePostProps {
  post: Post;
}

const SinglePost = ({post}: SinglePostProps) => {
  return (
    <section className=" max-w-none">
      <h1>{post.title}</h1>
      <div className="mb-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{`${post.author?.firstname} ${post.author?.lastname}`.trim()}</span>
        <span>•</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <div className="w-full h-[400px] overflow-hidden">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl[0]}
            alt={post.title}
            width={500}
            height={500}
            className=" rounded-lg object-cover"
          />
        ) : (
          <p className=" text-gray-500 dark:text-gray-400">No image available for this post.</p>
        )}
      </div>
      <p className="my-5">{post.description}</p>
    </section>
  );
};

export default SinglePost;
