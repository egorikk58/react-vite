import Register from "@/components/auth/register.tsx";
import Login from "@/components/auth/login.tsx";
import { Routes, Route } from "react-router";

export default function Auth() {
    return (
        <div className={"w-full h-full"}>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </div>
    );
};
