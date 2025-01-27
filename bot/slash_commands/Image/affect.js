const { MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "affect",
 description: "🍷 No, it doesn't affect my baby",
 usage: "/affect <user>",
 category: "Image",
 options: [
  {
   name: "user",
   description: "User whose avatar will be used",
   required: false,
   type: 6,
  },
 ],
 run: async (client, interaction, args) => {
  const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
  const wait = new MessageEmbed() // Prettier
   .setColor("#5865f2")
   .setDescription(`${client.bot_emojis.loading} | Please wait... I'm generating your image`);
  interaction.followUp({ embeds: [wait] }).then((msg) => {
   (async () => {
    const affect = await canvacord.Canvas.affect(
     member.user.displayAvatarURL({
      dynamic: false,
      format: "png",
      size: 2048,
     })
    );
    const attachment = new MessageAttachment(affect, "affect.png");
    msg.edit({ embeds: [], files: [attachment] });
   })();
  });
  try {
  } catch (err) {
   console.log(err);
   return client.createSlashCommandError(interaction, err);
  }
 },
};
