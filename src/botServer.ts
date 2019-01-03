import TelegramBot from './lib/telegramBot';
import * as work from './controller/workCtrl';

class botServer {

  private configTelegramBot = async () => {
    try {
      console.info('Try config telegram bot');

      TelegramBot.onText(/\/work\/start$/, work.startWork);
      TelegramBot.onText(/\/work\/start (.+)/, work.startWorkByHour);
      TelegramBot.onText(/\/work\/end$/, work.endWork);
      TelegramBot.onText(/\/work\/stop/, work.stopWork);
      TelegramBot.onText(/\/work\/restart/, work.restartWork);

      console.info('Success config telegram bot');
    } catch (error) {
      console.error('Fail config telegram bot');
      console.error(`Error Message: ${error.message}`);
    }
  }

  start = async () => {
    await this.configTelegramBot();
  }
};

export default botServer;
