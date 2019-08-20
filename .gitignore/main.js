const config = require('./config.json');
const Discord = require('discord.js');
const moment = require('moment');
const bot = new Discord.Client();
const { get } = require("snekfetch"); 
bot.commands = new Discord.Collection();
const superagent = require("snekfetch");


bot.on('ready', () => {
    bot.user.setGame("Command: *_help*")
    console.log(`Hanko est en ligne !`);
    bot.user.setActivity(" _help", {type: "PLAYING"});
})

bot.on(`message`, async message => {
let prefix = config.prefix;
let messageArray = message.content.split(' ');
let command = messageArray[0];
let args = messageArray.slice(1);
 
    if (message.author.bot) return;
    if (message.channel.type === 'dm')return;

    if (command === `${prefix}kick`) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
        if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
        member.kick()
        message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:')
    }
        if (command === `_roll`) {
            if(message.content.startsWith(prefix + 'roll')) {
                let args = message.content.split(' ').slice(1); 
                let nb = Math.floor(Math.random() * args[0]);
                if(!args[0]) return message.reply("Veuillez mettre un nombre.");
                message.reply(`**Tu as roll le nombre : ${nb}.**`);
            console.log('Roll')
            }
        }

    if (command === `_help`) {
        let embed = new Discord.RichEmbed()
            .setTitle('Liste des commandes :')
            .setDescription('**Utiles :earth_africa:** \n `help`\, `helprp`\, `prefix`\, `infobot`\, `serverinfo`\, `userinfo`\, `ping`\, `sondage`\, `anime`\, `invite`\, `invitebot`')
            .addField('**Modérations :crossed_swords:**', '** **`ban`\, `kick`\, `warn`\, `mute`\, `tempmute`\, `clear`')
            .addField('**Fun :tada:**', '** **`say`\, `8ball` \, `anime`\, `baka`\, `gun`\, `slap`\, `cry`\, `hug`\, `kiss`\, `cuddle`\, `kemonomimi`\, `waifu`\, `pat`\,  `ghost`')
            .addField('**NSFW :underage:**', '** **`nude`\, `hentaigif`\, `nekogif`\, `anal`\, `pussy`\, `yuri`\, `lewd`')
            .addField('**Images :camera:**', '** **`avatar`\, `cat`\, `dog`')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
         return message.channel.send(embed);
        }

    if (command === `_helprp`) {
        let embed_12 = new Discord.RichEmbed()
            .setTitle('Liste des commandes :')
            .setDescription('**RP :game_die:** \n `roll`\, `rasengan`\, `rasenshuriken`\, `bijumode`\, `kyumode`\, `bijuorbe`\, `godthunder`\, `medical`')
            .addField('**Uchiha :**', '** ** `chidori`\, `raikiri`\, `susanosalmar`\, `susanoyuna`\, `susanorazam`\, `tsukuyomi`\, `kamui`\, `kotoamatsukami`\, `sharingan`\, `kirin`')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
         return message.channel.send(embed_12);
        }

    if(command === '<@603334827516755983>') {
        message.channel.send("Le préfix pour utiliser mes commandes est : `_` ")
    }

    if (command === `_infobot`) {
        let member = message.mentions.members.first() || message.member,
    user = member.user;
    let os = require('os')
    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        let info_embed = new Discord.RichEmbed()
            .setAuthor(bot.user.username + '#' + bot.user.discriminator, bot.user.displayAvatarURL)
            .setColor('#dc134c')
            .setThumbnail(`${bot.user.displayAvatarURL}`)
            .addField("Créateur :", 'Azuki#3880')
            .addField("Hanko a été crée le :", `${moment.utc(bot.user.createdAt).format('DD/MM/YYYY à HH:mm:ss')}`, true)
            .addField("Memoire :", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("Utilisateurs :", `${bot.users.size.toLocaleString()}`, true)
            .addField("Servers :", `${bot.guilds.size.toLocaleString()}`, true)
            .addField("Library :", 'Discord js')
            .addField("Invite Link :", ' https://discordapp.com/oauth2/authorize?client_id=603334827516755983&scope=bot&permissions=8232 ')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(info_embed);
    };
   
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    if (command === `_serverinfo`) {
        let servIcon = message.guild.iconURL;
        let servEmbed = new Discord.RichEmbed()
        let embed_03 = new Discord.RichEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setURL(' https://discord.gg/pMmpJyh ')
        .setColor('#dc134c')
        .addField("Nom du Serveur", message.guild.name, true)
        .addField("Créateur :", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
        .addField("Total | Humains | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
        .addField("Salons :", message.guild.channels.size, true)
        .addField("Roles :", message.guild.roles.size, true)
        .addField("Date de création du serveur :", `${moment.utc(message.channel.guild.createdAt).format('DD/MM/YYYY à HH:mm:ss')}`)
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setThumbnail(message.guild.iconURL)
        .setTimestamp();
     return message.channel.send(embed_03);
    }
    
    if (message.content === `${prefix}userinfo`) {

    let member = message.mentions.members.first() || message.member,
    user = member.user;
    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setColor('#dc134c')
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField("ID :", `${user.id}`, true)
        .addField("Serveur :", message.guild.name, true)
        .addField("Status :", `${user.presence.status}`, true)
        .addField("Jeux : ", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Compte crée le :", `${moment.utc(user.createdAt).format('DD/MM/YYYY à HH:mm:ss')}`, true) 
        .addField("Roles:", member.roles.map(roles => `${roles}`).join(' | '), true)
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
return message.channel.send({ embed: embed });
    }

 else if (message.content === `${prefix}ui`) {
    let member = message.mentions.members.first() || message.member,
    user = member.user;
    const joinDiscord = moment(user.createdAt).format('llll');
    const joinServer = moment(user.joinedAt).format('llll');
    let embed = new Discord.RichEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setColor('#dc134c')
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField("ID :", `${user.id}`, true)
        .addField("Serveur :", message.guild.name, true)   
        .addField("Status :", `${user.presence.status}`, true)
        .addField("Jeux : ", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Compte crée le :", `${moment.utc(user.createdAt).format('DD/MM/YYYY à HH:mm:ss')}`, true) 
        .addField("Roles:", member.roles.map(roles => `${roles}`).join(' | '), true)
        .setFooter("Hanko • fait par Azuki et Salmar")
        .setTimestamp();
return message.channel.send({ embed: embed });

}

 if(message.content.startsWith(prefix + 'cat')) {
    try {
        get('https://aws.random.cat/meow').then(res => {
            const embed = new Discord.RichEmbed()
            .setDescription("Meow")
            .setColor('#dc134c')
            .setImage(res.body.file)
            .setFooter("Hanko • fait par Azuki et Salmar")
            .setTimestamp();
            return message.channel.send({embed});
        });
    } catch(err) {
        return message.channel.send(err.stack);
    }}

    if (command === `${prefix}dog`) {
    superagent.get('https://nekos.life/api/v2/img/woof')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Woof")
      .setImage(response.body.url)
      .setColor(`#dc134c`)
      .setFooter('Hanko • fait par Azuki et Salmar')
      .setTimestamp();
  message.channel.send(lewdembed);
    })
    }     
    
    if (command === `${prefix}nude`) {
        if (message.channel.nsfw === false)
        return message.reply(":warning: Ce salon n'est pas en NSFW.")
        if (message.channel.nsfw === true) {
            let embed_35 = new Discord.RichEmbed()
            .setImage("https://www.planculsnap.com/uploads/medias/3e979ac216332eda53ab4ecef8df98bc.png?1.1")
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
        message.channel.send(embed_35)
                }}

            if (command === `${prefix}pussy`) {
            if (!message.channel.nsfw) return message.channel.send(':warning: Ce salon n\'est pas en NSFW.')
             superagent.get('https://nekos.life/api/v2/img/pussy')
                    .end((err, response) => {
                  const lewdembed = new Discord.RichEmbed()
                  .setTitle("Aww")
                  .setImage(response.body.url)
                  .setColor(`#dc134c`)
                  .setFooter('Hanko • fait par Azuki et Salmar')
                  .setTimestamp();
              message.channel.send(lewdembed);
                })
            }

    if (message.content === '_avatar') {
        let embed = new Discord.RichEmbed()
        .setDescription(`**${message.author.username}'s avatar**`)
        .setImage(message.author.avatarURL)
        .setColor('#dc134c')
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
          message.channel.send(embed)};


          if (command === `${prefix}nekogif`) {
          if (!message.channel.nsfw) return message.channel.send(":warning: Ce salon n'est pas en NSFW.")
          superagent.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
              .end((err, response) => {
            let lewdembed = new Discord.RichEmbed()
            .setDescription("Aww")
            .setImage(response.body.url)
            .setColor(`#dc134c`)
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
        message.channel.send(lewdembed);
          })
        }
        
        if (command === `${prefix}lewd`) {
        if (!message.channel.nsfw) return message.channel.send(":warning: Ce salon n'est pas en NSFW.")
        superagent.get('https://nekos.life/api/v2/img/lewd')
            .end((err, response) => {
          const lewdembed = new Discord.RichEmbed()
          .setDescription("Aww")
          .setImage(response.body.url)
          .setColor(`#dc134c`)
          .setFooter('Hanko • fait par Azuki et Salmar')
          .setTimestamp();
      message.channel.send(lewdembed);
        })
    }

        if (command === `${prefix}yuri`) {
        if (!message.channel.nsfw) return message.channel.send(":warning: Ce salon n'est pas en NSFW.")
        superagent.get('https://nekos.life/api/v2/img/yuri')
            .end((err, response) => {
          const lewdembed = new Discord.RichEmbed()
          .setDescription("Aww")
          .setImage(response.body.url)
          .setColor(`#dc134c`)
          .setFooter('Hanko • fait par Azuki et Salmar')
          .setTimestamp();
      message.channel.send(lewdembed);
        })        
    }

        if (command === `${prefix}anal`) {
            if (!message.channel.nsfw) return message.channel.send(":warning: Ce salon n'est pas en NSFW.")
    superagent.get('https://nekos.life/api/v2/img/anal')
        .end((err, response) => {
            const lewdembed = new Discord.RichEmbed()
            .setImage(response.body.url)
            .setColor(`#dc134c`)
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
  message.channel.send(lewdembed);
    })
        }
        if (command === `${prefix}hentaigif`) {
        if (!message.channel.nsfw) return message.channel.send(":warning: Ce salon n'est pas en NSFW.")
        superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif')
            .end((err, response) => {
          const lewdembed = new Discord.RichEmbed()
          .setTitle("Aww")
          .setImage(response.body.url)
          .setColor(`#dc134c`)
          .setFooter('Hanko • fait par Azuki et Salmar')
          .setTimestamp();
      message.channel.send(lewdembed);
        })}
    
    if (command === `_prefix`) {
        let embed_04 = new Discord.RichEmbed()
            .setTitle('Mon préfix est : `_`')
            .setDescription('')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_04);
    }

    if (command === `_azuki`) {
        let embed_05 = new Discord.RichEmbed()
            .setTitle('Infos concernant __Azuki__ :')
            .setDescription('Azuki ? l\'admin sympathique et cool (qui taff tout le temps), celui qui rigole et qui prend jamais la grosse tête, le tueur de démons. En plus, la légende raconte que Saitama et Naruto sont ses disciples.')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_05);
    }

    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage(':ping_pong: Pong ! Le ping est de **' + `${Date.now() - message.createdTimestamp}` + ' ms**');
    }

     if (command === `_salmar`) {
        let embed_06 = new Discord.RichEmbed()
            .setTitle('Infos concernant __Salmar__ :')
            .setDescription(' Salmar? C\'est l\'admin froid qui fait peur à Saï...mais il est gentil hein :) Amateur de ramen et de gâteaux au chocolat, il adore son adorable patate et les ptits cons comme ino... La legende raconte qu\'un jour, il eut si faim qu\'il se serait fait un steak avec un bout de cuisse de Kurama.')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_06);
    }

    if (command === `_suga`) {
        let embed_07 = new Discord.RichEmbed()
            .setTitle('Infos concernant __Suga__ :')
            .setDescription('Suga? C\'est la patate et aussi l\'admin très bonne qui ressemble a ta daronne quand elle veut montrer un peu d\'autorité... Son truc, eh bien c\'est les patates, les vannes vaseuses et Kakashi :) Oh et ne mentionnons pas le fait qu\'elle est arrivée sur le serveur en raison du grade Hokage, fopaldir.')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_07);
    }

    if (command === `_onii`) {
        let embed_08 = new Discord.RichEmbed()
            .setTitle('Infos concernant __Onii__ :')
            .setDescription('Gros pd mais pas trop non plus \n **Onii se masturbe devant des collégiennes**')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_08);
    }

    if(command === "_chidori") {
        let embed_09 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604049962812309525/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
    return message.channel.send(embed_09)};

    if(command === "_rasengan") {
        let embed_10 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604058479728132133/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_10)};
    
     if(command === "_rasenshuriken") {
        let embed_11 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://thumbs.gfycat.com/AngelicSeveralJellyfish-size_restricted.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_11)};

     if(command === "_raikiri") {
        let embed_13 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604065766643466273/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_13)};

     if(command === "_bijuorbe") {
        let embed_14 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604067239796146180/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_14)};

     if(command === "_susanosalmar") {
        let embed_15 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604069417994944512/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_15)};

     if(command === "_godthunder") {
        let embed_16 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604075772310847508/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_16)};

     if(command === "_tsukuyomi") {
        let embed_17 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604078587552727040/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_17)};

     if(command === "_kamui") {
        let embed_18 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://2.bp.blogspot.com/-8JslVliHsoQ/WAYmiNV7HbI/AAAAAAAAAmE/Q2pRDrZRa-QextiC-PwhFTpDqKmjGBrLACLcB/s1600/12%2B%255BDuyeahAnime.blogspot.com%255D.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_18)};

     if(command === "_kotoamatsukami") {
        let embed_22 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604082617247072286/1457284460_04.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_22)};

     if(command === "_sharingan") {
        let embed_23 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604087707739619338/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_23)};

     if(command === "_susanoyuna") {
        let embed_24 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("http://uploaddeimagens.com.br/images/001/106/346/full/tumblr_obys61QGvS1uzmvtto2_250.gif?1506380652")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_24)};

     if(command === "_medical") {
        let embed_25 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604088502812016654/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_25)};

     if(command === "_kirin") {
        let embed_19 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604089882733707294/PKH_Susanoo_Kirin.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_19)};

     if(command === "_kyumode") {
        let embed_31 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/611707348896972811/1540406674_2.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_31)};

     if(command === "_bijumode") {
        let embed_32 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/611710600673886232/tenor_1.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_32)};

     if(command === "_susanorazam") {
        let embed_33 = new Discord.RichEmbed()
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/611711775397642257/BlushingConsciousArmyant-size_restricted.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_33)};

     if(command === "_ok.") {
        let embed_20 = new Discord.RichEmbed()
            .setDescription(`**${message.author} "ok." **`)
            .setColor("#dc134c")
            .setImage("https://cdn.discordapp.com/attachments/356445864501444608/604431580605317151/image0.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
            message.delete (1)
     return message.channel.send(embed_20)};

     if(command === "_baka") {
        superagent.get('https://nekos.life/api/v2/img/baka')
        .end((err, response) => {
         const lewdembed = new Discord.RichEmbed()
        .setTitle("Idiot !")
        .setImage(response.body.url)
        .setColor(`#dc134c`)
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
  message.channel.send(lewdembed);
    })
     }

     if(command === "_gun") {
        let member = message.mentions.members.first()
        let embed_27 = new Discord.RichEmbed()
            .setTitle("Gun")
            .setDescription(`**Couchez-vous ! ${message.author.username} attomise ${member}:anguished: **`)
            .setColor("#dc134c")
            .setImage("https://cdn.weeb.sh/images/S1-RQVFjZ.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_27)};

     if(command === "_cry") {
        let embed_28 = new Discord.RichEmbed()
            .setTitle("Cry")
            .setDescription(`**Oh non... ${message.author.username} est entrain de pleurer... :cry:**`)
            .setColor("#dc134c")
            .setImage("https://cdn.weeb.sh/images/rJfB787PW.gif")
            .setFooter('Hanko • fait par Azuki et Salmar')
            .setTimestamp();
     return message.channel.send(embed_28)};

     if (command === `${prefix}hug`) {
     if(message.guild === null)return;
     const user = message.mentions.users.first();
     if(!user)
         return message.reply('**Mentionne quelqu\'un à hug ^^**');

     superagent.get('https://nekos.life/api/v2/img/hug')
         .end((err, response) => {
       const lewdembed = new Discord.RichEmbed()
       .setTitle(message.author.username + " fais un calin à " + user.username)
       .setImage(response.body.url)
       .setColor(`#dc134c`)
       .setDescription((user.toString() + " reçois un calin de " + message.author.toString()))
       .setFooter('Hanko • fait par Azuki et Salmar')
       .setTimestamp();
   message.channel.send(lewdembed);
     })
    }

     if(command === `${prefix}kiss`) {
        if(message.guild === null)return;
        const user = message.mentions.users.first();
        if(!user)
            return message.reply('**Mentionne quelqu\'un à kiss ^^**');

        superagent.get('https://nekos.life/api/v2/img/kiss')
            .end((err, response) => {
          const lewdembed = new Discord.RichEmbed()
          .setTitle(message.author.username + " embrasse " + user.username)
          .setImage(response.body.url)
          .setColor(`#dc134c`)
          .setDescription((user.toString() + " reçois un bisou de " + message.author.toString()))
          .setFooter('Hanko • fait par Azuki et Salmar')
          .setTimestamp();
      message.channel.send(lewdembed);
        })
    }

    if (command === `${prefix}cuddle`) {
    if(message.guild === null)return;
    const user = message.mentions.users.first();
    if(!user)
        return message.reply('**Mentionne quelqu\'un à cuddle ^^**');

    superagent.get('https://nekos.life/api/v2/img/cuddle')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle(message.author.username + " cuddle " + user.username)
      .setImage(response.body.url)
      .setColor(`#dc134c`)
      .setDescription((user.toString() + " se fait cuddle par " + message.author.toString()))
      .setFooter('Hanko • fait par Azuki et Salmar')
      .setTimestamp();
  message.channel.send(lewdembed);
    })
}

if (command === `${prefix}pat`) { 
if(message.guild === null)return;
const user = message.mentions.users.first();
if(!user)
    return message.reply('**Mentionne quelqu\'un à pat pat ^^**');

superagent.get('https://nekos.life/api/v2/img/pat')
    .end((err, response) => {
  const lewdembed = new Discord.RichEmbed()
  .setTitle(message.author.username + " pat pat " + user.username)
  .setImage(response.body.url)
  .setColor(`#dc134c`)
  .setDescription((user.toString() + " se fait pat pat par " + message.author.toString()))
  .setFooter('Hanko • fait par Azuki et Salmar')
.setTimestamp();
message.channel.send(lewdembed);
})
}

if (command === `${prefix}waifu`) {
    if(message.guild === null)return;

            superagent.get('https://nekos.life/api/v2/img/waifu')
                .end((err, response) => {
              const lewdembed = new Discord.RichEmbed()
              .setDescription(message.author.toString() + " Voici ta waifu ! Cute :3")
              .setImage(response.body.url)
              .setColor(`#dc134c`)
              .setURL(response.body.url);
          message.channel.send(lewdembed);
    })
    }
    

if (command === `${prefix}slap`) {
if(message.guild === null)return;
const user = message.mentions.users.first();
if(!user)
    return message.reply('**Mentionne quelqu\'un à slap! ._.**');

superagent.get('https://nekos.life/api/v2/img/slap')
    .end((err, response) => {
  const lewdembed = new Discord.RichEmbed()
  .setTitle(message.author.username + " slap " + user.username)
  .setImage(response.body.url)
  .setColor(`#dc134c`)
  .setDescription((user.toString() + " se fait slap par " + message.author.toString()))
  .setFooter('Hanko • fait par Azuki et Salmar')
.setTimestamp();
message.channel.send(lewdembed);
})
}

if (command === `${prefix}kemonomimi`) {
    superagent.get('https://nekos.life/api/v2/img/kemonomimi')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Cute ! :3")
      .setImage(response.body.url)
      .setColor(`#dc134c`)
      .setFooter('Hanko • fait par Azuki et Salmar')
      .setTimestamp();
  message.channel.send(lewdembed);
    })
}

if (command === `${prefix}8ball`) {
if(message.guild === null)return;

  
function doMagic8BallVoodoo() {
    var rand = ['Oui', 'Non', 'Retente pour voir ?', 'Qu\'est-ce que tu crois ? non!', 'Peut-être', 'Jamais', 'Compte sur lui'];

    return rand[Math.floor(Math.random()*rand.length)];
}

  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
  
// Later in the code:
var msg1 = Array(5); 
		msg1[1] = "Oui";
	    msg1[2] = "Non";
		msg1[3] = "Peut-être";
		msg1[4] = "Retente pour voir ?";
		msg1[5] = "Jamais"
        msg1[6] = ":)"
        var x = getRandomInt(0, 20);
		if (x < 5){ 
         if (x < 3){
			message.channel.sendMessage(msg1[1]);
		}
		else {
               message.channel.sendMessage(msg1[3]);
		}
		}
		else if (x<= 9) {
			if (x >= 7){
			message.channel.sendMessage(msg1[2]); }
				else{
                   message.channel.sendMessage(msg1[4]);
				}
		} 
		else if (x <= 12 ) { 
			message.channel.sendMessage(msg1[5]);
		}
		else {
			message.channel.sendMessage(msg1[6])
		} 
};
const malScraper = require('mal-scraper');

if (command === `${prefix}anime`) {
const search = `${args}`;
malScraper.getInfoFromName(search)
    .then((data) => {
    const malEmbed = new Discord.RichEmbed()
      .setAuthor(`Résultats de ma recherche pour : ${args}`.split(',').join(' '))
      .setThumbnail(data.picture)
      .setColor('#dc134c')
      .addField('English Title', data.englishTitle, true)
      .addField('Japanese Title', data.japaneseTitle, true)
      .addField('Type', data.type, true)
      .addField('Episodes', data.episodes, true)
      .addField('Evaluation', data.rating, true)
      .addField('Diffusé', data.aired, true)
      .addField('Note /10', data.score, true)
      .addField('Nombres de vues', data.scoreStats, true)
      .addField('Lien', data.url);

      message.channel.send(malEmbed);

})
}

if (command === `${prefix}sondage`) { 
if (!message.member.roles.find("name", "@everyone")) { 
    message.channel.send('Vous n\'avez pas les permissions.');
    return;
}

if (!args[0]) return message.channel.send('Utilisation : `_sondage <question>`');

const embed = new Discord.RichEmbed()
    .setColor("#dc134c")
    .setDescription(args.join(' '))
    .setFooter('Hanko • fait par Azuki et Salmar')
    .setTimestamp();
    
let msg = await message.channel.send(embed)
    .then(function (msg) {
        msg.react("👎");
        msg.react("👍");
        message.delete({timeout: 1000});
        }).catch(function(error) {
        console.log(error);
    });
}
    
    if (command === '_clear') {
        if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
            message.channel.sendMessage("Tu n'as pas permission de faire \""+message.content+"\" ! :angry:");
            console.log("Tu n'as pas permission de faire ça ! :angry: \""+message.content+"\"");
            return};    
    let count = args[0]
    message.channel.bulkDelete(parseInt(count) + 1)
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer.")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide.")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")}

    if(command === "_say") {
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            message.channel.send(sayMessage);
          }

    if (message.content === '_invite') {
            message.reply('**Hey ! voici le lien du serveur __[Naruto RP]__** : \n https://discord.gg/pMmpJyh \n **Merci à toi si tu le rejoins ! ^^**');
          }
    if (message.content === '_invitebot') {
            message.reply('**Hey ! voici le lien pour inviter Hanko sur ton serveur !** : \n https://discordapp.com/oauth2/authorize?client_id=603334827516755983&scope=bot&permissions=8232 \n **Merci à toi d\'utiliser Hanko !**');
          }
    if (message.content === 'C\'est un bon bot ça.') {
            message.reply('Oui, merci ^^ en même temps, j\'ai été codé par Azuki')
          }
    if (message.content === '_ghost') {
            message.reply('Oh SHIT ! A GHOOoooSt https://youtu.be/qIgoJhqE0j8');
        }
    });
 
bot.on(`message`, async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm')return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (command === `${prefix}mute`) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Mentionner un utilisateur.")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
     }
     const ms = require("ms");

     if (command === `${prefix}tempmute`) {

     let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send("**Mentionner un utilisateur :eyes:**");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Je ne peut pas mute cet utilisateur :(**");
  let muterole = message.guild.roles.find(muterole => muterole.name === "muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "dc134c",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("**Veuillez entrer une durée.**");

  await(tomute.addRole(muterole.id));
  message.channel.send(`**<@${tomute.id}> a été mute pendant ${ms(ms(mutetime))}**`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`**<@${tomute.id}> a été unmute**`);
  },ms(mutetime))
  message.delete();

     }

     if (command === `${prefix}warn`) {
        var missingPermissionsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor('#dc134c')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Tu n\'as aucunes permissions !')
        .setDescription('Tu as besoin `WARN_MEMBERS` permissions pour utiliser cette commande.')
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
    var missingArgsEmbed = new Discord.RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor('#dc134c')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Mentionner un membre et insérer une raison !')
        .setDescription('Exemple : _warn [@User] [Reason]')
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
    if(!message.member.hasPermission('WARN_MEMBERS')) return message.channel.send(missingPermissionsEmbed); 
    let mentioned = message.mentions.users.first(); 
    if(!mentioned) return message.channel.send(missingArgsEmbed); 
    let reason = args.slice(1).join(' ')
    if(!reason) return message.channel.send(missingArgsEmbed); 

    var warningEmbed = new Discord.RichEmbed()
        .setColor('#dc134c')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Tu as été warn sur ${message.guild.name}`)
        .addField('Warn par', message.author.tag)
        .addField('Raison', reason)
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
    mentioned.send(warningEmbed); 
    var warnSuccessfulEmbed = new Discord.RichEmbed()
        .setColor('#dc134c')
        .setTitle('Utilisateur warn avec succès ! :sunglasses:')
        .setFooter('Hanko • fait par Azuki et Salmar')
        .setTimestamp();
    message.channel.send(warnSuccessfulEmbed);
    message.delete();
} 

if (command === `${prefix}ban`) {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
  let member = message.mentions.members.first()
  if (!member) return message.channel.send("Veuillez mentionner un utilisateur à ban :x:")
  if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
  if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglasses: ")
  message.guild.ban(member, {days: 7})
  message.channel.send('**' + member.user.username + '** a reçu le banhammer de plein fouet. :eyes:')
  message.delete().catch(O_o=>{});
}});
bot.login(config.token);
