import bot from './../lib/bot';

const { MY_TELEGRAM_ID } = process.env;

// 1시간에 한 번씩
let botAlert;
let hour = 0;

const startWork = (msg) => {
  const chatId: number = msg.chat.id;

  if (chatId.toString() !== MY_TELEGRAM_ID) {
    return;
  }

  botAlert = setInterval(() => {
    hour += 1;
    bot.sendMessage(MY_TELEGRAM_ID, `${hour}시간째 일하고 계시네요!`);
  }, 3600000);

  bot.sendMessage(chatId, '일을 시작합니다');
};

const endWork = (msg) => {
  const chatId: number = msg.chat.id;

  if (chatId.toString() !== MY_TELEGRAM_ID) return;

  clearInterval(botAlert);

  bot.sendMessage(chatId, `총 ${hour}시간 일했습니다!`);
};

export { startWork, endWork };
