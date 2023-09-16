export async function getPostsQueryFn ()  {
  const res = await fetch(
    'https://6144e843411c860017d256f0.mockapi.io/api/v1/posts',
  );
  const json = await res.json();

  return json;
};


