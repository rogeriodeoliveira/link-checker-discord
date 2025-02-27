require("dotenv/config");
const Discord = require("discord.js");
const scanUrl = require("./modulos/scanUrl.js");
const client = new Discord.Client();
/* const config = require("./config.json"); */

const TOKEN_DISCORD = process.env.TOKEN_DISCORD; /* || config.token_discord; */

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {

  if (msg.author.bot) return;


  if (msg.content.includes("https://") || msg.content.includes("http://")) {
    // do not check an author's links
    // change the id value
    //if (msg.author.id == "000000000000000") return;
    msg.channel.send("🔗 Link detectado!\n🔍 Analisando link...!");
    let link = msg.content.substr(msg.content.lastIndexOf("http"));
    try {
      scanUrl(link).then(result => {
        if (result.modal == "results_modal_safe") {
          msg.channel.send("✅O link parece estar limpo de ameaças");
        } else if (result.modal == "results_modal_malicious") {
          msg.channel.send("⚠ O Link foi identificado como sendo Suspeito!⚠");
          msg
            .delete()
            .then(
              msg.channel.send(
                "🛡O link foi apagado por questões de segurança!"
              )
            );
          msg.reply(
            "🚫 É proibido enviar links maliciosos e você está sujeito a punições! ⚰"
          );
        } else if (result.modal == "results_modal_fail") {
          msg.channel.send(
            "Falha ao analisar o link❗\nSempre tenha cuidado ao acessar links ☠"
          );
        } else {
          msg.channel.send(
            "O Link não pode ser analisado❗\nSempre tenha cuidado ao acessar links ☠"
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

});

client.login(TOKEN_DISCORD);