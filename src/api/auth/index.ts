import {axiosClient} from "@/api/axiosConfig";
import apiRoutes from "@/api/routes";
import {
    IAuthResponse,
    ILoginRequest,
    IRefreshTokenRequest,
    IRegisterRequest,
} from "@/api/auth/types";
import {AxiosPromise} from "axios";

export const login = (params: ILoginRequest): AxiosPromise<IAuthResponse> =>
    axiosClient.post(apiRoutes.AUTH.SIGN_IN, params);

export const register = (params: IRegisterRequest): AxiosPromise<IAuthResponse> =>
    axiosClient.post(apiRoutes.AUTH.SIGN_UP, params);

export const refreshToken = (params: IRefreshTokenRequest): AxiosPromise<IAuthResponse> =>
    axiosClient.post(apiRoutes.AUTH.REFRESH_TOKEN + "?refreshToken=" + params);