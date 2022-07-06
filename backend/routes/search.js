const express = require("express");
const router = express.Router();
const NewsAPI = require('newsapi');
require("dotenv").config();

router.get("/:key", (req, res) => {
    const newsapi = new NewsAPI(process.env.API_KEY);
    newsapi.v2.topHeadlines({
        q: `${req.params.key}`
    }).then(response => {
        if (response.status === "ok") {
            res.json(response);
        }
    }).catch((error) => console.log(error));
});

module.exports = router;