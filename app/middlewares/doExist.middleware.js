import databaseController from "../controllers/database.controller.js";

export default async (req, res, next) => {
    const email = req.body.email;
    const obj = {
        "email": email,
    }
    const doExist = await databaseController.getUserByEmail(obj);
    if(doExist) {
        next("Error: user already exist");
    }else {
        next();
    }
}