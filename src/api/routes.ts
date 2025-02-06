// api/routes.ts
const API_BASE_URL = "https://cpt-stage-2.duckdns.org/api/";

const apiRoutes = {
  AUTH: {
    SIGN_UP: `${API_BASE_URL}auth/register`,
    SIGN_IN: `${API_BASE_URL}auth/login`,
    REFRESH_TOKEN: `${API_BASE_URL}auth/refresh-token`,
  },
  POST: {
    ALL: `${API_BASE_URL}posts`,
    CREATE: `${API_BASE_URL}posts`,
    UPDATE: (postId: number) => `${API_BASE_URL}posts/${postId}`,
    STATUS: (postId: number) => `${API_BASE_URL}posts/${postId}/status`,
    IMAGES: (postId: number) => `${API_BASE_URL}posts/${postId}/images`,
    IMAGE: (postId: number, imageId: number) => 
      `${API_BASE_URL}posts/${postId}/images/${imageId}`,
    DELETE: (postId: number) => `${API_BASE_URL}posts/${postId}`,
  }
};

export default apiRoutes;