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
    const { username, tweet } = req.body;
    if (username && tweet) {
        tweets.push({ username: username, tweet: tweet });
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
});

app.get("/tweets", (req, res) => {
    res.send(tweets.slice(Math.max(tweets.length - 10, 0)).map(tweet => {
        return { ...tweet, avatar: users.find(user => user.username === tweet.username).avatar };
    }));
});

app.get("/tweets/:username", (req, res) => {
    const { username } = req.params;
    const list = tweets.filter(tweet => tweet.username === username).map(tweet => {
        return { ...tweet, avatar: users.find(user => user.username === username).avatar };
    });
    res.send(list);
});

app.listen(5000, () => {
    console.log("Server online");
});
