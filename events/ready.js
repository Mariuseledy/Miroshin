const client = require("../index");
const config = require('../Storage/config.json');

client.on("ready", async (message) => {
  // On-Ready console log and events
  client.user.setPresence({ 
    activities: [{
      name: config.Configuration.start.Status.StatusText, 
      type: config.Configuration.start.Status.type
    }] 
  });

  function MaintenanceCheck(){
    if(config.Settings.Maintenance.Status === 'OFF'){
      return `OFF š“`
    }else if(config.Settings.Maintenance.Status === 'ON'){
      return `ON š¢`
    }else {
      return `ERROR š”`
    }
  }

  function SlashCommandsCheck(){
    if(config.Settings.SlashCommands.Status === 'GLOBAL'){
      return `Global š`
    }else if(config.Settings.SlashCommands.Status === 'GUILD'){
      return `Guild š¦`
    }else {
      return `ERROR ā`
    }
  }
  
  console.log(
  `\nāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāā\n` + 
  `ā        ${client.user.username} is ready\n` +
  `ā\n` +
  `āā¶ Servers: ${client.guilds.cache.size}\n` +
  `āā¶ Users: ${client.users.cache.size}\n` +
  `āā¶ Maintenance: ${MaintenanceCheck()}\n` +
  `āā¶ Status: Type: ${config.Configuration.start.Status.type}\n` +
  `ā          Text: ${config.Configuration.start.Status.StatusText}\n` +
  `āā¶ Slash commands: ${SlashCommandsCheck()}\n` + 
  `āāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāāā` + `\nIf you found this handler useful please consider supporting me on ko-fi!\nLink: ${config.Configuration.other["ko-fi"]}`);
});