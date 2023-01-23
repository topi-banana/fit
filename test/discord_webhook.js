import fetch from 'node-fetch'
import { LINE } from './line_getop.js'

const DISCORD = async (info,data) => {
	const user = await LINE.profile(data.source.userId)
	const url = info[0].Discord_Webhook
	const body = {
		content: data.message.text,
		username: user.displayName,
		avatar_url: user.pictureUrl
	}
	await fetch(url, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(body)
	})
}

export { DISCORD }
