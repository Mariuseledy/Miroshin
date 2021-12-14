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
      return `OFF 🔴`
    }else if(config.Settings.Maintenance.Status === 'ON'){
      return `ON 🟢`
    }else {
      return `ERROR 🟡`
    }
  }

  function SlashCommandsCheck(){
    if(config.Settings.SlashCommands.Status === 'GLOBAL'){
      return `Global 🌍`
    }else if(config.Settings.SlashCommands.Status === 'GUILD'){
      return `Guild 📦`
    }else {
      return `ERROR ❌`
    }
  }
  
  console.log(
  `\n▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n` + 
  `▎        ${client.user.username} is ready\n` +
  `▎\n` +
  `▎▶ Servers: ${client.guilds.cache.size}\n` +
  `▎▶ Users: ${client.users.cache.size}\n` +
  `▎▶ Maintenance: ${MaintenanceCheck()}\n` +
  `▎▶ Status: Type: ${config.Configuration.start.Status.type}\n` +
  `▎          Text: ${config.Configuration.start.Status.StatusText}\n` +
  `▎▶ Slash commands: ${SlashCommandsCheck()}\n` + 
  `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔`);
});