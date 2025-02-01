import logo from "@/assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";

const Header = () => {
  // Получаем email из localStorage
  const email = localStorage.getItem("email");

  const avatarFallback = email ? `${email[0]}${email[1]}`.toUpperCase() : "";

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-20">
      <div className="w-[1248px] h-full m-auto flex items-center justify-between">
        <img src={logo} alt="Логотип" />

        <div className="flex items-center gap-3">
          {email && <span>{email}</span>} 

          <Avatar>
            <AvatarImage src="" alt="Аватар пользователя" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;