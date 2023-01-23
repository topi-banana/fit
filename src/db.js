import mysql from 'mysql'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import dotenv from 'dotenv'
dotenv.config()

const client = mysql.createConnection({
	host: 'localhost',
	user: 'topi',
	password: '20070807',
	database: 'fit'
});

const DB = {
	LINE: async (chID) => {
		const sql = `SELECT * FROM main WHERE LINE_Channel='${chID}'`
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
	Discord: async (chID) => {
		const sql = `SELECT * FROM main WHERE Discord_Channel='${chID}'`
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
