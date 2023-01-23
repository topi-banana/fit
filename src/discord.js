import { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder, SlashCommandBuilder} from 'discord.js'

import dotenv from 'dotenv'
dotenv.config()

import { DB } from './db.js'
import { LINE } from './line_getop.js'
import { OAUTH } from './oauth.js'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent
	],
	partials: [Partials.Channel],
})

client.on('messageCreate', async msg => {
	if(msg.webhookId) return;
	const info = await DB.Discord(msg.channel.id)
	if(info.length){
		const groupId = info[0].LINE_Channel
		const message = `${msg.author.username}：${msg.content}`
		console.log(await LINE.push(groupId, message))
	}
	// console.log('message')
})

client.on("interactionCreate", async interaction => {
	if(!interaction.isCommand()) return;
	let embed = new EmbedBuilder()
		.setTitle(`Fit - ${interaction.commandName}`)
		.setColor('#00CEFF')
		.setTimestamp()
		.setFooter({ text: 'made by とぴ。', iconURL: 'https://pbs.twimg.com/profile_images/1503867767275290626/-L0rWf-r_400x400.jpg' })

	switch(interaction.commandName){
		case 'help':
			embed
				.setDescription('Do you need a help?\nIf you need to contact the developer, go to [topi.cf](https://topi.cf).\nIf you want other information, use about. ```\nThe maximum number of channels that can b    e linked by one user is 4.```')
				.addFields(
					{
						name: 'PrivacyPolicy',
						value: 'these last two',
						inline: true
					},
					{
						name: 'Let\'s invite!<:thonkang:219069250692841473>',
						value: '[Discord Server](https://discord.com/api/oauth2/authorize?client_id=1035086667268231251&permissions=0&scope=bot%20applications.commands)\n[LINE Account](https://liff.line.me/1645278921-kWRPP32q/?accountId=996zdsyq)',
						inline: true
					}
				)
				.setThumbnail('https://qr-official.line.me/sid/L/996zdsyq.png')
			break

		case 'about':
			embed
				.setDescription('Connect Discord and LINE\nMade By とぴ。\nContact -> [topi.cf](https://topi.cf) ```\nThe maximum number of channels that can be linked by one user is 4.```')
				.addFields(
					{
						name: 'help',
						value: 'Show help.\nUse it when you\'re in trouble!'
					},
					{
						name: 'about',
						value: 'About me.\nWant to know about me, contact the developer.'
					},
					{
						name: 'set',
						value: 'It is used to send the passcode issued by LINE when performing collaboration work, but please do not abuse it.'
					}
				)
			break
		
		case 'status':
			const {limit, still} = await LINE.limit()
			const c = '#'.repeat( 40*still/limit ) + ' '.repeat( 40 - 40*still/limit )
			const b = ' '.repeat( 40 )
			embed
				.setDescription(`This server status and bot status.\nThis server can send ${100} messages per month.\n(It may increase if you charge.)`)
				.addFields(
					{
						name: 'This server',
						value: `\`\`\`fix\n[ NaN/NaN ]\n[${b}] [NaN%]\n\`\`\``
					},
					{
						name: 'Bot',
						value: `\`\`\`css\n[ ${still}/${limit} ]\n[${c}] [${100*still/limit}%]\n\`\`\``
					}
				)
			break
		case 'set':
			const passcode = interaction.options._hoistedOptions[0].value
			const res = await OAUTH.check(passcode)
			console.log(res)
			if(res){
				console.log('認証完了')
			}else{
				console.log('認証失敗')
			}
			embed
			break
	}
//	console.log(msg)
	await interaction.reply({ embeds: [embed] })
})
client.login(process.env.DISCORD_BOT_TOKEN)
