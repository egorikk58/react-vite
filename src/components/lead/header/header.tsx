import logo from "@/assets/logo.svg";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";

const Header = () => {

    return (
        <div className={"w-full h-20 bg-white sticky top-0 z-20"}>
            <div className={"w-[1248px] h-full m-auto flex items-center justify-between"}>
                <img src={logo} alt=""/>
                <div className={"flex items-center gap-3"}>
                    <Avatar>
                        <AvatarImage src="" />
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default Header;