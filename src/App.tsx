import Auth from "@/page/auth.tsx";
import {Routes, Route} from "react-router"
import Lead from "./page/lead";
import Login from "./components/auth/login";
import { Navigate } from "react-router";

export default function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Routes>
                <Route path="/auth/*" element={<Auth/>}/>
                <Route path="/main/*" element={<Lead/>}/>
                <Route 
                    path="/" 
                    element={
                        localStorage.getItem("accessToken") 
                            ? <Navigate to="/main" replace /> 
                            : <Login />
                    }/>
            </Routes>

        </div>
    )
}

