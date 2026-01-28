import * as userRepository from "../repository/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("用戶名和密碼不能爲空");
  }
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

  return { id: user.id, username: user.username };
};
