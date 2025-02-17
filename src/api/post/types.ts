export interface IPost {
  id: number;
  title: string;
  content: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  images: IImage[];
  authorId: number;
}

export interface IImage {
  id: number;
  imageUrl: string;
}

export interface ICreatePostRequest {
  title: string;
  content: string;
  idempotencyKey: string;
}

export interface IUpdatePostRequest {
  title: string;
  content: string;
}

export interface IUpdatePostStatusRequest {
  status: "draft" | "published";
}

export interface IImageResponse {
  id: number;
  imageUrl: string;
}