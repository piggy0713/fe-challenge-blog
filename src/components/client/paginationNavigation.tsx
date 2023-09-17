'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type PaginationNavigationProps = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

const PaginationNavigation: FC<PaginationNavigationProps> = ({
  hasNextPage,
  hasPreviousPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  console.log('page', page);
  const perPage = searchParams.get('perPage') ?? '5';

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
