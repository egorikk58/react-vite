import {FC} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Trash2, Upload} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

interface PostDialogProps {
    open: boolean;
    onOpenChange: () => void;
    picState: boolean;
    setPicState: any;
    variation?: "add" | "edit";
}

const PostDialog: FC<PostDialogProps> = ({open, onOpenChange, variation = "add", setPicState, picState}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={"w-[512px] box-content"}>
                <DialogHeader>
                    <DialogTitle className={"mb-4 font-semibold text-xl text-slate-900"}>
                        {variation === "add" ? "Создать пост" : "Редактировать"}
                    </DialogTitle>
                    <DialogDescription className={"flex flex-col gap-4 items-start"}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label className={"text-slate-900 font-semibold text-sm"}>Заголовок</Label>
                            <Input className={"w-full"} placeholder="Введите заголовок" />
                        </div>
                        {picState
                            ? <div className={"w-[512px] h-[288px] relative"}>
                                <div className={"bg-slate-300 w-full h-full rounded-md absolute"}></div>
                                <div className={"bg-[#00000052] hover:opacity-100 opacity-0 transition-all duration-200 w-full h-full rounded-md absolute"}>
                                    <Button onClick={() => {setPicState(false)}} variant={"ghost"} className={"absolute hover:bg-transparent p-0 m-0 w-[12px] h-[12px] top-4 right-4"}>
                                        <Trash2 className={""} color={"white"} size={48}/>
                                    </Button>
                                </div>
                            </div>
                            : <div>
                                <Button onClick={() => {setPicState(true)}}>
                                    <Upload color={"white"}/>
                                    <Label className={"text-white"}>Добавить картинку</Label>
                                </Button>
                            </div>
                        }
                        <div className="grid w-full items-center gap-1.5">
                            <Label className={"text-slate-900 font-semibold text-sm"}>Контент</Label>
                            <Textarea className={"w-full"} placeholder={"Введите контент"}/>
                        </div>
                        <div className={"flex gap-2"}>
                            <Button>Опубликовать пост</Button>
                            <Button className={"bg-slate-200"} variant={"secondary"}>Отправить в черновики</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default PostDialog;