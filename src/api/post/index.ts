import { axiosClient } from "@/api/axiosConfig";
import apiRoutes from "@/api/routes";
import { AxiosPromise } from "axios";
import {
  IPost,
  ICreatePostRequest,
  IUpdatePostRequest,
  IUpdatePostStatusRequest,
  IImageResponse
} from "./types";

// Получение всех постов (с фильтрацией по статусу)
export const getPosts = (params?: { status?: string }): AxiosPromise<IPost[]> =>
  axiosClient.get(apiRoutes.POST.ALL, { params });

// Создание поста (по умолчанию статус draft)
export const createPost = (data: ICreatePostRequest): AxiosPromise<IPost> =>
  axiosClient.post(apiRoutes.POST.CREATE, data);

// Обновление поста (заголовок и контент)
export const updatePost = (
  postId: number,
  data: IUpdatePostRequest
): AxiosPromise<IPost> =>
  axiosClient.put(apiRoutes.POST.UPDATE(postId), data);

// Обновление статуса поста
export const updatePostStatus = (
  postId: number,
  data: IUpdatePostStatusRequest
): AxiosPromise<IPost> =>
  axiosClient.patch(apiRoutes.POST.STATUS(postId), data);

// Загрузка изображения для поста
export const uploadPostImage = (
  postId: number,
  image: File
): AxiosPromise<IImageResponse> => {
  const formData = new FormData();
  formData.append("image", image);
  return axiosClient.post(apiRoutes.POST.IMAGES(postId), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Удаление изображения
export const deletePostImage = (
  postId: number,
  imageId: number
): AxiosPromise<void> =>
  axiosClient.delete(apiRoutes.POST.IMAGE(postId, imageId));

export const deletePost = (postId: number): AxiosPromise<void> =>
  axiosClient.delete(apiRoutes.POST.DELETE(postId));