import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

export default function Login(){
    return (
        <div className={"bg-slate-50 w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[416px] box-border p-4 bg-white rounded-2xl flex flex-col gap-4"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Войти</Label>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Почта</Label>
                    <Input type="email" id="email" placeholder="Введите почту" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Пароль</Label>
                    <Input type="email" id="email" placeholder="Введите пароль" />
                </div>
                <div>
                    <Button className="w-full h-10 bg-[#0F172A] text-white">Войти</Button>
                </div>
                <div>
                    Нет аккаунта? <NavLink className={"text-indigo-500"} to={"/auth/register"}>Создать аккаунт</NavLink>
                </div>
            </div>
        </div>
    );
};
