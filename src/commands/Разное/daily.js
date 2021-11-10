const{ Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'бонус',
    cooldown: 1000 * 60 * 60 * 24, // 24 часа


    run: async (client,message,args) => { 

        const member = message.mentions.members.first() || message.member

        const regist = await client.reg(member.id)

        const banned = await client.banacc(member.id)

        const name = await client.name(member.id)


        const coins = Math.floor(Math.random() * 2500) + 550

        const embedreg1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Вы не зарегестрированы!\nДля регистрации нового аккаунта введите - **!старт [Ваш игровой ник]**\nПосле регистрации Вам будут доступны команды бота!')
        .setTimestamp()
        .setFooter('')

        if(regist === 0) return message.channel.send(embedreg1)

        const embedban1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Ваш игровой аккаунт заблокирование администратором бота! Если Вы уверенны, что это ошибочный бан обратитесь к разработчику!')
        .setTimestamp()
        .setFooter('')

        if(banned === 1) return message.channel.send(embedban1)

        const embedname = new MessageEmbed()

        .setTitle('Ежедневный Бонус')
        .setColor('BLUE')
        .setDescription(`Вы получили ежедневный бонус в размере - ${coins}$
        \n\n\nУ Вас не установлен никнейм, сделать вы его можете командой **!addname**`)
        .setTimestamp()
        .setFooter('')

        if(name === 'unnamed') return message.channel.send(embedname)

        const embed = new MessageEmbed()

        .setTitle('Ежедневный Бонус')
        .setColor('BLUE')
        .setDescription(`Вы получили ежедневный бонус в размере - ${coins}$`)
        .setTimestamp()
        .setFooter('')

        message.channel.send(embed)

        client.add(message.author.id , coins)
    }
}