
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL)

export function dbConnect(){
    console.log('connecting to mongodb')

    return client.connect()

}

export default client.db()