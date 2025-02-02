// api/post/index.ts
import { axiosClient } from "@/api/axiosConfig";
import apiRoutes from "@/api/routes";
import { AxiosPromise } from "axios";
import {
  IPost,
  ICreatePostRequest,
  IUpdatePostRequest,
  IUpdatePostStatusRequest,
} from "./types";

export const getPosts = (): AxiosPromise<IPost[]> =>
  axiosClient.get(apiRoutes.POST.ALL);

export const createPost = (data: ICreatePostRequest): AxiosPromise<IPost> =>
  axiosClient.post(apiRoutes.POST.CREATE, data);

export const updatePost = (
  postId: number,
  data: IUpdatePostRequest
): AxiosPromise<IPost> =>
  axiosClient.put(apiRoutes.POST.UPDATE(postId), data);

export const updatePostStatus = (
  postId: number,
  data: IUpdatePostStatusRequest
): AxiosPromise<IPost> =>
  axiosClient.patch(apiRoutes.POST.STATUS(postId), data);

export const deletePost = (postId: number): AxiosPromise<void> =>
  axiosClient.delete(apiRoutes.POST.UPDATE(postId));

export const uploadPostImage = (
  postId: number,
  image: File
): AxiosPromise<void> => {
  const formData = new FormData();
  formData.append("image", image);
  return axiosClient.post(apiRoutes.POST.IMAGES(postId), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deletePostImage = (
  postId: number,
  imageId: number
): AxiosPromise<void> =>
  axiosClient.delete(apiRoutes.POST.IMAGE(postId, imageId));