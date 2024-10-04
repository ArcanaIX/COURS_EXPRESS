import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validatorMiddleware from "../middlewares/validator.middleware.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import doExistMiddleware from "../middlewares/doExist.middleware.js";

const route = Router();

route.post("/login", [ validatorMiddleware.email, validatorMiddleware.password, errorMiddleware.validator ], userController.login);

route.post("/register", [ validatorMiddleware.email, validatorMiddleware.password, doExistMiddleware, errorMiddleware.validator ], userController.createOne );

route.post("/update", [validatorMiddleware.email, errorMiddleware.validator], userController.updateOneById);

route.post("delete", [ doExistMiddleware ], userController.deleteOneById)

export default route;