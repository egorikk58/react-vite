import PostItem from "@/components/lead/posts/postItem.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import PostDialog from "@/components/lead/posts/dialog.tsx";
import {Route, Routes} from "react-router";
import WriterNav from "@/components/lead/posts/writer-nav.tsx";


const Posts = () => {
    const [createPostDialog, setCreatePostDialog] = useState(false);
    const [createPostPic, setCreatePostPic] = useState(false);

    return (
        <div className={"w-[768px] h-[1800px]"}>
            <Routes>
                <Route path="reader/*" element={<div>
                    <Routes>
                        <Route path={""} element={<div className={"flex flex-col gap-6"}>
                            <PostItem type={"clickable"}/>
                            <PostItem type={"clickable"}/>
                        </div>}/>
                        <Route path={"post"} element={<PostItem type={"default"}/>}/>
                    </Routes>
                </div>}/>

                <Route path="writer/*" element={<div className={"h-full"}>
                    <Routes>
                        <Route path={"/*"} element={<div className={"flex items-start flex-col gap-[32px]"}>
                            <WriterNav/>
                            <Routes>
                                <Route path={"my"} element={
                                    <div className={"w-full"}>
                                        <Button onClick={() => {setCreatePostDialog(true)}} className={'w-full'}>Создать пост</Button>

                                        <PostDialog open={createPostDialog} onOpenChange={() => {setCreatePostDialog(false)}}
                                                    picState={createPostPic} setPicState={setCreatePostPic} variation={"add"}/>
                                </div>}/>
                            </Routes>

                            <div className={"flex flex-col gap-6 w-[768px]"}>
                                <PostItem type={"writer-clickable"}/>
                                <PostItem type={"writer-clickable"}/>
                            </div>
                        </div>}/>
                        <Route path={"post"} element={<PostItem type={"writer-default"}/>}/>
                    </Routes>

                </div>}/>
                <Route path={"post"} element={<PostItem type={"default"}/>}/>
            </Routes>
        </div>
    );
};

export default Posts;