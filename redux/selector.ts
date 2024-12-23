import {RootState} from '@/redux/store';
import {createSelector} from 'reselect';

// Base selector to get posts state
const selectPostsState = (state: RootState) => state.posts.posts;

// Memoized selector for all user posts
export const selectPosts = createSelector([selectPostsState], (posts) => posts);

// Memoized selector for a single post by ID
export const selectPostById = (postId: string) =>
  createSelector([selectPostsState], (posts) => posts.find((post) => post._id === postId));

// Memoized selector for posts by a specific user ID
export const selectPostsByUserId = (userId: string) =>
  createSelector([selectPostsState], (posts) => posts.filter((post) => post.author._id === userId));
