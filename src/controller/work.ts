import * as moment from 'moment';

import bot from './../lib/bot';

const { MY_TELEGRAM_ID } = process.env;

// 1시간에 한 번씩
let botAlert;
let reservationBotAlert;
let hour = 0;

const startBotAlert = (startMillisecond) => {
  botAlert = setInterval(() => {
    hour += 1;
    bot.sendMessage(MY_TELEGRAM_ID, `${hour}시간째 일하고 계시네요!`);
  }, startMillisecond);
};

const endBotAlert = () => {
  clearInterval(botAlert);
  clearInterval(reservationBotAlert);
  bot.sendMessage(MY_TELEGRAM_ID, `총 ${hour}시간 일했습니다!`);
  hour = 0;
}

const startWork = (msg) => {
  const chatId: number = msg.chat.id;

  if (chatId.toString() !== MY_TELEGRAM_ID) {
    return;
  }

  startBotAlert(3600000);

  bot.sendMessage(chatId, '일을 시작합니다');
};

const endWork = (msg) => {
  const chatId: number = msg.chat.id;

  if (chatId.toString() !== MY_TELEGRAM_ID) return;

  endBotAlert();
};

const startWorkByHour = (msg, match) => {
  const workStartHour = match[1];

  const nowTime: number = moment().valueOf();
  const workStartTime: number = moment().set({ h: workStartHour, m: 0, s: 0}).valueOf();

  const startMillisecond: number = workStartTime - nowTime;

  if (startMillisecond < 0) {
    bot.sendMessage(MY_TELEGRAM_ID, '지금은 일하지마세요!');
    return;
  }

  reservationBotAlert = setTimeout(() => {
    bot.sendMessage(MY_TELEGRAM_ID, `업무를 시작합니다`);
    startBotAlert(3600000);
  }, startMillisecond);

  const startTime = moment(workStartTime).format('YYYY-MM-DD HH:00:00');

  bot.sendMessage(msg.chat.id, `${startTime} 시간에 업무를 시작합니다`);
};

export { startWork, endWork, startWorkByHour };
