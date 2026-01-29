import * as userRepository from "../repository/user.js";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

const secret = process.env.DB_JWT_SECRET;

export const registerUser = async ({ username, password }) => {
  const existingUser = await userRepository.findUserByUsername(username);
  if (existingUser) throw new Error("用戶名已被使用");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    username,
    password: hashedPassword,
  });

  return { id: newUser.id, username: newUser.username };
};

export const loginUser = async ({ username, password }) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user) throw new Error("用戶名不存在或密碼不正確");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("用戶名不存在或密碼不正確");

  const payload = {
    id: user.id,
    username: user.username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };
  const token = await sign(payload, secret);

  return {
    user: { id: user.id, username: user.username },
    token: token,
  };
};
