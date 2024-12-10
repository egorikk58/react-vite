import Auth from "@/page/auth.tsx";
import {Routes, Route} from "react-router";
import Login from "./components/auth/login";




function App() {
    return (
        <div className={"w-full h-full bg-slate-50"}>
            <Routes>
              <Route path="/auth/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default App