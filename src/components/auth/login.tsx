import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {NavLink, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {ILoginRequest} from "@/api/auth/types.ts";
import api from "@/api";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<any>(null);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
    
        if (token) {
            navigate("/main");
        }
    }, [navigate]);
    
    const handleSignIn = async () => {
            try {
                const data: ILoginRequest  = {
                  email,
                  password,
                };

                const response = await api.auth.login(data);

                if (response.status === 200) {
                  localStorage.setItem("accessToken", response.data.accessToken);
                  localStorage.setItem("refreshToken", response.data.refreshToken);
                  navigate("/main");
                }
            } catch (error) {
                console.error("Auth error:", error);
                setError(error);
            }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
    
        if (token) {
            try {
                const tokenPayload = JSON.parse(atob(token.split('.')[1]));
                console.log("Token payload:", tokenPayload);
            } catch (error) {
                console.error("Token decoding error:", error);
            }
      }
    }, []);

    return (
        <div className={"bg-slate-50 w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[416px] box-border p-4 bg-white rounded-2xl flex flex-col gap-4"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Войти</Label>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Почта</Label>
                    <Input type="email" id="email" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Пароль</Label>
                    <Input type="password" id="pasword" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <Label className={"text-md text-red-600"}>
                    {(error.status === 400 || error.status === 403) ? "Неверный email или пароль" : error}
                </Label>}
                <div>
                    <Button onClick={handleSignIn} className="w-full h-10 bg-[#0F172A] text-white">Войти</Button>
                </div>
                <div>
                    Нет аккаунта? <NavLink className={"text-indigo-500"} to={"/auth/register"}>Создать аккаунт</NavLink>
                </div>
            </div>
        </div>
    );
};
