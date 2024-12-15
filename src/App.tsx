import Auth from "@/page/auth.tsx";
import {Routes, Route} from "react-router"
import Lead from "./page/lead";
import Login from "./components/auth/login";
import Toolbar from "./components/toolbar/toolbar";


export default function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Toolbar/>
            <Routes>
                <Route path="/auth/*" element={<Auth/>}/>
                <Route path="/main/*" element={<Lead/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>

        </div>
    )
}

