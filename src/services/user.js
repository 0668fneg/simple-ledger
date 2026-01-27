import * as userRepository from "../repository/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.hashedPassword, 10);
  const newUser = await userRepository.createUser({
    username: data.username,
    password: hashedPassword,
  });

  return { id: newUser, username: newUser.username };
};
