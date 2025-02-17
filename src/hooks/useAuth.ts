// hooks/useAuth.ts
import { useState, useEffect } from "react";

interface User {
    id: number;
    email: string;
    // Другие поля пользователя
}

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Загрузка данных пользователя из localStorage/API
        const userData = localStorage.getItem('user');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    return { currentUser };
};

export default useAuth;