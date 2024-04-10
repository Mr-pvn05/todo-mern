import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectToDB from "../src/db/connectToDB.ts";
import authRouter from "../src/routes/auth.route.ts";
import todoRouter from "../src/routes/todo.route.ts"

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDB().then(() => console.log("Connected to mongo Db"))
})