import Auth from "@/page/auth.tsx";
import Lead from "./page/lead";
import Login from "./components/auth/login";
import { Navigate } from "react-router";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className={"w-full h-full bg-slate-50"}>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/main/*" element={<Lead />} />
          <Route
            path="/"
            element={
              localStorage.getItem("accessToken")
                ? <Navigate to="/main" replace />
                : <Login />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;