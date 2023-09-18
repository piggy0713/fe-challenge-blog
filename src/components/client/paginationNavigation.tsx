'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type PaginationNavigationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page?: string;
  perPage?: string;
};

const PaginationNavigation: FC<PaginationNavigationProps> = ({
  hasNextPage,
  hasPreviousPage,
  page,
  perPage,
}) => {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        size="lg"
        disabled={!hasPreviousPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&perPage=${perPage}`);
        }}
        className="bg-white w-36 text-slate-500"
      >
        &lt;&nbsp; <span>Previous</span>
      </Button>

      <Button
        variant="outline"
        size="lg"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&perPage=${perPage}`);
        }}
        className="bg-white w-36 text-slate-500"
      >
        <span>Next</span> &nbsp;&gt;
      </Button>
    </div>
  );
};

export default PaginationNavigation;
