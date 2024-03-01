const { Keyboard } = require("grammy");

const bolim = new Keyboard().resized().row()
.text("Raqamli texnologiyalar markaziga murojaat").resized();
const YesNo = new Keyboard().text("Ha").resized().text(`Yoq`).resized();

module.exports = { bolim, YesNo };