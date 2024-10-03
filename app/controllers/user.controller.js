import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path : path.resolve("../../.env")
});

const userController = {

    createOne() {

    },

    login(req, res, next) {
        const db = [{
            "email" : "sachaguerin@gmail.com",
            "password" : "vivelesmotsdepasse",
            "role" : "admin"
        }];

        const {email, password} = req.body;

        for(const user of db) {
            if(user.email == email && user.password == password) {
                const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({token: token});
            }else {
                return res.status(401).json({"message": "Invalid email or password"});
            }
        }

    },

    getOneById(req, res, next) {

    },

    getAll(req, res, next) {

    },

    deleteOneById(req, res, next) {

    },

    deleteAll(req, res, next) {

    },

    updateOneById(req, res, next) {

    }

}

export default userController;