import express from "express";
import cors from "cors";

import { getGame, loadProfile, getUserInformation, getOwnedGames } from "./database.js";

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke :(')
});

app.get("/four_word_match_table_information/:id", async (req, res) => {
    const id = req.params.id
    const game = await getGame(id)
    res.send(game)
});

app.get("/four_word_match_user_fetch/:Aid", async (req, res) => {
    const Aid = req.params.id
    const createdGames = await getGame(Aid)
    res.send(createdGames)
});

app.get("/four_word_match_user/:Auth0Token/:Nickname", async (req, res) => {
    const {Auth0Token, Nickname} = req.params
    const result = await loadProfile(Auth0Token, Nickname)
    res.send(result)
});

app.get("/four_word_match_user_info/:profileID", async (req, res) => {
    const id = req.params.profileID
    const userResults = await getUserInformation(id)
    const aID = userResults.AuthToken
    const nickName = userResults.Nickname

    const result = await loadProfile(aID, nickName)

    res.send(result)
});

app.listen(8080, () => {
    console.log("Server started on port 8080")
});