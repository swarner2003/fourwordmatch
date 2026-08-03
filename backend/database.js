import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise()

async function getGame() {
    const [rows] = await pool.query("SELECT * FROM four_word_match_table_information")
    return rows
}

const game = await getGame() 
console.log(game)