import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validatorMiddleware from "../middlewares/validator.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const route = Router();

route.post("/login", [ validatorMiddleware.email, validatorMiddleware.password, errorMiddleware.validator ], userController.login);

export default route;