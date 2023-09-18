import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import '@testing-library/jest-dom';
import PostClient from '@/components/client/post/post.client';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

it('rendering post correctly', async () => {
  const queryClient = new QueryClient();
  (useQuery as jest.Mock).mockReturnValue({
    data: {
      id: '123',
      title: 'Mock Post Title',
      description: 'Mock Post Description',
      createdAt: '2021-09-17T20:00:00.000Z',
      updatedAt: '2021-09-17T20:00:00.000Z',
      authors: [],
      comments: [],
    },
    isLoading: false,
    isError: false,
  });

  render(
    <QueryClientProvider client={queryClient}>
      <PostClient postId="123" />
    </QueryClientProvider>,
  );

  expect(screen.getByText('Mock Post Title')).toBeInTheDocument();
  expect(screen.getByText('Mock Post Description')).toBeInTheDocument();
});
