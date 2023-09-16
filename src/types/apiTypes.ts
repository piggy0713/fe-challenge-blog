type Author = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  avatar: string;
};

type Comment = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
}

export type Post = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authors: Author[];
  comments: Comment[];
};