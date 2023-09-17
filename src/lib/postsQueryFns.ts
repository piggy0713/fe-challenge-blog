import { Post } from '@/types/apiTypes';

export default async function getPostsQueryFn() {
  const res = await fetch(
    'https://6144e843411c860017d256f0.mockapi.io/api/v1/posts',
    { next: { revalidate: 86400 } },
  );
  const json = await res.json();
  const sortedData = json.sort((a: Post, b: Post) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sortedData;
}
