const{ Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'депозит',

    /**
    *@param {Client} client
    *@param {Message} message
    *@param {String[]} args
    */

    run: async (client,message,args) => { 

        const member = message.mentions.members.first() || message.member;

        const bal = await client.bal(message.member.id)

        const regist = await client.reg(member.id)

        const name = await client.name(member.id)

        const embedreg1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Вы не зарегестрированы!\nДля регистрации нового аккаунта введите - **!старт [Ваш игровой ник]**\nПосле регистрации Вам будут доступны команды бота!')
        .setTimestamp()
        .setFooter('Версия - 0.4')

        if(regist === 0) return message.channel.send(embedreg1)
        
        const emptyembed = new MessageEmbed()

        .setTitle('💡 Подсказка! THUNDER CENTRAL BANK 💡')
        .setColor('GREY')
        .setDescription('Введите значение которое хотите положить в банк!')
        .setTimestamp()
        .setFooter('Версия - 0.2')

        if(!args[0]) return message.channel.send(emptyembed)

        const embednum = new MessageEmbed()

        .setTitle('💡 Подсказка! THUNDER CENTRAL BANK 💡')
        .setColor('RANDOM')
        .setDescription('Пожалуйста, введите число, а не символ которое хотите положить на банковский счёт!')
        .setTimestamp()
        .setFooter('Версия - 0.2')
    
        if(isNaN(args[0])) return message.channel.send(embednum)
    
        if(args[0].includes('-')) return message.channel.send('Вы не можете положить деньги в минус')
    
        const embednocash = new MessageEmbed()
    
        .setTitle('Подсказка! THUNDER CENTRAL BANK')
        .setColor('RANDOM')
        .setDescription(`У Вас недостаточно средств! Заработайте более денег либо положите сумму до **${bal}$**!`)
        .setTimestamp()
        .setFooter('Версия - 0.2')
    
        if (parseInt(args[0]) > bal) return message.channel.send(embednocash)

        client.addbank(member.id, parseInt(args[0]));

        client.rmv(member.userId, parseInt(args[0]));

        const embedname = new MessageEmbed()
        
        .setTitle('Успешно!')
        .setColor('GREEN')
        .setDescription(`Вы успешно положили на счёт **${args[0]}$**
        \n\n\nУ Вас не установлен никнейм, сделать вы его можете командой **!addname**`)
        .setTimestamp()
        .setFooter('Версия - 0.2')

        if(name === 'unnamed') return message.channel.send(embedname)

        const embed = new MessageEmbed()
        
        .setTitle('Успешно!')
        .setColor('GREEN')
        .setDescription(`${name}, Вы успешно положили на счёт **${args[0]}$**`)
        .setTimestamp()
        .setFooter('Версия - 0.2')

        message.channel.send(embed)
    }
}