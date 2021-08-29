const{ Client, Message, MessageEmbed } = require('discord.js')

const job = require('../../models/job')

module.exports = {
    name: 'работать',
    cooldown: 1000 * 10, // 2 часа
    

    run: async (client,message,args) => { 

        job.findOne({
            Guild: message.guild.id,
            User: message.author.id,},
            async(err, data) => {

                const embed111 = new MessageEmbed()

                .setTitle('Ошибка!')
                .setColor('RED')
                .setDescription('У Вас нет работы!')
                .setTimestamp()
                .setFooter('Версия - 0.2')

                if(!data) return message.channel.send(embed111)

                const pay = Math.floor(Math.random() * (300))+50

                const payVIP = Math.floor(Math.random() * (100))+50

                const member = message.mentions.members.first() || message.member

                let user = message.author

                const vip = await client.vip(member.id)

                const embed = new MessageEmbed()
        
                .setTitle('Работа!')
                .setColor('GREEN')
                .setDescription(`Вы закончили рабочую смену работая **${data.Job}ом** и заработали - **${pay}$**`)
                .setTimestamp()
                .setFooter('Версия - 0.2')
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
        
                client.add(message.member.id, pay)
        
                if(vip == 0) return message.channel.send(embed)

                const embed2 = new MessageEmbed()
        
                .setTitle('Работа!')
                .setColor('GREEN')
                .setDescription(`Вы закончили рабочую смену работая **${data.Job}ом** и заработали - **${pay}$**\nДополнительно от VIP статуса вы заработали - **${payVIP}$**`)
                .setTimestamp()
                .setFooter('Версия - 0.2')
                .setThumbnail(user.displayAvatarURL({dynamic: true}))
        
                client.add(message.member.id, pay + payVIP)
        
                if(vip == 1) return message.channel.send(embed2)
        })


    }
}