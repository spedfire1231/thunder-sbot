const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'купить-ферму',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member

        const regist = await client.reg(member.id)

        const health = await client.health(member.id)

        const banned = await client.banacc(member.id)

        let amount = args[0]

        const ferma = await client.ferm(member.id)

        const embedreg1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Вы не зарегестрированы!\nДля регистрации нового аккаунта введите - **!старт [Ваш игровой ник]**\nПосле регистрации Вам будут доступны команды бота!')
        .setTimestamp()
        .setFooter('')

        if(regist === 0) return message.channel.send(embedreg1)

        const embedhealth1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Ваше состояние здоровья не позволяет использовать данную команду!')
        .setTimestamp()
        .setFooter('')

        if(health <= 30) return message.channel.send(embedhealth1)

        const embedban1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Ваш игровой аккаунт заблокирование администратором бота! Если Вы уверенны, что это ошибочный бан обратитесь к разработчику!')
        .setTimestamp()
        .setFooter('')

        if(banned === 1) return message.channel.send(embedban1)

        if(!args[0]) return message.channel.send('Укажите количество ферм для покупки')

        const embednum = new MessageEmbed()

        .setTitle('💡 Подсказка! 💡')
        .setColor('RANDOM')
        .setDescription('Пожалуйста, введите число, а не символ!')
        .setTimestamp()
        .setFooter('')
    
        if(isNaN(args[0])) return message.channel.send(embednum)

        message.channel.send(`Вы купили ${amount} биткоин ферм, с вашего счета было снято ${amount*100000}$`)

        client.addferm(member.id, parseInt(amount))

        client.rmv(member.id, parseInt(args[0]*100000))
    }
}