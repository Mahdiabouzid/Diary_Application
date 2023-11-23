import { User } from "../entities";
import { JwtToken } from "../middlewares/authontication.middleware";

/**
 * extend the express Request interface to have token and use properties
 */
declare global {
    namespace Express {
        interface Request {
            token: JwtToken | null;
            user: User | null;
        }
    }
}