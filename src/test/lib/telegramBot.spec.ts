require('dotenv').config();

import { describe, it } from 'mocha';
import { expect, assert } from 'chai';

import * as TelegramBotApi from 'node-telegram-bot-api';
import TelegramBot from '../../lib/telegramBot';
const { TELEGRAM_BOT_TOKEN } = process.env;

describe('telegramBot', () => {
  it ('isReturningTelegramInstance', () => {
    expect(typeof TelegramBot).to.be.not.equal(TelegramBotApi);
  });
});