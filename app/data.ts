// 'use server';

import {notFound} from 'next/navigation';

export async function getPosts() {
  const res = await fetch('http://localhost:3000/api/posts');

  const posts = await res.json();
  if (!posts.length || !res.ok) notFound();
  return posts;
}

// async function getPost(id: string) {
//   const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
//     cache: 'force-cache',
//   });

//   const post: Post = await res.json();
//   if (!post) notFound();
//   return post;
// }

// export async function generateStaticParams() {
//   const posts: Post[] = await fetch('http://localhost:3000/api/posts', {
//     cache: 'force-cache',
//   }).then((res) => res.json());

//   return posts.map((post: Post) => ({
//     id: post._id,
//   }));
// }

// export async function generateMetadata({params}: {params: {id: string}}) {
//   const post = await getPost(params.id);

//   return {
//     title: post.title,
//   };
// }
