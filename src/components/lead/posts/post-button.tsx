import {Button} from "@/components/ui/button.tsx";
import {FC} from "react";

interface PostItemButtonProps {
    img: JSX.Element;
    title: string | number;
    className?: string;
}

const PostItemButton: FC<PostItemButtonProps> = ({img, title, className}) => {
    return (
        <Button variant={"secondary"} className={"w-[60px] h-7 text-slate-400 " + className}>
            {img}
            <span>{title}</span>
        </Button>
    );
};

export default PostItemButton;