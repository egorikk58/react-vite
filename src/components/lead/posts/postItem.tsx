import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Label } from "@/components/ui/label.tsx";
import PostItemButton from "@/components/lead/posts/post-button";
import { NavLink } from "react-router";
import { FC, useRef, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import PostDialog from "@/components/lead/posts/dialog";
import { Heart, MessageCircle } from "lucide-react";
import { IPost, IImage } from "@/api/post/types";
import api from "@/api";

interface PostItemProps {
  type: "default" | "clickable" | "writer-default" | "writer-clickable";
  post?: IPost; // Добавляем данные поста
  onUpdate?: () => void; // Колбэк для обновления списка постов
}

const PostItemContent: FC<PostItemProps> = ({ type, post, onUpdate }) => {
  const [editPostDialog, setEditPostDialog] = useState(false);
  const [editPostPic, setEditPostPic] = useState(false);
  const handlePublishPost = async () => {
    if (post?.id) {
      try {
        await api.post.updatePostStatus(post.id, { status: "published" });
        onUpdate?.();
        post?.status === 'published' ? alert("Пост обновлен") : alert("Пост опубликован");
        window.location.reload(); // Добавьте эту строку
        
      } catch (error) {
        console.error("Ошибка при публикации поста:", error);
      }
    }
  };

  return (
    <div>
      <div className={"flex flex-col gap-4 p-4"}>
        <div className={"flex"}>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={"flex flex-col ml-2"}>
            <Label className={"font-normal text-sm text-slate-900 h-6 flex items-center"}>
              {"user#" + post?.authorId|| "pochta@gmail.com"}
            </Label>
            <Label className={"font-medium text-xs text-slate-400 h-5 flex items-center"}>
              {post?.createdAt 
                ? new Date(post.createdAt).toLocaleDateString('ru-RU', {
                   day: 'numeric',
                   month: 'long',
                   year: 'numeric'
                })
              : "Дата не указана"}
          </Label>
          </div>
        </div>
        <div>
          <Label className={"font-semibold text-xl text-slate-900"}>{post?.title || "Заголовок"}</Label>
        </div>
        {post?.images && post.images.length > 0 ? (
          <div className="w-full h-[432px] bg-slate-300 rounded-md overflow-hidden">
            {post.images.map((image: IImage) => (
              <img
                key={image.id}
                src={image.imageUrl}  // Исправлено с url на imageUrl
                alt="Изображение поста"
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-[432px] bg-slate-300 rounded-md flex items-center justify-center">
            <span className="text-slate-500">Нет изображений</span>
          </div>
        )}
        <Label className={"w-full font-normal text-sm text-slate-900 leading-6"}>
          {post?.content ||
            "Повседневная практика показывает, что социально-экономическое развитие способствует подготовке и реализации распределения внутренних резервов и ресурсов."}
        </Label>
        {(type === "writer-clickable" || type === "writer-default") && (
          <div className={"flex gap-3 w-[167px] h-10"}>
            <Button className={"w-[167px] h-10 z-10"} onClick={handlePublishPost}>
              {post?.status === 'published' ? "Обновить пост" : "Опубликовать пост"}
            </Button>
            <Button
              className={"w-[138px] h-10 z-10"}
              variant={"secondary"}
              onClick={() => setEditPostDialog(true)}
            >
              Редактировать
            </Button>
            <Button variant="destructive" >
              Удалить
            </Button>
          </div>
        )}
        <div className={"flex gap-3"}>
          <PostItemButton title={"110"} img={<Heart />} className={"z-10"} />
          <PostItemButton title={"110"} img={<MessageCircle />} className={"z-10"} />
        </div>

        <PostDialog
          open={editPostDialog}
          onOpenChange={() => setEditPostDialog(false)}
          picState={editPostPic}
          setPicState={setEditPostPic}
          variation="edit"
          postId={post?.id}
          initialData={{ title: post?.title || "", content: post?.content || "" }}
          onSuccess={onUpdate}
        />
      </div>
    </div>
  );
};

const PostItem: FC<PostItemProps> = ({ type, post, onUpdate }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleHoverEnter = () => {
    ref.current && (ref.current.style.backgroundColor = "#E2E8F0");
  };
  const handleHoverLeave = () => {
    ref.current && (ref.current.style.backgroundColor = "white");
  };

  if (type === "clickable" || type === "writer-clickable") {
    return (
      <div ref={ref} className={"w-full rounded-xl bg-white transition-all"}>
        <div className={"relative"}>
          <div onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
            <PostItemContent type={type} post={post} onUpdate={onUpdate} />
          </div>
          <div onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
            <NavLink
              to={type === "clickable" ? `/main/reader/post/${post?.id}` : `/main/writer/post/${post?.id}`}
              className={"absolute top-0 rounded-xl w-full h-full cursor-pointer"}
            ></NavLink>
          </div>
        </div>
      </div>
    );
  } else if (type === "default" || type === "writer-default") {
    return (
      <div className={"w-full bg-white rounded-xl relative"}>
        <PostItemContent type={type} post={post} onUpdate={onUpdate} />
      </div>
    );
  }
};

export default PostItem;