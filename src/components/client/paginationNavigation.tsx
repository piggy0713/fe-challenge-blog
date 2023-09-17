'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type PaginationNavigationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: string | string[] | undefined;
  perPage: string | string[] | undefined;
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
        <ChevronLeft />
        Previous
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
        Next
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationNavigation;
