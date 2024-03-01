const { Router } = require("@grammyjs/router");
const { bolim, YesNo } = require("../helpers/help.button");

const router = new Router((ctx) => ctx.session.step);

// Route for receiving the employee's name
const ismRoute = router.route("Ism");
ismRoute.hears("Raqamli texnologiyalar markaziga murojaat", async (ctx) => {
    await ctx.reply(`<b>Ism, familiyangizni kiriting?</b>`, { parse_mode: "HTML" });
    ctx.session.step = "ShY"; // Move to the next step
});

// Route for receiving the department name
const shyRoute = router.route("ShY");
shyRoute.on("message:text", async (ctx) => {
    await ctx.reply(`👨‍🏫 Bo‘lim nomi: 

    Masalan: Raqamli talim texnologiya bo‘limi`);
    ctx.session.fullname = ctx.message.text; // Store the employee's name
    ctx.session.step = "ShT"; // Move to the next step
});

// Route for receiving the department issues
const shtRoute = router.route("ShT");
shtRoute.on("message:text", async (ctx) => {
    await ctx.reply(`💻 Bo‘limingizdagi muammolarni to‘lliq bayon qiling: 
    
Masalan: Printerim ishlamayapti, yangi printer oldim o'rnatish kerak, Kompyuterim o'zidan o'zi o'chib yonayapti, Internetim ishlamay qoldi`);
    ctx.session.yosh = ctx.message.text; // Store the department issues
    ctx.session.step = "ShA"; // Move to the next step
});

// Route for receiving the contact information
const shaRoute = router.route("ShA");
shaRoute.on("message:text", async (ctx) => {
    await ctx.reply(`📞 Aloqa: 

    Bog'lanish uchun raqamingizni kiriting? 
    
    Masalan, +998 90 378 67 73`);
    ctx.session.texnologiya = ctx.message.text; // Store the contact information
    ctx.session.step = "ShH"; // Move to the next step
});

// Route for receiving the room number
const shhRoute = router.route("ShH");
shhRoute.on("message:text", async (ctx) => {
    await ctx.reply(`🔑 Xona raqami: 
    
    Masalan: B-104
    `);
    ctx.session.aloqa = ctx.message.text; // Store the room number
    ctx.session.step = "ShF"; // Move to the next step
});

// Route for confirming the information and sending it to the channel
const shfRoute = router.route("ShF");
shfRoute.on("message:text", async (ctx) => {
    ctx.session.hudud = ctx.message.text; // Store the room number
    await ctx.reply(`Xodim:
    👨‍🏫 Xodim: ${ctx.session.fullname}
    🏢 Bo‘lim nomi: ${ctx.session.yosh}
    💻 Bo‘limdagi muammoni bayon qiling: ${ctx.session.texnologiya} 
    🇺🇿 Telegram: @${ctx.from.username} 
    📞 Aloqa: ${ctx.session.aloqa}
    🔑 Xona raqami: ${ctx.session.hudud} 

    `);
    
    // Ask for confirmation
    await ctx.reply(`Barcha ma'lumotlar to'g'rimi?`, { reply_markup: { ...YesNo } });
    ctx.session.step = "shj"; // Move to the next step
});

// Route for handling confirmation
const shjRoute = router.route("shj");
shjRoute.hears(`Yoq`, async (ctx) => {
    await ctx.reply(`Qabul qilinmadi`, { reply_markup: { ...bolim } });
    ctx.session.step = ""; // Reset the step
});

shjRoute.hears("Ha", async (ctx) => {
    await ctx.reply(`📪 #Murojaatingiz uchun raxmat siz bilan tez orada bog'lanishadi`, { reply_markup: { ...bolim } });

    // Send the information to the Telegram channel
    const channelMessage = `👨‍🏫 Xodim: ${ctx.session.fullname}\n🏢 Bo‘lim nomi: ${ctx.session.yosh}\n💻 Bo‘limingizdagi muammolarni to‘lliq bayon qiling: ${ctx.session.texnologiya}\n📞 Aloqa: ${ctx.session.aloqa}\n🔑 Xona raqami: ${ctx.session.hudud}\n🇺🇿 Telegram: @${ctx.from.username}`;

    // Replace "CHANNEL_ID" with the actual ID of your Telegram channel
    await ctx.api.sendMessage("-1002091755827", channelMessage); // Send the message to the channel

    ctx.session.step = ""; // Reset the step
});

module.exports = router;
