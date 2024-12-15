import {Phone, Newspaper, LogOut} from "lucide-react";
import SideButton from "./sidebutton";
export default function Sidebar() {
    return (
        <div className={"w-52 h-[500px] sticky top-[128px] flex flex-col justify-between"}>
            <div className={"flex flex-col gap-2"}>
                <SideButton variation = {"active"} title={"Посты"} icon={<Newspaper/>}/>
                <SideButton title={"Контакты"} icon={<Phone />}/>
            </div>
            <div>
                <SideButton title={"Выйти"} icon={<LogOut />}/>
            </div>
        </div>
    );
};
