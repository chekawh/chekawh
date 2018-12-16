const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

let prefix = config.prefix;

client.on("ready", () => {
   console.log("Conectado!");
   client.user.setPresence({
       status: "Online",
       game: {
           name: ".ayuda | ChekaWH BOT",
           type: "LISTENING"
       }
   });
});

client.on("message", (message) => {

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //Guias de Comandos creados con sus funciones

  //Ver cuantas personas tiene ese mismo rol
if (message.content.startsWith(prefix + "rol")){
if(!args) return message.channel.send('Escriba el nombre de un rol creado en el servidor.');
let textoRol = args.join(" ");

let rol = message.guild.roles.find("name", textoRol);
if(!rol) {
    message.channel.send('El rol no se ha encontrado en el servidor.');

} else{
    let rolesmiembros = message.guild.roles.get(rol.id).members;
    message.channel.send(`Tienes a **${rolesmiembros.size}** miembro(s)
                            con el rol **${textoRol}**.`);

};
}

//Comando Hablar a través del bot
if (message.content.startsWith(prefix + "hablo")){
if(command === 'hablo'){
  let texto = args.join(" ");
  if(!texto) return message.channel.send(`Parámetro del comando -> .hablo [mensaje]`);
  message.delete();

  message.channel.send(texto);
}
}

//Comando expulsar miembros
if (message.content.startsWith(prefix + "expulsar")){
if (command === 'expulsar'){
  if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Tu no tienes permisos de administrador para ejecutar este comando.');
let usuario = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if(!usuario) return message.reply('No ha elegido a ningún miembro, para expulsarlo.');
if(!razon) return message.channel.send('Escriba una razón de la expulsión.');

message.guild.member(usuario).kick(razon);
message.channel.send(`**${usuario.username}**, fue expulsado del servidor. Su razón: ${razon}.`);

}
}

//Comando bannear miembro
if (message.content.startsWith(prefix + "banear")){
if (command === 'banear'){
  if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('Tu no tienes permisos de administrador para ejecutar este comando.');
let usuario = message.mentions.users.first();
let razon = args.slice(1).join(' ');

if(!usuario) return message.reply('No has elegido a ningún usuario para banear.');
if(!razon) return message.channel.send('Escriba una razón de para el uso de baneo.');

message.guild.member(usuario).ban(razon);
message.channel.send(`**${usuario.username}**, fue baneado del servidor. Su razón: ${razon}.`);
}
}

//Datos de un servidor
if (message.content.startsWith(prefix + "servidor")){
if (command === 'servidor'){
  var server = message.guild;

  const embed = new Discord.RichEmbed()
      .setThumbnail(server.iconURL)
      .setAuthor(server.name, server.iconURL)
      .addField('ID', server.id, true)
      .addField('Region', server.region, true)
      .addField('Creado el', server.joinedAt.toDateString(), true)
      .addField('Dueño del Servidor', server.owner.user.tag +'('+server.owner.user.id +')', true)
      .addField('Miembros', server.memberCount, true)
      .addField('Roles', server.roles.size, true)
      .setColor(0x66b3ff)

  message.channel.send({ embed });


}
}

//Eliminar mensajes en Servidor
if (message.content.startsWith(prefix + "limpiar")){
if (command === 'limpiar'){
let cantidad = parseInt(args[0]);
if(!cantidad) return message.reply('No has elegido ninguna cantidad de mensajes a eliminar.');
message.channel.bulkDelete(cantidad);
message.channel.send(`Se ha eliminado: ${cantidad} mensajes. Ahora se está más cómodo :D`);
}
}

//Muestra la ayuda de todos los comandos.
  if (message.content.startsWith(prefix + "ayuda")){
    const embed = new Discord.RichEmbed()
    .setTitle("Ayuda ChekaWH BOT")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription("A continuación aparecerán las opciones que puedes elegir en este BOT.")
    .setFooter("Gracias por usar al ChekaWH BOT", client.user.avatarURL)
    .setImage(message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setURL("https://github.com/CraterMaik")
    .addField("Hablar a través del Bot", ".hablo [mensaje]")
    .addField("Expulsar miembros(ADMIN)", ".expulsar [usuario] [razon]")
    .addField("Bannear miembros (ADMIN)", ".banear [usuario] [razon]")
    .addField("Limpiar mensajes", ".limpiar [cantidad]")
    .addField("Personas con el mismo rol", ".rol [nombredelrol]")
    .addField("Info del Servidor", ".servidor");

message.channel.send({embed});
  }

});

client.login(config.token);
