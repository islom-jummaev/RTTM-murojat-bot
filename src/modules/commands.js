const { Composer, Keyboard } = require("grammy");
const { bolim } = require("../helpers/help.button");
const bot = new Composer();

bot.command("start", async (ctx) => {
    await ctx.reply(`
<b>Assalom alaykum ${ctx.from.first_name}
Termiz muhandislik texnologiya instituti. 
Raqamli ta'lim texnologiya bo‘limi</b>

/help murojat botiga xush kelibsiz! `, {
        parse_mode: "HTML",
        reply_markup: {
            ...bolim
        }
    })
});
bot.command("help", async (ctx) => {
    await ctx.reply(`
`);
});

module.exports = bot;