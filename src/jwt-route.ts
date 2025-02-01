export interface IAccessTokenInfo {
    Id: number;
    aud: string;
    exp: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    iss: string;
    nbf: number;
    login: string;
}

const getUnixTime = () => Math.round(+ new Date() / 1000);

export const decodeAccessToken = (token: string): IAccessTokenInfo => {
    const tokenInfo = token.split('.')[1];
    const decodedTokenInfo = atob(tokenInfo);
    return JSON.parse(decodedTokenInfo);
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

export const isTokenExpired = (token: string | null) => {
    if (!token) {
        return true;
    }

    try {
        const {nbf, exp}: IAccessTokenInfo = decodeAccessToken(token);

        const tokenLifeTime = exp - getUnixTime();

        const minLifeTimeForUpdate = (exp - nbf) * LIFE_TIME_TO_UPDATE_MULTIPLIER;

        return tokenLifeTime < minLifeTimeForUpdate;
    } catch (error) {
        console.error(error);
        return true;
    }
}