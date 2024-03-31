import express from "express";
import scrapeRoute from "./routes/scrape.route.js";

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send({
        message: "Hello World!",
    });
});

app.use("/api/scrape",scrapeRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});