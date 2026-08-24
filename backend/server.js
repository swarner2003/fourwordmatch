import express from "express";
import cors from "cors";

import { getGame, loadProfile, getUserInformation, getOwnedGames, createNewTable, deleteTable } from "./database.js";

import dotenv from 'dotenv'
dotenv.config()

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL, 
    'https://fourwordmatch.com',
    'https://fourwordmatch.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(express.json());

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke :(')
});

app.post("/four_word_match_table_create", async (req, res) => {
    const { tableTitle, NickName, AuthToken, 
            sCat, s1, s2, s3, s4,
            mCat, m1, m2, m3, m4,
            hCat, h1, h2, h3, h4,
            tCat, t1, t2, t3, t4,} = req.body;

    const catJson = `{"straightforward": ["${sCat}", "${s1}", "${s2}", "${s3}", "${s4}"], 
                      "medium": ["${mCat}", "${m1}", "${m2}", "${m3}", "${m4}"], 
                      "hard": ["${hCat}", "${h1}", "${h2}", "${h3}", "${h4}"], 
                      "trick": ["${tCat}", "${t1}", "${t2}", "${t3}", "${t4}"]}`

    const result = await createNewTable(AuthToken, tableTitle, NickName, catJson);
    res.send(result)
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

app.get("/delete_table/:tid", async (req, res) => {
    const targetID = req.params.tid
    const result = await deleteTable(targetID)

    res.send(result)
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});