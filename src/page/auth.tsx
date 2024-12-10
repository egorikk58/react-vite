import Login from "@/components/auth/login";
import Register from "@/components/auth/register.tsx";
// import Login from "@/components/auth/login.tsx";
import { Routes, Route } from "react-router";

const Auth = () => {
    return (
        <div className={"w-full h-full"}>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
};

export default Auth;