import { createContext, useContext } from "react";

// Интерфейс контекста
interface IAppContext {
  token: string; 
  setToken: (token: string) => void; 
  email: string;
  setEmail: (email: string) => void;
}

// Создаем контекст с явным указанием типа и начального значения
const AppContext = createContext<IAppContext | null>(null);

// Провайдер контекста
export const AppProvider = AppContext.Provider;

// Хук для использования контекста
export const useApp = () => {
     const context = useContext(AppContext);

     if (!context) {
       throw new Error("Error");
     }

     return context;
};