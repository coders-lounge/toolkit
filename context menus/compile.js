import { Client, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';
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
    await interaction.deferReply();
    const message = interaction.options.getMessage('message');
	let lines = message.content.split("\n");
    let lang = lines[0].slice(3);
    const indices = await JSON.parse(fs.readFileSync("./languageVersions.json"));
    let languageData;
    Object.values(indices).forEach(langObj => {  // checking if the language in the code block is valid
        if(langObj.ext.includes(lang)){
            languageData = langObj;
        }
    })
    if(!languageData){
        await interaction.editReply({ 
            content: "Invalid language or format, here's an example of what it should look like:", 
            files: ['https://media.discordapp.net/attachments/834443815205077032/896600964730077214/DiscordPTB_fr8ZVfRTa3.png?width=900&height=255']
        });
        return;
    }
    const index = languageData.id;
    let endCodeLine;
    let input = "";
    let code = "";
    for(let i = 1; i < lines.length; i ++){  // finding the code block, adding formatting
        if(lines[i].startsWith('```')){ 
            endCodeLine = i;
            break;
        }
        code += lines[i];
        code += "\n";
    }
    if(endCodeLine != lines.length-1){  // if the code block is not the last line i.e. there is input
        for(let i = endCodeLine+1; i < lines.length;i ++){
            input += lines[i];
        }
    }
    code.trim(); 
    const body = {
        "source_code": code,
        "language_id": index,
        "stdin": input
    }
    interaction.editReply('Found code, compiling...');
    const POSToptions = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
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
                url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
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
                    interaction.editReply({embeds: [new MessageEmbed()
                        .setColor('#5664F3')
                        .setFooter(message.member.nickname, message.author.avatarURL())
                        .setTitle("🟢 Accepted")
                        .setThumbnail(languageData.image)
                        .setDescription(`\`\`\`${code}\`\`\``)
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
                    interaction.editReply({embeds: [new MessageEmbed()
                        .setColor('#5664F3')
                        .setFooter(message.member.nickname, message.author.avatarURL())
                        .setTitle("🟢 Try that again")
                        .setDescription("Looks like there was an error. Try that command again.")]}
                    )
                }
                else{ // code didn't have an output
                    interaction.editReply({embeds: [new MessageEmbed()
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
