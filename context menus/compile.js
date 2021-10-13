import { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import parseCodeBlock from '../utils/functions/parseCodeBlock.js';
import request from 'request';
/**
 * @type {import('discord.js').ApplicationCommandData}
 */
export const data = {
	name: 'compile',
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
        "stdin": code[3]
    }
    interaction.reply('Found code, compiling...');
    const POSToptions = {
        method: 'POST',
        url: 'http://localhost:2358/submissions',
        qs: {base64_encoded: 'false', fields: '*'},
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': process.env.JUDGE_API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            useQueryString: true
        },
        body: body,
        json: true
    };
    request(POSToptions, function (error, response, body) {  // submitting code request to the api
        if (error) throw new Error(error);
        const token = body['token'];
        const GEToptions = {
                method: 'GET',
                url: 'http://localhost:2358/submissions/' + token,
                qs: {base64_encoded: 'false', fields: '*'},
                headers: {
                    'x-rapidapi-key': process.env.JUDGE_API_KEY,
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    useQueryString: true
                }
        };
        request(GEToptions, function (error, response, body) {  // fetching status of submission using token
            if (error) throw new Error(error);
            try{
              body = JSON.parse(body);
                if(body['stdout']){  // there was output to the code
                    interaction.editReply({ content: 'Compiled!', embeds: [new MessageEmbed()
                        .setColor('#5664F3')
                        .setFooter(message.member.nickname, message.author.avatarURL())
                        .setTitle("🟢 Accepted")
                        .setThumbnail(languageData.image)
                        .setDescription(`\`\`\`${code[1]}\`\`\``)
                        .addField("Output: ", body['stdout'], true)
                        .addField("Status: ", body['status']['description'], true)
                        .addField('\u200B', '\u200B')
                        .addField("Time: ", `${body['time']}ms`, true)
                        .addField("Ran in ", body['language']['name'], true)
                        .addField("Input: ", body['stdin'] == ''? 'None' : body['stdin'], true)
                        .addField("Token: ", `\`${token}\``, false)]}
                    )
                }
                else if(body['status'] === "Processing"){  // code is still running
                    interaction.editReply({ content: 'Compiled!', embeds: [new MessageEmbed()
                        .setColor('#5664F3')
                        .setFooter(message.member.nickname, message.author.avatarURL())
                        .setTitle("🟢 Try that again")
                        .setDescription("Looks like there was an error. Try that command again.")]}
                    )
                }
                else{ // code didn't have an output
                    interaction.editReply({ content: 'Compiled!', embeds: [new MessageEmbed()
                        .setColor('#5664F3')
                        .setFooter(message.member.nickname, message.author.avatarURL())
                        .setTitle("🟢 Accepted")
                        .setDescription(`\`\`\`${code}\`\`\``)
                        .addField("Error: ", body['stderr'])
                        .addField("Compile output: ", `\`\`\`${body['compile_output']}\`\`\``)
                        .addField("Status: ", body['status']['description'])
                        .addField("Time: ", `${body['time']}ms`)
                        .addField("Ran in ", body['language']['name'])]}
                    )
                }
            }
            catch(e){
                console.log(e);
                return interaction.editReply('There was an error.');
            }
        });
    });
};
