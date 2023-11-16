import bcrypt from "bcrypt"
import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { DI } from "..";

const BCRYPT_SALT = 10;
//!! This should load from env - not hardcoded!
const JWT_SECRET = "JWT_SECRET";
const JWT_OPTIONS: SignOptions = {
    expiresIn: 3600,    //3.6 sec
    issuer: "http://mahdi.auth",
};


/**
 * hash a given password using the predifned BCRYPT_SALT
 * @param password 
 * @returns hashed password
 */
const hashPassword = (password: string) => bcrypt.hash(password, BCRYPT_SALT);

/**
 * Compares a given password and its corresponding hash
 * @param password 
 * @param hash 
 * @returns true if same
 */
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

export type JwtToken = JwtUserData & JwtPayload;

/**
 * generate a JwtToken
 * @param payload 
 * @returns Token
 */
const generateToken = (payload: JwtUserData) => {
    return jwt.sign(payload,JWT_SECRET, JWT_OPTIONS);
};

/**
 * verify Token
 * @param token 
 */
const verifyToken = (token: string) => {
        return jwt.verify(token, JWT_SECRET) as JwtToken;
}

export const Auth = {
    hashPassword,
    comparePasswordWithHash,
    generateToken
};

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      try {
        const token = verifyToken(authHeader);
        req.user = await DI.userRepository.findOne(token.id);
        req.token = token;
      } catch (e) {
        console.error(e);
      }
    } else {
      req.user = null;
      req.token = null;
    }
    next();
  };

  export const verifyAcess: RequestHandler = (req,res, next) => {
    if (!req.user) {
      return res.status(403).json({errors: ["you have no authorization"]});
    }
    next();
  }
