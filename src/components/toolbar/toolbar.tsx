import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

export default function Toolbar (){
    return (
        <div className={"fixed bottom-0 right-0 bg-white p-2"}>
            <Label>тулбар</Label>
            <div className={"grid gap-2 grid-cols-1"}>
                <NavLink to={"/main/writer"}>
                    <Button>Writer</Button>
                </NavLink>
                <NavLink to={"/main/reader"}>
                    <Button>Reader</Button>
                </NavLink>
                <NavLink to={"/auth/login"}>
                    <Button>Login</Button>
                </NavLink>
                <NavLink to={"/auth/register"}>
                    <Button>Register</Button>
                </NavLink>
            </div>
        </div>
    );
};
