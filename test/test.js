import mysql from 'mysql2/promise'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import dotenv from 'dotenv'
dotenv.config()

(async() => {
const client = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const sql = `select * from main where LINE_Channel="${chID}"`

const [rows, fields] = await conn.execute(sql)

console.log(rows, fields)
})()