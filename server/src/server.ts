import express from "express";
import bodyParser from "body-parser";
import path from "node:path";
import setsRouter from "./routes/sets/sets";
import termsRouter from "./routes/terms/terms";
import authRouter from "./routes/auth/auth";
import {errorHandler} from "./middlewares/errorHandler";
import cors from "cors";
import mongoose, {mongo} from "mongoose";

const app = express();
const distPath = path.resolve(__dirname, "..", "..", "client", "dist");

app.use(cors())
app.use(express.static(distPath));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/sets', setsRouter);
app.use('/api/terms', termsRouter);
app.use('/api/*', (_, res) => res.sendStatus(404));

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.use(errorHandler);

(async () => {
    console.log("connecting to mongo as " + process.env.MONGODB_USERNAME)
    const mongoUrl = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/}`;
    await mongoose.connect(mongoUrl, {
        user: process.env.MONGODB_USERNAME,
        pass: process.env.MONGODB_PASSWORD,
        authSource: "admin",
        dbName: process.env.MONGODB_COLLECTION,
        retryWrites: true
    });

    app.listen(process.env.PORT || 3213, () => {
        console.log(`Server listening on the port ${process.env.PORT || 3213}`);
    });
})()

