import https from 'https'
import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 8000
const TOKEN = process.env.LINE_ACCESS_TOKEN

import { DB } from './db.js'
import { DISCORD } from './discord_webhook.js'
import { LINE } from './line_getop.js'
import { OAUTH } from './oauth.js'

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendStatus(200)
})


app.post("/webhook", async (req, res) => {
	res.send("HTTP POST request sent to the webhook URL!")
	// ユーザーがボットにメッセージを送った場合
	const dt = req.body.events[0]
	if (dt.type === "message") {
		const groupID = dt.source.groupId
		const info = await DB.LINE(groupID)
		// console.log(info)
		// データベースに存在するかのチェック
		if(info.length){
			// 存在するとき
			DISCORD(info,dt)
  	}else{
			// 存在しないとき
			console.log(groupID)
			let code = OAUTH.create(groupID)
			console.log(code)
			let message = `Discordと連携されていません。\n設定するにはDiscordの連携したいチャンネルで以下のコマンドを送信してください(制限時間:20秒)\n/set code:${code.pass}`
			await LINE.push(groupID,message)
		}
	}
})


app.listen(PORT, () => {
  console.log(`Example app listening at https://node.topi.cf/ (port:${PORT})`)
})
