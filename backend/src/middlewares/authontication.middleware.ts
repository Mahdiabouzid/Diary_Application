import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"

const BCRYPT_SALT = 10;
//!! This should load from env - not hardcoded!
const JWT_SECRET = "JWT_SECRET";
const JWT_OPTIONS: SignOptions = {
    expiresIn: 3600,    //3.6 sec
    issuer: "http://mahdi.auth",
};

const hashPassword = (password: string) => bcrypt.hash(password, BCRYPT_SALT);
const comparePasswordWithHash = async (password:string, hash: string) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch {
        return false;
    }
};

type JwtUserData = {
    email: string;
    firstName: string;
    lastName: string;
    id: string;
};


const generateToken = (payload: JwtUserData) => {
    return jwt.sign(payload,JWT_SECRET, JWT_OPTIONS);
};

export const Auth = {
    hashPassword,
    comparePasswordWithHash,
    generateToken
};