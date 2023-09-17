'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import truncateString from '@/lib/truncateString';
import PaginationNavigation from '@/components/client/paginationNavigation';
import { useQuery } from '@tanstack/react-query';
import { Post as PostType } from '@/types/apiTypes';
import { getPostsQueryFn } from '@/lib/postsQueryFns';
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
};

const Posts: React.FC<PostsProps> = ({ start, end }) => {
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
          <Card
            className="grid grid-rows-[12rem,auto,8rem] w-full my-4 md:my-0 mx-auto box-content"
            key={entry.id}
          >
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
              <Link href={`/post/${entry.id}`}>
                <CardDescription className="cursor-pointer text-xl hover:underline">
                  {truncateString(entry.description)}
                </CardDescription>
              </Link>
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
        ))}
      </div>
      <div className="flex justify-center">
        <PaginationNavigation
          hasNextPage={end < data?.length}
          hasPreviousPage={start > 0}
        />
      </div>
    </>
  );
};

export default Posts;
