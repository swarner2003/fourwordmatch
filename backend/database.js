import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

//the ? is for security (prevents sql injection)
export async function getGame(id) {
    const [rows] = await pool.query(
        `SELECT * FROM four_word_match_table_information
        WHERE TableID = ?`, [id]
    )
    return rows[0]
}

export async function getOwnedGames(Aid) {
    const [rows] = await pool.query(
        `SELECT * FROM four_word_match_table_information
        WHERE AuthTokenID = ?`, [Aid]
    )
    return rows
}

export async function addUserToFetch(Aid, Nickname) {
    const result = await pool.query(
        `INSERT INTO four_word_match_user_fetch (AuthToken, Nickname)
        VALUES (?, ?)`, [Aid, Nickname]
    )
    return result
}

export async function createNewTable(Aid, Nickname, TableName, CatJson) {
    const [result] = await pool.query(
        `INSERT INTO four_word_match_table_information (AuthTokenID, TableName, TableAuthor, table_info)
        VALUES (?, ?, ?, ?)`, [Aid, Nickname, TableName, CatJson]
    )
    return result.insertId
}

export async function loadProfile(Aid, Nickname) {
    let [rows] = await pool.query(
        `SELECT * FROM four_word_match_user_fetch
        WHERE AuthToken = ?`, [Aid]
    )

    if (!rows[0]) {
        await addUserToFetch(Aid, Nickname);
        [rows] = await pool.query(
            `SELECT * FROM four_word_match_user_fetch
            WHERE AuthToken = ?`, [Aid]
        )
    }

    const ownedGames = await getOwnedGames(Aid)

    return {
        profile: rows[0],
        ownedGames: ownedGames
    }
}

export async function deleteTable(tid) {
    let [rows] = await pool.query(
        `DELETE FROM four_word_match_table_information
        WHERE TableID = ?`, [tid]
    )

    return rows
}

export async function getUserInformation(id) {
    const [rows] = await pool.query(
        ` SELECT * FROM four_word_match_user_fetch
        WHERE FourID = ?`, [id]
    )
    return rows[0]
}