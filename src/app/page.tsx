import { dehydrate,Hydrate } from '@tanstack/react-query';
import {getPostsQueryFn} from '@/lib/postsQueryFns';
import getQueryClient from '@/lib/getQueryClient';
import Posts from '@/components/client/posts/posts.client';


export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], getPostsQueryFn);
  const dehydratedState = dehydrate(queryClient);
      

  return (
    <Hydrate state={dehydratedState}>
      <div>Blog</div>
      <Posts />
    </Hydrate>

  )
}
