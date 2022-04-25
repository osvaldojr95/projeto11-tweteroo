import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (username && avatar) {
        users.push({ username: username, avatar: avatar });
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
});

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    const { user } = req.headers;
    if (user && tweet) {
        tweets.push({ username: user, tweet: tweet });
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
});

app.get("/tweets", (req, res) => {
    const { page } = req.query;
    if (parseInt(page) >= 1) {
        res.send(tweets.slice(Math.max(tweets.length - (10 * page), 0), Math.max(tweets.length - (10 * (page - 1)), 0)).map(tweet => {
            return { ...tweet, avatar: users.find(user => user.username === tweet.username).avatar };
        }).reverse());
    } else {
        res.status(400).send("Informe uma página válida!");
    }
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    res.send(tweets.filter(tweet => tweet.username === username).map(tweet => {
        return { ...tweet, avatar: users.find(user => user.username === username).avatar };
    }).reverse());
});

app.listen(5000, () => {
    console.log("Server online");
});
