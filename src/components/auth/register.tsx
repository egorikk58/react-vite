import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {IRegisterRequest} from "@/api/auth/types.ts";
import {useState} from "react";
import {NavLink,useNavigate} from "react-router";
import api from "@/api";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [role, setRole] = useState(0);
    const [error, setError] = useState<any>(null);
    const navigate = useNavigate();

    const handleCreateAccount = async () => {
        if (!email || !password) {
            setError("Введены некорректные данные!");
        } else if (password !== passwordVerify) {
            setError("Пароли должны совпадать!");
        } else {
            try {
                const data: IRegisterRequest = {
                    email,
                    password,
                    role: role ? "author" : "reader",
                }

                const request = await api.auth.register(data);

                if (request.status === 200) {
                    localStorage.setItem("accessToken", request.data.accessToken);
                    localStorage.setItem("refreshToken", request.data.refreshToken);
                    localStorage.setItem("email", email);
                    navigate("/main");
                }
            } catch (error: any) {
                console.error(error);
                setError("Неверный формат почты или пароля!");
            }
        }
    }

    return (
        <div className={"bg-slate-50 w-screen h-screen flex items-center justify-center"}>
            <div className={"w-[416px] box-border p-4 bg-white rounded-2xl flex flex-col items-start gap-4"}>
                <div>
                    <Label className={"text-xl font-semibold text-slate-900"}>Создать аккаунт</Label>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Почта</Label>
                    <Input type="email" id="email" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Пароль</Label>
                    <Input type="password" id="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email" >Повторите пароль</Label>
                    <Input type="password" id="password" placeholder="Повторите пароль" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)}/>
                </div>
                <div>
                    Выберите роль
                    <div className={"p-[5px] bg-slate-100 rounded-md mt-1.5"}>
                        <Button variant={"ghost"} className={"bg-white border-transparent"}>Читатель</Button>
                        <Button variant={"ghost"} className={"bg-transparent border-transparent"}>Автор</Button>
                    </div>
                </div>
                {error && <Label className={"text-md text-red-600"}>
                    {error}
                </Label>}
                <div className={"w-full"}>
                    <Button className="w-full h-10 bg-[#0F172A] text-white" onClick={handleCreateAccount}>Создать аккаунт</Button>
                </div>
                <div>
                    Уже есть аккаунт? <NavLink className={"text-indigo-500"} to={"/auth/login"}>Войти</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Register;