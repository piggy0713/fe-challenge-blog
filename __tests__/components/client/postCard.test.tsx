/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/client/postCard';
import { Post } from '@/types/apiTypes';

describe('PostCard', () => {
  const mockPost: Post = {
    id: '1',
    title: 'title',
    description: 'description',
    createdAt: '2021-08-06T05:29:26.039Z',
    updatedAt: '2021-08-06T05:29:26.039Z',
    authors: [
      {
        id: '1',
        name: 'test author 1',
        createdAt: '',
        updatedAt: '',
        postId: '',
        avatar: '',
      },
      {
        id: '2',
        name: 'test author 2',
        createdAt: '',
        updatedAt: '',
        postId: '',
        avatar: '',
      },
    ],
    comments: [],
  };
  it('should render post card', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(screen.queryByText('description')).toBeInTheDocument();
    expect(screen.queryByText('August 6, 2021')).toBeInTheDocument();
  });

  it('renders all authors', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.queryByText('test author 1')).toBeInTheDocument();
    expect(screen.queryByText('test author 2')).toBeInTheDocument();
  });

  //test there are 3 img tags
  it('renders 3 images', () => {
    render(<PostCard post={mockPost} />);
    const images = screen.queryAllByRole('img');
    expect(images.length).toBe(3);
  });

  it('renders invalid date for wrong date', () => {
    const mockPost: Post = {
      id: '1',
      title: 'title',
      description: 'description',
      createdAt: 'wrong date',
      updatedAt: 'wrong date',
      authors: [],
      comments: [],
    };
    render(<PostCard post={mockPost} />);
    expect(screen.queryByText('Invalid Date')).toBeInTheDocument();
  });
});
