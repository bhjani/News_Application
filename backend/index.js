const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const news = require("./routes/news");
const search = require("./routes/search");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("welcome!");
})
app.use("/news", news);
app.use("/search", search);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));