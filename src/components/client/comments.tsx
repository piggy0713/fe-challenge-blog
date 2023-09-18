import formatDateTime from '@/lib/formateDateTime';
import { Comment as CommentType } from '@/types/apiTypes';
import React from 'react';

type CommentsProps = {
  comments: CommentType[];
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="container mx-auto max-w-screen-lg py-5 lg:py-8 mt-10 border-t border-gray-800">
      <h2 className="mb-8 mt-4 capitalize text-3xl lg:text-4xl">Comments</h2>
      {comments?.map((comment) => (
        <div key={comment.id} className="mb-8">
          <div className="flex space-x-4 font-semibold">{comment.title}</div>
          <div className="text-xs mb-2">
            {formatDateTime(comment.createdAt)}
          </div>
          <div>{comment.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
