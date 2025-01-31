export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    email: string;
    password: string;
    role: string;
}

export interface IAuthResponse {
    refreshToken: string;
    accessToken: string;
}

export type IRefreshTokenRequest = string | null;