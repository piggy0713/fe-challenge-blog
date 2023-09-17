const getPostQueryFn = (postId: string) => async () => {
  const res = await fetch(
    `https://6144e843411c860017d256f0.mockapi.io/api/v1/posts/${postId}`,
    { next: { revalidate: 86400 } },
  );
  const data = await res.json();

  return data;
};

export default getPostQueryFn;
