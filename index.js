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
    if (username && tweet) {
        tweets.push({ username: username, tweet: tweet });
        res.status(201).send("OK");
    } else {
        res.status(400).send("Todos os campos são obrigatórios!")
    }
});

app.get("/tweets", (req, res) => {
    res.send(tweets.slice(Math.max(tweets.length-10,0)).map(tweet => {
        tweet.avatar = users.find(user => user.username === tweet.username).avatar;
        return tweet;
    }));
});

app.listen(5000, () => {
    console.log("Server online");
});
