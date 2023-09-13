import { verifyJWT } from "../utils/jwt.js";
import { CustomError } from "./custom-error.js";
export const authenticate = (req, res, next) => {
  const { access_token } = req.signedCookies;
  try {
    if (access_token) {
      const payload = verifyJWT(access_token);
      const { user, id, name, email } = payload;
      req.user = { user, id, name, email };
    } else {
      return next(new CustomError("Authentication Invalid", 401));
    }
    next();
  } catch (error) {
    next(error);
  }
};
