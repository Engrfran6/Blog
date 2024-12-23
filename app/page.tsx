'use client';

import Hero from '@/components/Hero';
import Posts from '@/components/Posts';
import {setPosts} from '@/redux/features/postSlice';
import {selectPosts} from '@/redux/selector';
import {RootState} from '@/redux/store';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from './data';

export default function BlogPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        dispatch(setPosts(fetchedPosts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const posts = useSelector((state: RootState) => selectPosts(state));

  return (
    <div>
      {posts && (
        <div>
          <Hero Posts={posts} />
          <Posts Posts={posts} />
        </div>
      )}
    </div>
  );
}
