import database from "../../database/db";
import { IRefreshToken } from './interfaces/IRefreshToken';


const createRefreshToken = async(refreshToken : IRefreshToken) => {
    return await database("refreshToken").insert({
        ...refreshToken
    })
}

const verifyRefreshTokenExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

export default {
    createRefreshToken
}