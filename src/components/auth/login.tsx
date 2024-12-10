import {Label} from "@/components/ui/label.tsx";
import AuthInput from "@/components/auth/auth-input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink} from "react-router";

const Login = () => {
    return (
        <div className={"bg-slate-50 w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[416px] box-border p-4 bg-white rounded-2xl flex flex-col gap-4"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Войти</Label>
                </div>
                <AuthInput title={"Почта"} placeholder={"Введите почту"}/>
                <AuthInput title={"Пароль"} placeholder={"Введите пароль"}/>
                <div>
                    <Button className={"w-full h-10"}>Войти</Button>
                </div>
                <div>
                    Нет аккаунта? <NavLink className={"text-indigo-500"} to={"/auth/register"}>Создать аккаунт</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Login;