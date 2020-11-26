const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');
client.commands = new Discord.Collection();

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandsFile){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.once('ready', ()=>{
    console.log('Bot rodando!');
    console.log('Oi tk-kun');
    console.log('Não conte pro gordo, mas eu hackiei a camera dele e fico vendo ele dormindo hihihi');
});

client.on('message', async message=>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
    
        if(!client.commands.has(command)) return;
    
        try {
            client.commands.get(command).execute(message, args);            
        } catch (error) {
            console.error(error);
            message.reply('Ops, ocorreu algum erro, malz ae.');
        }
});


client.login(token)
