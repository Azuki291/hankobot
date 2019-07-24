const config = require('./config.json');
const Commando = require('discord.js-commando');
const bot = new Commando.Client();
var Discord = require('discord.js');

 
bot.on('ready', () => {
    bot.user.setGame("Command: */help*")
    console.log(`Hanko est en ligne !`);
    bot.user.setActivity("/Help", {type: "WATCHING"});
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
         //roll
        if (command === `/roll`) {
            if(message.content.startsWith(prefix + 'roll')) {
                let args = message.content.split(' ').slice(1); 
                let nb = Math.floor(Math.random() * args[0]);
                if(!args[0]) return message.reply("Veuillez mettre un nombre.");
                message.reply(`**Tu as roll le nombre : ${nb}.**`);
            console.log('Roll')
            }
        }

    if (command === `/help`) {
        let embed = new Discord.RichEmbed()
            .setTitle('Liste des commandes :')
            .setDescription('**Général :earth_africa:** \n - /help \n - /infobot \n - /prefix \n - /serverinfo \n - /invite \n - /invitebot \n **Modérations :crossed_swords:** \n - /ban \n - /kick \n - /mute \n - /clear \n **RP :game_die:** \n - /roll \n **Fun :tada:** \n - /say \n - /azuki \n - /salmar')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
     return message.channel.send(embed);
    }

    if(command === '<@603334827516755983>') {
        message.channel.send("Le préfix de mes commandes est `/` ")
    }

    if (command === `/infobot`) {
        let embed = new Discord.RichEmbed()
            .setTitle('Infos concernant le bot :')
            .setDescription('Création du bot le 23/07/2019 à 23:06:24 par __**Azuki**__.')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
     return message.channel.send(embed);
    }

    if (command === `/serverinfo`) {
        let servIcon = message.guild.iconURL;
        let servEmbed = new Discord.RichEmbed()
        let embed = new Discord.RichEmbed()
        .setTitle('[Naruto RP]')
        .setURL(' https://discord.gg/pMmpJyh ')
        .setDescription('Informations sur le Serveur.')
        .setColor('#dc134c')
        .setThumbnail(servIcon)
        .addField('Nom du serveur', message.guild.name)
        .addField('Créateur', 'Azuki#3880')
        .addField('Date de création du serveur', '30/10/18 14:18:20')
        .addField(':book: Présentation', ' C\'est un serveur dans l\'univers de Naruto. On se retrouvera après la série de Naruto et de Boruto qui seront encore connus aujourd\'hui. Les personnages auront tous existés et vous pourrez incarner un hôte, un membre d\'un clan, une personne banale, tout comme le meilleur, voir le meilleur du serveur! Vous pourrez faire renaître l\'akatsuki en les rejoignant pour atteindre vos objectifs voir....pour les espionner? Voir devenir un traître d\'un village? Parlons maintenant des 5 villages connus aujourd\'hui qui sont Suna, Kiri, Konoha, Kumo, Janguru. Chaque village vous accueillera les bras ouverts! Devenez une légende dès aujourd\'hui en prouvant votre détermination et votre force! Je vous laisse découvrir la suite en venant sur notre magnifique serveur. Bonne journée à vous et bonne chance jeûne ninja! ^^')
        .addField(':bar_chart: Statistiques (Membre)', message.guild.memberCount) 
        .addField(':bar_chart: Statistiques (Bots)', '8 Bots') 
        .addField(':pencil: Salons', '189 Channels' )
        .addField(':black_joker: Rôles', '179 Rôles')
        .setFooter('Hanko • fait par Azuki et Salmar')
     return message.channel.send(embed);
    }

    if (command === `/prefix`) {
        let embed = new Discord.RichEmbed()
            .setTitle('Mon préfix est : `/`')
            .setDescription('')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
     return message.channel.send(embed);
    }

    if (command === `/azuki`) {
        let embed = new Discord.RichEmbed()
            .setTitle('Infos concernant __Azuki__ :')
            .setDescription('Azuki ? l\'admin sympathique et cool (qui taff tout le temps), celui qui rigole et qui prend jamais la grosse tête, le tueur de démons. En plus, la légende raconte que Saitama et Naruto sont ses disciples  \n \n **RP :** \n Azuki est né a Konoha et a vécu une enfance difficile suite au démon Kyubi qui étais sceller en lui, tout le monde le repoussait et l\'insultais de monstre. Après plusieurs dérapage avec Kyubi a l\'âge de 15 ans Azuki arrivait a canaliser le pouvoir de son Kyubi. Dans sa famille , il adorait son père qui étais Naruto, qui la toujours aider. Avec sa mère qui est Hinata, il restait mignon. Il lui arrivait souvent des imprévus mais grâce au conseil de sa mère ninja il sut contrôler le stress, il méditait souvent dans de l\'eau froide et pensait a sa vie, son futur et son avenir.')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
     return message.channel.send(embed);
    }

     if (command === `/salmar`) {
        let embed = new Discord.RichEmbed()
            .setTitle('Infos concernant __Salmar__ :')
            .setDescription(' \n \n Salmar est né à Konoha, descendant de la famille des Uchiha, il eu un gène de naissance faisant que son Sharingan gauche est plus puissant que son droit qui lui est normal, il n’a jamais eu de réel contact avec sa famille, aillant décidé de vivre seul très jeune pour des conflits familiaux. Durant son enfance il n’en pas beaucoup d’amis partis les Uchiha et même en général, il s’en fit un qui devenu son meilleur amis puisqu’ils se ressemblaient beaucoup, ce qui le rapproche le plus des Uchiha est ses Sharingan, il se forgea seul, s’entraînant sans l’aide de personne, il passa l’examen de Gennin, qui eu facilement et avec sans trop de difficulté pour celui de Chuunin, son meilleur amis ayant échoué, sombra dans la folie et quitta le village. 2 mois après l’examen alors que Salmar se baladais tranquillement de nuit proche des portes du village, 2 membre de l’akatsuki l’attaquèrent en s’en prenant à son œil gauche avec des kunaï afin de le récupérer étant plus puissant, Salmar grâce à ses techniques apprises durant son entraînement, comme le Chidori, réussi à les repousser et les éliminer sans en avoir trop le choix, il garda quand même un souvenir visible de cette nuit avec une cicatrice qui longe son œil gauche, c’est après les avoir tuer que Salmar se rendit compte que l’un des 2 était enfaite son meilleur amis, c’est ce jour ci qu’il ce promis de toujours protéger ceux en qui il tiens quitte à en laisser la vie. Aujourd’hui il est Juunin et veux devenir plus fort pour se faire un nom de par lui seul et non pas grâce à sa famille, il est déterminé à atteindre son but, tout en suivant ce qui lui semble juste à ses yeux.')
            .setColor('#dc134c')
            .setFooter('Hanko • fait par Azuki et Salmar')
     return message.channel.send(embed);
    }
    //clear
    
    if (command === '/clear') {
        if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
            message.channel.sendMessage("Tu n'as pas permission de faire ça ! :angry: \""+message.content+"\"");
            console.log("Tu n'as pas permission de faire ça ! :angry: \""+message.content+"\"");
            return};    
    let count = args[0]
    message.channel.bulkDelete(parseInt(count) + 1)
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer.")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide.")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")}
        
        if(command === "/say") {
            const sayMessage = args.join(" ");
            message.delete().catch(O_o=>{}); 
            message.channel.send(sayMessage);
          }
          if (message.content === '/invite') {
            message.reply('**Hey ! voici le lien du serveur __[Naruto RP]__** : \n https://discord.gg/pMmpJyh \n **Merci à toi si tu le rejoins ! ^^**');
          }
          if (message.content === '/invitebot') {
            message.reply('**Hey ! voici le lien pour inviter Hanko sur ton serveur !** : \n https://discordapp.com/oauth2/authorize?client_id=603334827516755983&scope=bot&permissions=8232 \n **Merci à toi d\'utiliser Hanko !**');
          }
        });
 ;
 
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

if (command === `${prefix}ban`) {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
  let member = message.mentions.members.first()
  if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
  if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
  if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
  message.guild.ban(member, {days: 7})
  message.channel.send('**' + member.user.username + '** a reçu le banhammer de plein fouet. :eyes:')
}});
bot.login(config.token);
