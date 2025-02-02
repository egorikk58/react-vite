import SidebarButton from "@/components/lead/sidebar/sidebarButton.tsx";
import {LogOut, Newspaper, Phone} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Очищаем хранилище
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");
        
        // Перенаправляем на главную страницу
        navigate("/");
    };

    return (
        <div className={"w-52 h-[500px] sticky top-[128px] flex flex-col justify-between"}>
            <div className={"flex flex-col gap-2"}>
                <SidebarButton variation={"active"} title={"Посты"} icon={<Newspaper/>}/>
                <SidebarButton title={"Контакты"} icon={<Phone />}/>
            </div>
            <div>
                <SidebarButton 
                    title={"Выйти"} 
                    icon={<LogOut />}
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default Sidebar;