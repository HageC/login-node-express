import jwt from "jsonwebtoken";
const createJWT = (tokenObject) => {
  return jwt.sign(tokenObject, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { createJWT, verifyJWT };
