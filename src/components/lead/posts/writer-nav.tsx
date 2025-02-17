// components/WriterNav.tsx
import { NavLink } from "react-router-dom";

const WriterNav = () => {
    return (
        <nav className="flex gap-4 p-2 border rounded-md mb-6">
            <NavLink 
                to="/main/writer/my"
                className={({ isActive }) => 
                    `px-4 py-2 rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`
                }
            >
                Мои посты
            </NavLink>
            <NavLink 
                to="/main/writer/ch"
                className={({ isActive }) => 
                    `px-4 py-2 rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                    }`
                }
            >
                Черновики
            </NavLink>
        </nav>
    );
};

export default WriterNav;