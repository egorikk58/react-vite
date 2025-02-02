import { useState, useEffect } from "react";
import api from "@/api";
import { IPost ,ICreatePostRequest, IUpdatePostRequest } from "@/api/post/types";

export default function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post.getPosts();

      if (response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        throw new Error("Некорректный формат данных постов");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err instanceof Error ? err : new Error("Ошибка загрузки"));
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data: ICreatePostRequest) => {
    try {
      const response = await api.post.createPost(data);
      setPosts((prev) => [response.data, ...prev]);
    } catch (err) {
      console.error("Error creating post:", err);
      throw err;
    }
  };

  const updatePost = async (postId: number, data: IUpdatePostRequest) => {
    try {
      const response = await api.post.updatePost(postId, data);
      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? response.data : post))
      );
    } catch (err) {
      console.error("Error updating post:", err);
      throw err;
    }
  };

  const deletePost = async (postId: number) => {
    try {
      await api.post.deletePost(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, fetchPosts, createPost, updatePost, deletePost };
}