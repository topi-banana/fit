import { REST } from '@discordjs/rest'
import { Routes,SlashCommandBuilder } from 'discord.js'

import dotenv from 'dotenv'
dotenv.config()

// コマンドの設定
const commands = [
	new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help'),

	new SlashCommandBuilder()
		.setName('about')
		.setDescription('About'),

	new SlashCommandBuilder()
		.setName('set')
		.setDescription('Link setting')
		.addStringOption(option => option
			.setName('code')
			.setDescription('Passcode')
			.setRequired(true)
		),

		new SlashCommandBuilder()
		.setName('status')
		.setDescription('Status'),
]
.map(command => command.toJSON())

const cmdBuild = async() => {
	//restはHTTP通信用
	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN)
	return await rest.put(Routes.applicationCommands( process.env.DISCORD_APPLICATION_ID ), { body: commands })
}

export { cmdBuild }