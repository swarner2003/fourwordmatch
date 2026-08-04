import express from "express";
import cors from "cors";

import { getGame } from "./database.js";

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

app.listen(8080, () => {
    console.log("Server started on port 8080")
});