import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import databaseController from "./database.controller.js";
import bcrypt from "bcrypt";
import chalk from "chalk";

dotenv.config({
    path : path.resolve("../../.env")
});

const userController = {

    async createOne(req, res) {
        const body = req.body;
        const {email, password} = body;

        const hashPass = await bcrypt.hash(password, 12);

        const obj = {
            "email": email,
            "password": hashPass,
        }

        const isOk = await databaseController.insert("users", obj);

        if (isOk) {
            res.status(200).json({
                "message" : "User created successfully",
            })
        }else {
            res.status(400).send({
                "message" : "Email already exist",
            })
        }

    },

    async login(req, res) {
        const {email, password} = req.body;

        const obj = {
            "email": email,
        }

        const existingUser = await databaseController.getUserByEmail(obj);

        const hashedPass = existingUser.password;

        if (existingUser) {
            if (existingUser.email === email && bcrypt.compareSync(password, hashedPass)) {
                const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({token: token});
            }else{
                return res.status(403).send({
                    "message" : "Bad credentials",
                })
            }
        }

        console.log(existingUser);

    },

    getOneById(req, res, next) {

    },

    getAll(req, res, next) {

    },

    async deleteOneById(req, res, next) {
        const email = req.body.email;

        const obj = {
            "email": email,
        }

        await databaseController.deleteUserById(obj);
        return res.status(200).json({
            "message" : "User deleted successfully",
        })
    },

    deleteAll(req, res, next) {

    },

    async updateOneById(req, res) {
        const email = req.body.email;
        const newEmail = req.body.newEmail;
        const newPassword = req.body.newPassword;

        const userObj = {
            "email": email,
        }

        const newUserObj = {
            $set: {
                "email": newEmail,
                "password": bcrypt.hashSync(newPassword, 12),
            }
        }

        const userData = databaseController.getUserByEmail(userObj);

        if(userData) {
            const dbClient = await databaseController.connect();

            try {
                await dbClient.db("diary").collection("users").updateOne(userObj, newUserObj);
            }catch (e) {
                console.log(chalk.red(e));
            }

            await dbClient.close();
            res.status(200).send({
                "message" : "User updated successfully",
            })
        }else {
            res.status(403).send({
                "message" : "User does not exist",
            })
        }

    }

}

export default userController;