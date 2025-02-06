import { FC, useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Trash2, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import api from "@/api";
// import { ICreatePostRequest, IUpdatePostRequest } from "@/api/post/types";

interface PostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  picState: boolean;
  setPicState: (state: boolean) => void;
  variation?: "add" | "edit";
  postId?: number;
  initialData?: { title: string; content: string };
  onSuccess?: () => void;
}

const PostDialog: FC<PostDialogProps> = ({
  open,
  onOpenChange,
  // picState,
  setPicState,
  variation = "add",
  postId,
  initialData = { title: "", content: "" },
  onSuccess,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Сброс состояний при закрытии диалога
  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
      setPreview(null);
      setPicState(false);
    }
  }, [open]);

  // Генерация превью изображения
  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setPicState(true);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setPicState(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // const uploadImage = async (postId: number) => {
  //   if (!selectedFile) return;

  //   const formData = new FormData();
  //   formData.append("image", selectedFile);

  //   try {
  //     // await api.post.uploadPostImage(postId, formData);
  //   } catch (error) {
  //     console.error("Ошибка загрузки изображения:", error);
  //     throw error;
  //   }
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!title || !content) {
        alert('Заполните обязательные поля');
        return;
      }

      let createdPostId: number | undefined;

      // Создание нового поста
      if (variation === "add") {
        const { data: newPost } = await api.post.createPost({
          title,
          content,
          idempotencyKey: Date.now().toString(),
        });
        createdPostId = newPost.id;
      } 
      // Редактирование существующего
      else if (variation === "edit" && postId) {
        await api.post.updatePost(postId, { title, content });
        createdPostId = postId;
      }

      // Загрузка изображения если есть
      if (createdPostId && selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        // await api.post.uploadPostImage(createdPostId, formData);
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Ошибка создания поста:', error);
      alert('Ошибка при создании поста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[512px] box-content">
        <DialogHeader>
          <DialogTitle className="mb-4 font-semibold text-xl text-slate-900">
            {variation === "add" ? "Создать пост" : "Редактировать пост"}
          </DialogTitle>
          
          <DialogDescription className="flex flex-col gap-4 items-start">
            {/* Заголовок */}
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-slate-900 font-semibold text-sm">Заголовок</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок"
              />
            </div>

            {/* Блок с изображением */}
            <div className="w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                hidden
              />

              {preview ? (
                <div className="relative group w-[512px] h-[288px]">
                  <img
                    src={preview}
                    alt="Превью"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="ghost"
                      onClick={handleRemoveImage}
                      className="text-white hover:bg-white/10"
                    >
                      <Trash2 className="mr-2" />
                      Удалить изображение
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 flex flex-col gap-2"
                >
                  <Upload className="text-slate-400" />
                  <span className="text-slate-500 text-sm">Нажмите для загрузки изображения</span>
                  <span className="text-slate-400 text-xs">Поддерживаемые форматы: JPEG, PNG</span>
                </Button>
              )}
            </div>

            {/* Контент */}
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-slate-900 font-semibold text-sm">Контент</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Введите содержимое поста"
                rows={5}
              />
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-2 w-full">
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Сохранение..." : "Опубликовать"}
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Отмена
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;