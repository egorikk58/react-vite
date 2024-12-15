import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Label} from "@/components/ui/label.tsx";
import PostItemButton from "@/components/lead/posts/post-item-button.tsx";
import {NavLink} from "react-router";
import {FC, useRef, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import PostDialog from "@/components/lead/posts/post-dialog.tsx";
import {Heart, MessageCircle} from "lucide-react";

interface postItemProps {
    type: "default" | "clickable" | "writer-default" | "writer-clickable";
    className?: string;
}

const PostItemContent: FC<postItemProps> = ({type, className}) => {
    const [editPostDialog, setEditPostDialog] = useState(false);
    const [editPostPic, setEditPostPic] = useState(false);

    return (
        <div className={className}>
            <div className={"flex flex-col gap-4 p-4"}>
                <div className={"flex"}>
                    <Avatar>
                        <AvatarImage src=""/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className={"flex flex-col ml-2"}>
                        <Label className={"font-normal text-sm text-slate-900 h-6 flex items-center"}>
                            pochta@gmail.com
                        </Label>
                        <Label className={"font-medium text-xs text-slate-400 h-5 flex items-center"}>31 октября</Label>
                    </div>
                </div>
                <div>
                    <Label className={"font-semibold text-xl text-slate-900"}>Заголовок</Label>
                </div>
                <div className={"w-full h-[432px] bg-slate-300 rounded-md"}>
                </div>
                <Label className={"w-full font-normal text-sm text-slate-900 leading-6"}>
                    Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и
                    реализации распределения внутренних резервов и ресурсов. Предварительные выводы неутешительны:
                    перспективное планирование не даёт нам иного выбора, кроме определения экономической
                    целесообразности
                    принимаемых решений.
                </Label>
                {(type === "writer-clickable" || type === "writer-default")
                    && <div className={"flex gap-3 w-[167px] h-10"}>
                        <Button className={"w-[167px] h-10 z-10"}>Опубликовать пост</Button>
                        <Button className={"w-[138px] h-10 z-10"} variant={"secondary"} onClick={() => {setEditPostDialog(true)}}>Редактировать</Button>
                    </div>
                }
                <div className={"flex gap-3"}>
                    <PostItemButton title={"110"} img={<Heart/>} className={"z-10"}/>
                    <PostItemButton title={"110"} img={<MessageCircle/>} className={"z-10"}/>
                </div>

                <PostDialog open={editPostDialog} onOpenChange={() => {
                    setEditPostDialog(false)
                }}
                picState={editPostPic} setPicState={setEditPostPic} variation={"edit"}/>
            </div>

        </div>
    );
}

const PostItem: FC<postItemProps> = ({type}) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleHoverEnter = () => {
        ref.current && (ref.current.style.backgroundColor = "#E2E8F0");
    }
    const handleHoverLeave = () => {
        ref.current && (ref.current.style.backgroundColor = "white");
    }

    if (type === "clickable" || type === "writer-clickable") {
        return (
            <div ref={ref} className={"w-full rounded-xl bg-white transition-all"}>
                <div className={"relative"}>
                    <div onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                        <PostItemContent type={type}/>
                    </div>
                    <div onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                        <NavLink to={type === "clickable" ? "/main/reader/post" : "/main/writer/post"}
                                 className={"absolute top-0 rounded-xl w-full h-full cursor-pointer"}>
                        </NavLink>
                    </div>
                </div>
            </div>

        );
    } else if (type === "default" || type === "writer-default") {
        return (
            <div className={"w-full bg-white rounded-xl relative"}>
                <PostItemContent type={type}/>
            </div>
        );

    }
};

export default PostItem;