import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectdb = async () => {
    dotenv.config()

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Mongodb Connected ${conn.connection.host}`.cyan.underline)
    } catch (  error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectdb