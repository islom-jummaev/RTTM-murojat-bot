const { Bot, session } = require("grammy");
const config = require("../config");

const commandsModule = require("./modules/commands");
const shogirdModule = require("./modules/shogird");

const bot = new Bot(config.token);

bot.use(session({ initial: () => ({ step: "Ism" }) }));
bot.use(commandsModule);
bot.use(shogirdModule);

bot.start();