'use client';

import React from 'react';
import PaginationNavigation from '@/components/client/paginationNavigation';
import PostCard from '@/components/client/postCard';
import getPostsQueryFn from '@/lib/postsQueryFns';
import { useQuery } from '@tanstack/react-query';
import { Post as PostType } from '@/types/apiTypes';

type PostsProps = {
  start: number;
  end: number;
  page?: string;
  perPage?: string;
};

const Posts: React.FC<PostsProps> = ({ start, end, page, perPage }) => {
  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: getPostsQueryFn,
  });

  const entries = data?.slice(start, end);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col m-6 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-5 ">
        {entries?.map((entry) => <PostCard key={entry.id} post={entry} />)}
      </div>
      <div className="flex justify-center mb-6">
        <PaginationNavigation
          hasNextPage={end < (data?.length ?? 0)}
          hasPreviousPage={start > 0}
          page={page}
          perPage={perPage}
        />
      </div>
    </>
  );
};

export default Posts;
