require('dotenv').config();

import TelegramBot from './lib/telegramBot';
import * as work from './controller/workCtrl';

TelegramBot.onText(/\/work\/start$/, work.startWork);
TelegramBot.onText(/\/work\/start (.+)/, work.startWorkByHour);
TelegramBot.onText(/\/work\/end$/, work.endWork);
TelegramBot.onText(/\/work\/stop/, work.stopWork);
TelegramBot.onText(/\/work\/restart/, work.restartWork);
