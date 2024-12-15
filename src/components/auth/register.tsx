import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

const Register = () => {
    return (
        <div className={"bg-slate-50 w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[416px] box-border p-4 bg-white rounded-2xl flex flex-col items-start gap-4"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Создать аккаунт</Label>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Почта</Label>
                    <Input type="email" id="email" placeholder="Введите почту" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Пароль</Label>
                    <Input type="email" id="email" placeholder="Введите пароль" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Повторите пароль</Label>
                    <Input type="email" id="email" placeholder="Повторите пароль" />
                </div>
                <div>
                    Выберите роль
                    <div className={"p-[5px] bg-slate-100 rounded-md mt-1.5"}>
                        <Button variant={"ghost"} className={"bg-white border-transparent"}>Читатель</Button>
                        <Button variant={"ghost"} className={"bg-transparent border-transparent"}>Автор</Button>
                    </div>
                </div>
                <div className={"w-full"}>
                    <Button className="w-full h-10 bg-[#0F172A] text-white">Создать аккаунт</Button>
                </div>
                <div>
                    Уже есть аккаунт? <NavLink className={"text-indigo-500"} to={"/auth/login"}>Войти</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;