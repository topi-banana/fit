import { REST } from '@discordjs/rest'
import { Routes,SlashCommandBuilder } from 'discord.js'

import dotenv from 'dotenv'
dotenv.config()

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

//restはHTTP通信用
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN)
rest.put(Routes.applicationCommands( '1035086667268231251' ), { body: commands })
.then(data => console.log(`${data.length} 個のアプリケーション コマンドが正常に登録されました。`))
.catch(console.error)
