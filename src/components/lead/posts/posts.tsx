import PostItem from "@/components/lead/posts/postItem";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PostDialog from "@/components/lead/posts/dialog";
import { Route, Routes } from "react-router";
import WriterNav from "@/components/lead/posts/writer-nav";
import usePosts from "@/hooks/usePosts";
import SinglePost from "@/components/lead/posts/singlePost";

const Posts = () => {
    const [createPostDialog, setCreatePostDialog] = useState(false);
    const [createPostPic, setCreatePostPic] = useState(false);
    const { posts, loading, error } = usePosts();
    

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div className={"w-[768px] h-[1800px]"}>
            <Routes>
                <Route
                    path="reader/*"
                    element={
                        <div>
                            <Routes>
                                <Route
                                    path=""
                                    element={
                                        <div className={"flex flex-col gap-6"}>
                                            {posts.map((post) => (
                                                <PostItem key={post.id} type="clickable" post={post} />
                                            ))}
                                        </div>
                                    }
                                />
                                <Route path="post/:postId" element={<SinglePost posts={posts} />} />
                            </Routes>
                        </div>
                    }
                />

                <Route
                    path="writer/*"
                    element={
                        <div className={"h-full"}>
                            <Routes>
                                <Route
                                    path="/*"
                                    element={
                                        <div className={"flex items-start flex-col gap-[32px]"}>
                                            <WriterNav />
                                            <Routes>
                                                <Route
                                                    path="my"
                                                    element={
                                                        <div className={"w-full"}>
                                                            <Button onClick={() => setCreatePostDialog(true)} className={"w-full"}>
                                                                Создать пост
                                                            </Button>

                                                            <PostDialog
                                                                open={createPostDialog}
                                                                onOpenChange={() => setCreatePostDialog(false)}
                                                                picState={createPostPic}
                                                                setPicState={setCreatePostPic}
                                                                variation="add"
                                                                onSuccess={() => window.location.reload()}
                                                            />
                                                        </div>
                                                    }
                                                />
                                            </Routes>

                                            <div className={"flex flex-col gap-6 w-[768px]"}>
                                                {posts.map((post) => (
                                                    <PostItem key={post.id} type="writer-clickable" post={post} />
                                                ))}
                                            </div>
                                        </div>
                                    }
                                />
                                <Route path="post/:postId" element={<SinglePost posts={posts} />} />
                            </Routes>
                        </div>
                    }
                />
                <Route path="post/:postId" element={<SinglePost posts={posts} />} />
            </Routes>
        </div>
    );
};

export default Posts;