require('dotenv').config();
process.env.TELEGRAM_BOT_TOKEN = "708176528:AAGXLXT1YQY2h8nYGmCzJspjmDxuPgXcfHc";

import { describe, it } from 'mocha';
import { expect, assert } from 'chai';

import * as TelegramBotApi from 'node-telegram-bot-api';
import TelegramBot from '../../lib/telegramBot';

describe('telegramBot', () => {
  it ('isTrue', () => {
    expect(1).to.be.equal(1);
  });
  // it ('isReturningTelegramInstance', () => {
  //   expect(typeof TelegramBot).to.be.not.equal(TelegramBotApi);
  //   // expect(1).to.be.equal(1);
  // });
});