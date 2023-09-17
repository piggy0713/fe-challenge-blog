import getQueryClient from '@/lib/getQueryClient';
import { dehydrate, Hydrate } from '@tanstack/react-query';
import getPostQueryFn from '@/lib/postQueryFns';
import PostClient from '@/components/client/post/post.client';

export default async function Post({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['post'], getPostQueryFn(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <PostClient postId={params.id} />
    </Hydrate>
  );
}
