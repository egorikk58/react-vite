// npx shadcn@latest add avatar
import logo from "@/assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";

export default function Header(){
    return (
        <div className={"w-full h-20 bg-white sticky top-0 z-20"}>
            <div className={"w-[1248px] h-full m-auto flex items-center justify-between"}>
                <img src={logo} alt=""/>
                <div className={"flex items-center gap-3"}>
                    <span>pochta@gmail.com</span>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>
            </div>
        </div>
    );
};

