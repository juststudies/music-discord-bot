const fs = require('fs');

const userDesktopFolder = require('path').join(require('os').homedir(), 'Desktop');
module.exports ={
    name: "play",
    description: "Play musics",
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
            message.reply('Você não está no canal de voz... Por favor considere entrar e depois use o comando');
        }else{
            voiceChannel.join()
            .then(connection =>{
                const play = () =>{
                    connection.play(fs.createReadStream(`${userDesktopFolder}/music/${args}.mp3`), {volume: 0.5})
                    .on('finish', play);
                }
                play();
            }).catch(err=> console.log('Tatarimokke morreu: ',err));           
        }
    }
}