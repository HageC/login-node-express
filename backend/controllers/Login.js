import User from "../models/User.js";
import { CustomError } from "../middleware/custom-error.js";
import { createJWT } from "../utils/jwt.js";

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
    const tokenUser = createJWT({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    res.cookie("access_token", tokenUser, {
      expires: new Date(Date.now() + 24 * 3600000),
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
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

    const tokenUser = createJWT({
      id: emailExists._id,
      name: emailExists.name,
      email: emailExists.email,
    });

    res.cookie("access_token", tokenUser, {
      expires: new Date(Date.now() + 24 * 3600000),
      httpOnly: true,
      signed: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      id: emailExists._id,
      name: emailExists.name,
      email: emailExists.email,
    });
  } catch (error) {
    next(error);
  }
};

const checkUser = (req, res) => {
  res.status(200).json(req.user);
};

export { register, login, checkUser };
