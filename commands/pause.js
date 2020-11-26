module.exports ={
    name: "pause",
    description: "pause musics",
    async execute(message){
        if(message.member.voice.channel){
            const connection = await message.member.voice.channel.join();
            connection.dispatcher.pause();
        }
    }
}