'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import truncateString from '@/lib/truncateString';
import PaginationNavigation from '@/components/client/paginationNavigation';
import getPostsQueryFn from '@/lib/postsQueryFns';
import formatDateTime from '@/lib/formateDateTime';
import { useQuery } from '@tanstack/react-query';
import { Post as PostType } from '@/types/apiTypes';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PostsProps = {
  start: number;
  end: number;
  page: string | string[] | undefined;
  perPage: string | string[] | undefined;
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
        {entries?.map((entry) => (
          <Link
            className="flex cursor-pointer"
            key={entry.id}
            href={`/post/${entry.id}`}
          >
            <Card className="grid grid-rows-[12rem,auto,8rem] w-full my-4 md:my-0 mx-auto box-content">
              <CardHeader>
                <div className="w-full h-36 md:h-36 relative">
                  <Image
                    src={`https://picsum.photos/seed/${entry.id}/600/400`}
                    alt="post image"
                    fill
                    sizes="100%"
                    priority={true}
                    className="object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent className="items-start">
                <CardDescription className=" text-base hover:underline">
                  <span className="text-2xl block mb-1 capitalize">
                    {entry.title}
                  </span>
                  <span className="text-xs block mb-4">
                    {formatDateTime(entry.createdAt)}
                  </span>
                  <span>{truncateString(entry.description)}</span>
                </CardDescription>
              </CardContent>
              <CardFooter className="grid grid-cols-1 items-end">
                {entry.authors.map((author) => (
                  <div key={author.id} className="flex my-2 gap-4 items-center">
                    <Avatar>
                      <AvatarImage src={author.avatar} alt="avatar" />
                      <AvatarFallback className="relative">
                        <Image
                          src={`https://picsum.photos/seed/author_${author.id}/100`}
                          alt="kc"
                          fill
                          sizes="100%"
                          className="object-cover"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <CardDescription>{author.name}</CardDescription>
                  </div>
                ))}
              </CardFooter>
            </Card>
          </Link>
        ))}
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
