import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let _username = null;
let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    _username = username;
    users.push({ username: username, avatar: avatar });
    res.send("OK");
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    tweets.push({ username: username, tweet: tweet });
    res.send("OK");
});

app.get("/tweets", (req, res) => {
    res.send(tweets.map(tweet => {
        tweet.avatar = users.find(user => user.username === tweet.username).avatar;
        return tweet;
    }));
});

app.listen(5000, () => {
    console.log("Server online");
});
