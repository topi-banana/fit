import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const esy = async (url, body) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + process.env.LINE_ACCESS_TOKEN
		},
		body: JSON.stringify(body)
	})
	const json = await response.json()
	return json
}


const LINE = {
	profile: async (userId) => {
		const url = `https://api.line.me/v2/bot/profile/${userId}`
		return await esy(url)
	},
	contents: async (messageId) => {
		const url = `https://api-data.line.me/v2/bot/message/${messageId}/content`
		return await esy(url)
	},
	push: async (groupId, message) => {
		const body = {
			to: groupId,
			messages: [
				{
					type: 'text',
					text: message
				}
			]
		}
		const url = `https://api.line.me/v2/bot/message/push`
		return await esy(url,body)
	},
	limit: async () => {
		const url1 = 'https://api.line.me/v2/bot/message/quota'
		const url2 = 'https://api.line.me/v2/bot/message/quota/consumption'
		const limit = ( await esy(url1) ).value
		const still = ( await esy(url2) ).totalUsage
		return { limit, still }
	}
}

export { LINE }
