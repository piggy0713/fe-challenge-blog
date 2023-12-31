'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import formatDateTime from '@/lib/formateDateTime';
import getPostQueryFn from '@/lib/postQueryFns';
import Comments from '@/components/client/comments';
import { useQuery } from '@tanstack/react-query';
import { Post as PostType } from '@/types/apiTypes';
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
          <div className="mt-3 flex justify-center space-x-3">
            <div className="space-y-2 md:space-y-0 md:flex itme-center gap-6">
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
      <Comments comments={sortedComments ?? []} />
    </div>
  );
};

export default PostClient;
