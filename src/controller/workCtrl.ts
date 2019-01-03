import * as moment from 'moment';
import TelegramBot from '../lib/telegramBot';
import { workApi } from '../lib/api';

const { MY_TELEGRAM_ID } = process.env;
const ONE_HOUR: number = 3600000;

let botSender: NodeJS.Timeout;
let reservationBotSender: NodeJS.Timeout;
let historyHour: number = 0;

enum WorkType {
  START = "START",
  RESTART = "RESTART",
  ING = "ING",
  END = "END",
  STOP = "STOP"
}

const startBotSender = () => {
  botSender = setInterval(() => {
    historyHour += 1;
    workApi.sendWorkHistoryTime(WorkType.ING);
    TelegramBot.sendMessage(MY_TELEGRAM_ID, `${historyHour}시간째 일하고 계시네요!`);
  }, ONE_HOUR);
};

const endBotSender = () => {
  clearInterval(botSender);
  clearTimeout(reservationBotSender);

  workApi.sendWorkHistoryTime(WorkType.END);
  TelegramBot.sendMessage(MY_TELEGRAM_ID, `총 ${historyHour}시간 일했습니다!`);

  historyHour = 0;
};

const startWork = (msg): void => {
  const chatId = (msg.chat.id).toString();

  if (chatId !== MY_TELEGRAM_ID) {
    return;
  }

  startBotSender();

  workApi.sendWorkHistoryTime(WorkType.START);
  TelegramBot.sendMessage(chatId, '영훈님의 일을 시작합니다');
};

const endWork = (msg): void => {
  const chatId = (msg.chat.id).toString();

  if (chatId !== MY_TELEGRAM_ID) {
    return;
  }

  endBotSender();
};

const startWorkByHour = (msg, match) => {
  const chatId = (msg.chat.id).toString();

  if (chatId !== MY_TELEGRAM_ID) {
    return;
  }

  const workStartHour = match[1];

  const nowTime: number = moment().valueOf();
  const workStartTime: number = moment().set({ h: workStartHour, m: 0, s: 0}).valueOf();

  const startMillisecond: number = workStartTime - nowTime;

  if (startMillisecond < 0) {
    TelegramBot.sendMessage(MY_TELEGRAM_ID, '지금은 일하지마세요!');
    return;
  }

  reservationBotSender = setTimeout(() => {
    workApi.sendWorkHistoryTime(WorkType.START);
    TelegramBot.sendMessage(MY_TELEGRAM_ID, `업무를 시작합니다`);
    startBotSender();
  }, startMillisecond);

  const startTime = moment(workStartTime).format('YYYY-MM-DD HH:mm:ss');
  TelegramBot.sendMessage(msg.chat.id, `${startTime} 시간에 업무를 시작합니다`);
}

const stopWork = (msg): void => {
  const chatId = (msg.chat.id).toString();

  if (chatId !== MY_TELEGRAM_ID) {
    return;
  }

  clearInterval(botSender);
  clearTimeout(reservationBotSender);

  workApi.sendWorkHistoryTime(WorkType.STOP);
  TelegramBot.sendMessage(MY_TELEGRAM_ID, `잠깐 쉴려고 하시는군요! 지금까지 총 ${historyHour}시간 일했습니다!`);
};

const restartWork = (msg): void => {
  const chatId = (msg.chat.id).toString();

  if (chatId !== MY_TELEGRAM_ID) {
    return;
  }

  const currentHour = moment().set({ m: 0, s: 0 });
  const currentHourMinute = moment();

  // 현재 시간 + 분이 현재 시간보다 크다면 1시간 더해준다.
  if (currentHourMinute.isAfter(currentHour)) {
    currentHour.add('1', 'h');
  }

  const startMillisecond: number = currentHour.valueOf() - currentHourMinute.valueOf();

  reservationBotSender = setTimeout(() => {
    workApi.sendWorkHistoryTime(WorkType.RESTART);
    startBotSender();
  }, startMillisecond);

  TelegramBot.sendMessage(
    MY_TELEGRAM_ID,
    `${moment(currentHour).format('YYYY-MM-DD HH:mm:ss')} 시간에 일을 다시 시작합니다!`
  );
};

export {
  startWork,
  startWorkByHour,
  endWork,
  stopWork,
  restartWork
};
