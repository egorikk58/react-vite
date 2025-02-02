import { FC, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Trash2, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import api from "@/api";
import { ICreatePostRequest, IUpdatePostRequest } from "@/api/post/types";

interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  picState: boolean;
  setPicState: (state: boolean) => void;
  variation?: "add" | "edit";
  postId?: number; // Для редактирования поста
  initialData?: { title: string; content: string }; // Начальные данные для редактирования
  onSuccess?: () => void; // Колбэк после успешного создания/редактирования
}

const PostDialog: FC<PostDialogProps> = ({
  open,
  onOpenChange,
  picState,
  setPicState,
  variation = "add",
  postId,
  initialData = { title: "", content: "" },
  onSuccess,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (variation === "add") {
        const data: ICreatePostRequest = {
          title,
          content,
          idempotencyKey: Date.now().toString(),
        };
        await api.post.createPost(data);
      } else if (variation === "edit" && postId) {
        const data: IUpdatePostRequest = { title, content };
        await api.post.updatePost(postId, data);
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Ошибка при сохранении поста:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"w-[512px] box-content"}>
        <DialogHeader>
          <DialogTitle className={"mb-4 font-semibold text-xl text-slate-900"}>
            {variation === "add" ? "Создать пост" : "Редактировать пост"}
          </DialogTitle>
          <DialogDescription className={"flex flex-col gap-4 items-start"}>
            <div className="grid w-full items-center gap-1.5">
              <Label className={"text-slate-900 font-semibold text-sm"}>Заголовок</Label>
              <Input
                className={"w-full"}
                placeholder="Введите заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {picState ? (
              <div className={"w-[512px] h-[288px] relative"}>
                <div className={"bg-slate-300 w-full h-full rounded-md absolute"}></div>
                <div
                  className={
                    "bg-[#00000052] hover:opacity-100 opacity-0 transition-all duration-200 w-full h-full rounded-md absolute"
                  }
                >
                  <Button
                    onClick={() => setPicState(false)}
                    variant={"ghost"}
                    className={"absolute hover:bg-transparent p-0 m-0 w-[12px] h-[12px] top-4 right-4"}
                  >
                    <Trash2 className={""} color={"white"} size={48} />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Button onClick={() => setPicState(true)}>
                  <Upload color={"white"} />
                  <Label className={"text-white"}>Добавить картинку</Label>
                </Button>
              </div>
            )}
            <div className="grid w-full items-center gap-1.5">
              <Label className={"text-slate-900 font-semibold text-sm"}>Контент</Label>
              <Textarea
                className={"w-full"}
                placeholder={"Введите контент"}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className={"flex gap-2"}>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Сохранение..." : "Опубликовать пост"}
              </Button>
              <Button className={"bg-slate-200"} variant={"secondary"}>
                Отправить в черновики
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;