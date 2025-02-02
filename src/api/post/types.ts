export interface IPost {
    id: number;
    title: string;
    content: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    images: IImage[];
  }
  
  export interface IImage {
    id: number;
    url: string;
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
    status: string;
  }