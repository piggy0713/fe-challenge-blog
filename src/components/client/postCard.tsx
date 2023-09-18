import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import truncateString from '@/lib/truncateString';
import formatDateTime from '@/lib/formateDateTime';
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post as PostType } from '@/types/apiTypes';

type PostCardProps = {
  post: PostType;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link
      className="flex cursor-pointer"
      key={post.id}
      href={`/post/${post.id}`}
    >
      <Card className="grid grid-rows-[12rem,auto,8rem] w-full my-4 md:my-0 mx-auto box-content">
        <CardHeader>
          <div className="w-full h-36 md:h-36 relative">
            <Image
              src={`https://picsum.photos/seed/${post.id}/600/400`}
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
            <span className="text-2xl block mb-1 capitalize">{post.title}</span>
            <span className="text-xs block mb-4">
              {formatDateTime(post.createdAt)}
            </span>
            <span>{truncateString(post.description)}</span>
          </CardDescription>
        </CardContent>
        <CardFooter className="grid grid-cols-1 items-end">
          {post.authors.map((author) => (
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
  );
};

export default PostCard;
