import express from 'express';
import chalk from 'chalk';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(chalk.green("Express server listening on port " + port));
});