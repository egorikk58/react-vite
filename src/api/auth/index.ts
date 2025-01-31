import {axiosClient} from "@/api/axiosConfig";
import endpoints from "@/api/routes";
import {
    IAuthResponse,
    ILoginRequest,
    IRefreshTokenRequest,
    IRegisterRequest,
} from "@/api/auth/types";
import {AxiosPromise} from "axios";

export const login = (params: ILoginRequest): AxiosPromise<IAuthResponse> =>
    axiosClient.post(endpoints.AUTH.SIGN_IN, params);

export const register = (params: IRegisterRequest): AxiosPromise<IAuthResponse> =>
    axiosClient.post(endpoints.AUTH.SIGN_UP, params);

export const refreshToken = (params: IRefreshTokenRequest): AxiosPromise<IAuthResponse> =>
    axiosClient.post(endpoints.AUTH.REFRESH_TOKEN + "?refreshToken=" + params);