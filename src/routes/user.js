import { Hono } from "hono";
import { registerUser } from "../services/user.js";

const userRoutes = new Hono();

userRoutes.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const result = await registerUser(body);
    return c.json(result, 201);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

export default userRoutes;
