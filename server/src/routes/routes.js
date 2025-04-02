import { Router } from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import flagController from "../controllers/flagController.js";
import commentController from "../controllers/commentController.js";

const routes = Router();

routes.use("/auth", authController);
routes.use("/posts", postController);
routes.use("/comments", commentController);
routes.use("/flags", flagController);

export default routes;
