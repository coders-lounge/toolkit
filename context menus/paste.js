import { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import parseCodeBlock from '../utils/functions/parseCodeBlock.js';
import request from 'request';
/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'paste',
	type: 'MESSAGE',
};

/**
 * @param {Client} client - The instantiated client object
 * @param {CommandInteraction} interaction - The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
    const message = interaction.options.getMessage('message');
	const code = await parseCodeBlock(message, interaction);
    if(!code) return;
    const body = {
        "source_code": code[2],
        "language_id": code[0],
        "language": code[1],
        "name": code[3]
    }
    interaction.reply('Found code, compiling...');
    const pasteOptions = {
        method: 'POST',
        url: 'https://pastebin.com/api/api_post.php',
        form: {
            api_dev_key: process.env.PASTEBIN_DEV_KEY,
            api_user_key: process.env.PASTEBIN_USER_KEY,
            api_option: 'paste',
            api_paste_format: body.language,
            api_paste_name: body.name,
            api_paste_code: body.source_code
        }
    }
    request(pasteOptions, function (error, response, body) {
        if (error) throw new Error(error);
        const embed = new MessageEmbed()
            .setTitle('🟢 Accepted')
            .setURL(body)
            .setDescription('Your paste was sucessfully created.')
            .setColor('#5664F3')
            .setTimestamp()
        interaction.editReply({ embeds: [embed] });
    })
};
