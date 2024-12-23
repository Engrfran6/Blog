import {Post} from '@/lib/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },

    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
});

export const {setPosts, addPost, updatePost, deletePost} = postsSlice.actions;
export default postsSlice.reducer;
