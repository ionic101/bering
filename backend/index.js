import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import sightsRoute from "./routes/sightsRoute.js";
import pathsRoute from "./routes/pathsRoute.js";
import routeRoute from "./routes/routeRoute.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";


async function startServer() {
    await mongoose.connect(DB_URL, {serverSelectionTimeoutMS: 5000})
        .then(() => {
            console.log('Succesfully conected to mongodb server');
        })
        .catch((error) => {
            console.log(error);
            return;
        });
    
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    });
}


dotenv.config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/sights', sightsRoute);
app.use('/paths', pathsRoute);
app.use('/route', routeRoute);
app.use('/user', userRoute);

startServer();
