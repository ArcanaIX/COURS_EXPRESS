import express from 'express';
import chalk from 'chalk';
//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
//import {body, param} from 'express-validator';
import dotenv from 'dotenv';
import userRoutes from "./app/routes/user.routes.js";

const app = express();

app.use(express.json({
    limit: '10mb',
    strict: false
}));

dotenv.config();

app.set('port', process.env.PORT);
app.set('host', process.env.HOST);

app.use('/api/v1/users', userRoutes);

app.listen(app.get('port'), () => {
    console.log(chalk.magenta("Server is running on port : " + app.get('port')));
});