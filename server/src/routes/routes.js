import { Router } from "express";
import authController from "../controllers/authController.js";
import postController from "../controllers/postController.js";
import flagController from "../controllers/flagController.js";

const routes = Router();

routes.use("/auth", authController);
routes.use("/posts", postController);
routes.use("/flags", flagController);

export default routes;
