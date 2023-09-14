import { verifyJWT } from "../utils/jwt.js";
import { CustomError } from "./custom-error.js";
export const authenticate = (req, res, next) => {
  const { access_token } = req.signedCookies;
  try {
    if (access_token) {
      const payload = verifyJWT(access_token);
      const { id, name } = payload;
      req.user = { id, name };
    } else {
      return next(new CustomError("Authentication Invalid", 401));
    }
    next();
  } catch (error) {
    next(error);
  }
};
