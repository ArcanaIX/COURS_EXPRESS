import {MongoClient} from 'mongodb';
import chalk from "chalk";


const databaseController = {

    connect : async function() {
        try {
            const mongodbClient = new MongoClient(process.env.MONGODB_URL);
            await mongodbClient.connect();
            console.log(chalk.green('[SERVER] Connected to MongoDB'));
            return mongodbClient;
        }catch(e){
            console.error(chalk.redBright("MongoDB Connection Error: "+e));
        }
    },

    insert : async function(collection, obj) {
        try {
            const mongodbClient = new MongoClient(process.env.MONGODB_URL);
            await mongodbClient.connect();
            console.log(chalk.green('[SERVER] Connected to MongoDB'));
            await mongodbClient.db("diary").collection(collection).insertOne(obj);
            await mongodbClient.close();
            return true
        }catch(e){
            console.error(chalk.redBright("MongoDB Connection Error: "+e));
        }
    },

    getUserByEmail : async function(obj) {
        const client = await this.connect();

        const data = await client.db("diary").collection("users").findOne(obj);
        await client.close()
        return data
    },

    deleteUserById : async function(obj) {
        const client = await this.connect();
        await client.db("diary").collection("users").deleteOne(obj);
        await client.close();
        return true
    }

}

export default databaseController;