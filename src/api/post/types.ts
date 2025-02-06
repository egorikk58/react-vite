export interface IPost {
    id: number;
    title: string;
    content: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    images: IImage[];
    authorId: number;
  }
  
// Измените интерфейс IImage
export interface IImage {
  id: number;
  imageUrl: string;  // Было "url", должно быть "imageUrl"
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
export interface IImageResponse {
    id: number;
    url: string;}