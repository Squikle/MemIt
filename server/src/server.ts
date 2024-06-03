import express from "express";
import bodyParser from "body-parser";
import path from "node:path";
import authRouter from "./routes/auth";
import setsRouter from "./routes/sets/sets";
import termsRouter from "./routes/terms/terms";
import {errorHandler} from "./middlewares/errorHandler";
import cors from "cors";

const app = express();
const distPath = path.resolve(__dirname, "..", "..", "client", "dist");

app.use(cors())
app.use(express.static(distPath));
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/sets', setsRouter);
app.use('/api/terms', termsRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.use(errorHandler);
app.listen(process.env.PORT || 3213, () => {
    console.log(`Server listening on the port ${process.env.PORT || 3213}`);
});