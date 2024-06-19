import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import https from "https";
import fs from "fs";
import cors from "cors";
import sightsRoute from "./routes/sightsRoute.js";
import pathsRoute from "./routes/pathsRoute.js";
import routeRoute from "./routes/routeRoute.js";


async function startServer() {
    await mongoose.connect(DB_URL, {serverSelectionTimeoutMS: 5000})
        .then(() => {
            console.log('Succesfully conected to mongodb server');
        })
        .catch((error) => {
            console.log(error);
            return;
        });

    var options = {
        cert: fs.readFileSync("/etc/letsencrypt/-blah-/fullchain.pem"),
        key: fs.readFileSync("/etc/letsencrypt/-blah-/privkey.pem")
    };

    https.createServer(options, app).listen(PORT, () => {
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

startServer();
