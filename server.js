import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import userRoutes from "./app/routes/user.routes.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json({
    limit: '10mb',
    strict: false
}));

app.use(cors());

app.set('port', process.env.PORT);

app.use('/api/v1/users', userRoutes);

app.listen(app.get('port'), () => {
    console.log(chalk.green("[SERVER] Server is running on port : " + app.get('port')));
});