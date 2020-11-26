const {prefix} = require('../config.json');

module.exports={
    name: 'help',
    description: 'Listar todos os comandos suportados pelo BOT',
    aliases: ['commands'],
    usage: '[command name]',
    execute(message, args){
        const data = [];
        const {commands} = message.client;

        if(!args.length){
            data.push('Aqui está todos os comandos suportados');
            data.push(commands.map(command=>command.name).join(', '));
            message.reply('O comando !play possui dois argumentos');
            message.reply('!play nome_da_musica');

            return message.author.send(data, {split: true}).then(()=>{
                if(message.channel.type === 'dm') return;
                message.reply('Pronto! Lhe mandei todos os comandos que possuo!');
            }).catch(err=>{
                console.log(err)
                message.reply('Parece que não posso mandar os comandos para você, por acaso você desabilitou DM\'s?');
            })
        }

        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Malz, mas eu não entendo esse comando :/ !');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(',\n')}`);
		if (command.description) data.push(`**Descrição:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
}
