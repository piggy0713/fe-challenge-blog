import React from 'react';
import Posts from '@/components/client/posts/posts.client';
import { render, screen } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '../../../../mocks/appRouterMock';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

it('renders posts correctly', async () => {
  const queryClient = new QueryClient();
  const push = jest.fn();
  (useQuery as jest.Mock).mockReturnValue({
    data: [
      {
        id: '1',
        title: 'Post 1',
        description: 'Description 1',
        createdAt: '2021-09-17T20:00:00.000Z',
        updatedAt: '2021-09-17T20:00:00.000Z',
        authors: [],
        comments: [],
      },
      {
        id: '2',
        title: 'Post 2',
        description: 'Description 2',
        createdAt: '2021-10-17T20:00:00.000Z',
        updatedAt: '2021-10-17T20:00:00.000Z',
        authors: [],
        comments: [],
      },
    ],
    isLoading: false,
    isError: false,
  });

  render(
    <QueryClientProvider client={queryClient}>
      <AppRouterContextProviderMock router={{ push }}>
        <Posts start={0} end={2} page="1" perPage="5" />
      </AppRouterContextProviderMock>
    </QueryClientProvider>,
  );

  expect(screen.getByText('Post 1')).toBeInTheDocument();
  expect(screen.getByText('Description 1')).toBeInTheDocument();
  expect(screen.getByText('Post 2')).toBeInTheDocument();
  expect(screen.getByText('Description 2')).toBeInTheDocument();
});
