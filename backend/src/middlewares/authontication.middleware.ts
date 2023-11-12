import bcrypt from "bcrypt"

const BCRYPT_SALT = 10;
const hashPassword = (password: string) => bcrypt.hash(password, BCRYPT_SALT);

const comparePasswordWithHash = async (password:string, hash: string) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch {
        return false;
    }
};