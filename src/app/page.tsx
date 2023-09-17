import { dehydrate, Hydrate } from '@tanstack/react-query';
import getPostsQueryFn from '@/lib/postsQueryFns';
import getQueryClient from '@/lib/getQueryClient';
import Posts from '@/components/client/posts/posts.client';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams['page'] ?? '1';
  const perPage = searchParams['perPage'] ?? '5';
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], getPostsQueryFn);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="flex justify-center flex-col box-content">
        <h1 className="text-5xl my-12 text-center justify-center">Blog</h1>
        <Posts page={page} perPage={perPage} start={start} end={end} />
      </div>
    </Hydrate>
  );
}
