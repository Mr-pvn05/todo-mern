import mongoose from "mongoose";

// Connect to MongoDB
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        const connection = mongoose.connection;

        connection.on("connect", () => {
            console.log("MongoDB connected successfully :)")
        })

        connection.on("error", (error) => {
            console.log("Error connecting to MongoDB: ", error);
            process.exit();
        })

    } catch (error) {
        console.log("Error on connecting to DB : ", error)
    }
}

export default connectToDB;