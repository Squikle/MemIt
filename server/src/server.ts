import express from "express";
import bodyParser from "body-parser";
import path from "node:path";
import authRouter from "./routes/auth";

const port = 80;
const app = express();
const distPath = path.resolve(__dirname, "..", "..", "client", "dist");

app.use(express.static(distPath));
app.use(bodyParser.json());

app.use(authRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});