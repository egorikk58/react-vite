import Auth from "@/page/auth.tsx";
import {Routes, Route} from "react-router"



export default function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Routes>
                <Route path="/auth/*" element={<Auth/>}/>
            </Routes>

        </div>
    )
}

