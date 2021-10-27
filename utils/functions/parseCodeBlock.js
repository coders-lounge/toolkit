import fs from 'fs';
import { Message, CommandInteraction } from 'discord.js'

/**
 * 
 * @param {Message} message - The message to be parsed
 * @param {CommandInteraction} interaction - The interaction object
 * @returns {Array} Returns an array containing the lang index, language, code, and input
 */

export default async function parseCodeBlock(message, interaction) {
    let lines = message.content.split("\n");
    let lang = lines[0].slice(3);
    const indices = JSON.parse(fs.readFileSync("./languageVersions.json"));
    let languageData;
    let language;
    Object.entries(indices).forEach(langObj => {  // checking if the language in the code block is valid
        if(langObj[1].ext.includes(lang)){
            languageData = langObj[1];
            language = langObj[0];
        }
    })
    if(!languageData){ // if the language is not valid
        await interaction.reply({ 
            content: "Invalid language or format! Use /languages to see what languages I can compile, and here's an example of how to format your code: ", 
            files: ['https://cdn.discordapp.com/attachments/834443815205077032/896820108930973756/DiscordPTB_KT8YUCokqv.png']
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
    return [index, language, code, input];
}