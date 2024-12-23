import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import postsReducer from './features/postSlice';
import usersReducer from './features/userSlice';

// Persist Config for the `user` reducer
const userPersistConfig = {
  key: 'user',
  storage,
};
const postPersistConfig = {
  key: 'posts',
  storage,
};

// Wrap the `usersReducer` with persistReducer
const persistedPostReducer = persistReducer(userPersistConfig, postsReducer);
const persistedUserReducer = persistReducer(postPersistConfig, usersReducer);

const store = configureStore({
  reducer: {
    posts: persistedPostReducer,
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store); // To persist the store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
