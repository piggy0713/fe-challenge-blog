'use client';

import React from 'react';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import { Post as PostType } from '@/types/apiTypes';
import {getPostsQueryFn} from '@/lib/postsQueryFns';


export const Posts = () => {
  const {data , isLoading} = useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: getPostsQueryFn,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      {data?.map((post) => (
        <div key={post.id}>
          <Link href={`/post/${post.id}`}>
          <h2>{post.title}</h2>
          </Link>
        </div>
      )
      )}
    </div>
  )

};

export default Posts;
