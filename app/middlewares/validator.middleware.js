import {body, param} from "express-validator";

const validatorMiddleware = {
    email: body("email").notEmpty().trim().isEmail(),
    password: body("password").notEmpty().trim(),
    id: param("id").notEmpty().isNumeric(),
}

export default validatorMiddleware;