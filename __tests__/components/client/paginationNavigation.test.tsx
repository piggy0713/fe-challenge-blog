import React from 'react';
import PaginationNavigation from '@/components/client/paginationNavigation';
import { render, screen } from '@testing-library/react';
import { AppRouterContextProviderMock } from '../../../mocks/appRouterMock';

describe('PaginationNavigation', () => {
  it('renders both buttons', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <PaginationNavigation
          hasNextPage={true}
          hasPreviousPage={true}
          page="2"
          perPage="5"
        />
      </AppRouterContextProviderMock>,
    );

    expect(screen.queryByText('Previous')).toBeInTheDocument();
    expect(screen.queryByText('Next')).toBeInTheDocument();
  });

  it('show disabled buttons when hasNextPage and hasPreviousPage are false', () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <PaginationNavigation
          hasNextPage={true}
          hasPreviousPage={false}
          page="1"
          perPage="5"
        />
      </AppRouterContextProviderMock>,
    );

    expect(screen.queryByText('Previous')?.parentElement).toBeDisabled();
    expect(screen.queryByText('Next')?.parentElement).not.toBeDisabled();
  });
});
