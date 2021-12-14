const client = require('../index');

client.on('messageDelete', async (message) => {
    // Used for the snipe command
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
});