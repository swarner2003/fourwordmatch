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