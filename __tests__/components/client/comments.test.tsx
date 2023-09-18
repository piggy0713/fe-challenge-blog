import { render, screen } from '@testing-library/react';
import Comments from '@/components/client/comments';
import { Comment as CommentType } from '@/types/apiTypes';

describe('Comments', () => {
  const mockComments: CommentType[] = [
    {
      id: '1',
      title: 'comment 1',
      description: 'description 1',
      createdAt: '2021-08-06T05:29:26.039Z',
      updatedAt: '2021-08-06T05:29:26.039Z',
      postId: '1',
    },
    {
      id: '2',
      title: 'comment 2',
      description: 'description 2',
      createdAt: '2021-09-06T05:29:26.039Z',
      updatedAt: '2021-09-06T05:29:26.039Z',
      postId: '1',
    },
  ];

  it('should render comments', () => {
    render(<Comments comments={mockComments} />);

    expect(screen.queryByText('comment 1')).toBeInTheDocument();
    expect(screen.queryByText('description 1')).toBeInTheDocument();
    expect(screen.queryByText('August 6, 2021')).toBeInTheDocument();
    expect(screen.queryByText('comment 2')).toBeInTheDocument();
    expect(screen.queryByText('description 2')).toBeInTheDocument();
    expect(screen.queryByText('September 6, 2021')).toBeInTheDocument();
  });
});
