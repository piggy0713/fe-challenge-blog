'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import truncateString from '@/lib/truncateString';
import PaginationNavigation from '@/components/client/paginationNavigation';
import formatDateTime from '@/lib/formateDateTime';
import { useQuery } from '@tanstack/react-query';
import { Post as PostType } from '@/types/apiTypes';
import getPostQueryFn from '@/lib/postQueryFns';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PostProps = {
  postId: string;
};

const PostClient: React.FC<PostProps> = ({ postId }) => {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ['post'],
    queryFn: getPostQueryFn(postId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortedComments = data?.comments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <div className="container px-8 mx-auto xl:px-5  max-w-screen-lg py-5 lg:py-8 ">
        <div className="mx-auto  max-w-screen-md ">
          <h1 className="mb-8 mt-4 capitalize text-center justify-center  text-3xl font-semibold  lg:text-4xl">
            {data?.title}
          </h1>
          <div className="mt-3 flex justify-center space-x-3 text-white">
            <div className="flex itme-center gap-6">
              {data?.authors.map((author) => (
                <div key={author.id} className="flex flex-row gap-3">
                  <Avatar className="relative h-10 w-10 flex-shrink-0">
                    <AvatarImage src={author.avatar} alt="avatar" />
                    <AvatarFallback className="relative">
                      <Image
                        src={`https://picsum.photos/seed/author_${author.id}/100`}
                        alt={author.name}
                        fill
                        sizes="100%"
                        className="object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span>{author.name}</span>
                    <span className="flex items-center space-x-2 text-sm">
                      {formatDateTime(data?.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
        <Image
          src={`https://picsum.photos/seed/${data?.id}/1600/900`}
          alt="post image"
          fill
          sizes="100vw"
          priority={true}
          className="object-cover"
        />
      </div>
      <div className="container mx-auto max-w-screen-lg py-5 lg:py-8">
        <div>{data?.description}</div>
      </div>

      <div className="my-7 flex justify-center">
        <Link
          href="/"
          className=" rounded-full px-5 py-2 text-sm text-blue-500 "
        >
          ← View all posts
        </Link>
      </div>
      <div className="container mx-auto max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-800">
        <h2 className="mb-8 mt-4 capitalize text-3xl lg:text-4xl">Comments</h2>
        {sortedComments?.map((comment) => (
          <div key={comment.id} className="mb-8">
            <div className="flex space-x-4 font-semibold">{comment.title}</div>
            <div className="text-xs mb-2">
              {formatDateTime(comment.createdAt)}
            </div>
            <div>{comment.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostClient;
