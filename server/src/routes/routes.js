import { Router } from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";

const routes = Router();

routes.use("/auth", authController);
routes.use("/posts", postController);

export default routes;
