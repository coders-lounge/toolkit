import { Client, SelectMenuInteraction, MessageEmbed } from 'discord.js';
import fs from 'fs';
export const id = 'compiler_languages';



/**
 * @param {Client} client The instantiated client object
 * @param {SelectMenuInteraction} interaction The Interaction object
 * @returns {void}
 */
export const execute = async (client, interaction) => {
	const options = interaction.values;
    const languages = JSON.parse(fs.readFileSync('./languageVersions.json'));
    const langObj = languages[options[0]];
    console.log(langObj);
    const extensions = langObj.ext.map(ext => `\`${ext}\``).join(', ');
    const infoEmbed = new MessageEmbed()
        .setAuthor(interaction.member.nickname, interaction.member.user.displayAvatarURL())
        .setTitle(langObj.name)
        .setThumbnail(langObj.image)
        .addField('ID: ', `\`${langObj.id}\``)
        .addField('Engine:', langObj.engine, true)
        .addField('Valid Extensions', extensions)
        .setColor('#5664F3');
    interaction.reply({
        embeds: [infoEmbed],
        ephemeral: true,
    })
};
