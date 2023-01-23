import mysql from 'mysql2/promise'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import dotenv from 'dotenv'
dotenv.config()

let client

const DB = {
	// 初期設定
	init: async() => {
		client = await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME
		});
		return true
	},
	// LINEのchIDから探す
	LINE: async (chID) => {
		const sql = `SELECT * FROM main WHERE LINE_Channel="${chID}"`
		let result
		client.query(sql, (error, response) => {
			if(error) throw error
			result = JSON.parse(JSON.stringify(response))
		})
		while (result==undefined) {
			await sleep(10)
		}
		return result
	},
	// DiscordのchIDから探す
	Discord: async (chID) => {
		const sql = `SELECT * FROM main WHERE Discord_Channel="${chID}"`
		let result
		client.query(sql, (error, response) => {
			if(error) throw error
			result = JSON.parse(JSON.stringify(response))
		})
		while (result==undefined) {
			await sleep(10)
		}
		return result
	},
}

export { DB }
