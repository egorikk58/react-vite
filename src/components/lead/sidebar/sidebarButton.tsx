import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";
import {FC} from "react";

interface SidebarButtonProps {
    icon: JSX.Element;
    title: string;
    variation?: "default" | "active";
}

const SidebarButton: FC<SidebarButtonProps> = ({icon, title, variation}) => {
    let btnStyle = "bg-transparent";
    let spanStyle = "text-slate-400";

    if (variation === "active") {
        btnStyle = "bg-slate-100";
        spanStyle = "text-slate-900";
    }

    return (
        <NavLink to={"/"}>
            <Button variant={"ghost"} className={"w-full h-10 py-3 px-4 flex gap-2.5 justify-start " + btnStyle}>
                <span className={spanStyle}>{icon}</span>
                <span className={"font-medium " + spanStyle}>{title}</span>
            </Button>
        </NavLink>
    );
};

export default SidebarButton;