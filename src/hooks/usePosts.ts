// hooks/usePosts.ts
import { useEffect, useState } from "react";
import api from "@/api";
import { IPost } from "@/api/post/types";

const usePosts = (params?: { status?: "draft" | "published", authorId?: number }) => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPosts = async () => {
        try {
            const response = await api.post.getPosts({ status: params?.status });
            // Фильтрация по автору на клиенте, если не поддерживается бэкендом
            const filtered = params?.authorId 
                ? response.data.filter(post => post.authorId === params.authorId)
                : response.data;
            setPosts(filtered);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [params?.status, params?.authorId]);

    return { posts, loading, error, refetch: fetchPosts };
};

export default usePosts;