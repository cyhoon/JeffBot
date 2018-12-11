require('dotenv').config();

import bot from './lib/bot';
import * as work from './controller/work';

bot.onText(/\/work\/start/, work.startWork);
bot.onText(/\/work\/end/, work.endWork);
