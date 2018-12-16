import * as TelegramBotApi from 'node-telegram-bot-api';
const { TELEGRAM_BOT_TOKEN } = process.env;

let telegramBotInstance: TelegramBotApi;

const TelegramBot: TelegramBotApi = ((): TelegramBotApi => {
  if (!telegramBotInstance) {
    telegramBotInstance = new TelegramBotApi(TELEGRAM_BOT_TOKEN, { polling: true });
  }

  return telegramBotInstance;
})();

export default TelegramBot;
