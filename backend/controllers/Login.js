import User from "../models/User.js";
import { CustomError } from "../middleware/custom-error.js";
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      new CustomError("Please make sure all values are entered.", 400)
    );
  }

  try {
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return next(
        new CustomError("An account with this email already exists.", 400)
      );
    }
    const user = await User.create({ name, email, password });
    res.status(200).json({ message: "User has been created." });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new CustomError("Please make sure all values are entered.", 400)
    );
  }

  try {
    const emailExists = await User.findOne({ email });
    if (!emailExists) {
      return next(new CustomError("No account found with that email.", 400));
    }
    const isPasswordCorrect = await emailExists.comparePassword(password);

    if (!isPasswordCorrect) {
      return next(new CustomError("Password is invalid.", 401));
    }

    res.status(200).json({ message: "User has been logged in." });
  } catch (error) {
    next(error);
  }
};

export { register, login };
