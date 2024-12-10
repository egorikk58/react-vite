import {Label} from "@/components/ui/label.tsx";
import {FC} from "react";

interface AuthInputProps {
    title: string;
    placeholder: string;
}

const AuthInput: FC<AuthInputProps> = ({title, placeholder}) => {
    return (
        <div>
            <Label className={"text-sm font-medium text-slate-900"}>{title}</Label>
            <div>
                <input className={"w-96 h-10 mt-1.5 text-base p-3 border border-slate-300 rounded-md"}
                       placeholder={placeholder}/>
            </div>
        </div>
    );
};

export default AuthInput;