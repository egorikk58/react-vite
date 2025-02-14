import { useParams } from "react-router-dom";
import PostItem from "@/components/lead/posts/postItem";
import { IPost } from "@/api/post/types";

interface SinglePostProps {
    posts: IPost[];
}

const SinglePost = ({ posts }: SinglePostProps) => {
    const { postId } = useParams<{ postId: string }>();
    const post = posts.find((post) => post.id.toString() === postId);

    if (!post) return <div>Пост не найден</div>;

    return <PostItem type="default" post={post} />;
};

export default SinglePost;