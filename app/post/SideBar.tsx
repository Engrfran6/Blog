import {cn, Post} from '@/lib/utils';
import SideBarCard from './SideBarCard';

type SideBarPost = {
  posts: Post[];
  isSideBarRight?: boolean;
  isMypost?: boolean;
  handlePost: (_postId: string, authorName: string, title: string) => void;
};

const SideBar = ({posts, isSideBarRight, isMypost, handlePost}: SideBarPost) => {
  return (
    <aside className="lg:w-64 shrink-0">
      <div className="sticky top-28">
        <h2 className={cn('text-lg font-semibold mb-4', isSideBarRight ? 'hidden lg:block' : '')}>
          {isSideBarRight ? ' All blog posts' : isMypost ? 'My Posts' : 'Recent blog posts'}
        </h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <SideBarCard post={post} key={post._id} handlePost={handlePost} />
          ))}
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
// <PostCard post={post} key={post.id} isSidebar={true} />;
