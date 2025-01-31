const API_BASE_URL = "https://cpt-stage-2.duckdns.org/api/";

const apiRoutes = {
  AUTH: {
    SIGN_UP: `${API_BASE_URL}auth/register`,
    SIGN_IN: `${API_BASE_URL}auth/login`,
    REFRESH_TOKEN: `${API_BASE_URL}auth/refresh-token`,
  },
  POST: {
    ALL: `${API_BASE_URL}posts`,
  }
};

export default apiRoutes;