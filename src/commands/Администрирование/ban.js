const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const member = message.mentions.members.first() || message.member

        const name = await client.name(message.member.id)

        let player = args[0]

        const embedna = new MessageEmbed()

        .setTitle('Подсказка!')
        .setColor('BLUE')
        .setDescription('Укажите игрока которому хотите выдать блокировку')
        .setFooter('Версия - 0.9')
        .setTimestamp('')

        if(!args[0]) return message.channel.send(embedna)

        const embedbanned = new MessageEmbed()

        .setTitle('Успешно!')
        .setColor('BLUE')
        .setDescription(`${name}, Вы успешно выдали блокировку игроку - **${player}**.`)
        .setFooter('Версия - 0.9')
        .setTimestamp('')

        message.channel.send(embedbanned)

        client.addbanacc(member.id, 1)

        message.channel.send('Блокировка аккаунта успешно выдана!')



    }
}