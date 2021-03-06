const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'продать-фишки',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const member = message.mentions.members.first() || message.member

        const regist = await client.reg(member.id)

        const health = await client.health(member.id)

        const bal = await client.bal(member.id)

        const name = await client.name(member.id)

        const stavka = await client.stavka(member.id)

        const banned = await client.banacc(member.id)

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

        if(health <= 50) return message.channel.send(embedhealth1)

        const embedban1 = new MessageEmbed()

        .setTitle('Ошибка!')
        .setColor('RED')
        .setDescription('Ваш игровой аккаунт заблокирование администратором бота! Если Вы уверенны, что это ошибочный бан обратитесь к разработчику!')
        .setTimestamp()
        .setFooter('')

        if(banned === 1) return message.channel.send(embedban1)

        let setstavka = args[0]

        const casinopool = parseInt(setstavka)

        if(!setstavka) return message.channel.send('Укажите количество фишек для игры в казино')

        const embednum = new MessageEmbed()

        .setTitle('💡 Подсказка! THUNDER CASINO 💡')
        .setColor('RANDOM')
        .setDescription('Пожалуйста, введите число, а не символ которое хотите преобрести!')
        .setTimestamp()
        .setFooter('')
    
        if(isNaN(args[0])) return message.channel.send(embednum)
    
        if(args[0].includes('-')) return message.channel.send('Вы не можете положить деньги в минус')
    
        const embednocash = new MessageEmbed()
    
        .setTitle('💡 Подсказка! THUNDER CASINO 💡')
        .setColor('RANDOM')
        .setDescription(`У Вас недостаточно фишек!`)
        .setTimestamp()
        .setFooter('')
    
        if (parseInt(args[0]) > stavka) return message.channel.send(embednocash)

        const embed = new MessageEmbed()
        
        .setTitle('Успешно!')
        .setColor('GREEN')
        .setDescription(`${name}, Вы продали **${setstavka}** фишек для игры в казино.\n На Ваш счёт зачислено **${setstavka*1300}$**`)
        .setTimestamp()
        .setFooter('')
        
        message.channel.send(embed)

        client.add(member.id, casinopool*1300)+client.addstavka(member.id, -casinopool)
        

    }
}