import {Routes, Route} from "react-router"
import Lead from "./page/lead";
import Login from "./components/auth/login";
import { Navigate } from "react-router";
import Register from "./components/auth/register";

export default function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Routes>
                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/main/*" element={<Lead />} />
                <Route 
                    path="/" 
                    element={
                        localStorage.getItem("accessToken") 
                            ? <Navigate to="/main" replace /> 
                            : <Navigate to="/auth/login" replace /> 
                    }
                />
            </Routes>
        </div>
    );
}
