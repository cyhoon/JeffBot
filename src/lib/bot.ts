import * as TelegramBot from 'node-telegram-bot-api';
const { TELEGRAM_BOT_TOKEN } = process.env;

let botInstance;

const bot: TelegramBot = (() => {
  if (!botInstance) {
    botInstance = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
  }

  return botInstance;
})();

export default bot;
