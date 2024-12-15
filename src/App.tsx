import Auth from "@/page/auth.tsx";
import {Routes, Route} from "react-router"
import Lead from "./page/lead";
import Login from "./components/auth/login";



export default function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Routes>
                <Route path="/auth/*" element={<Auth/>}/>
                <Route path="/lead/*" element={<Lead/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>

        </div>
    )
}

