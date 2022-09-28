import TelegramBot from 'node-telegram-bot-api';
import cron from 'cron';

import { config } from './config';
import { OstfaliaApi } from './ostfalia-api';

const api = new OstfaliaApi();
const bot = new TelegramBot(config.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/chatid/, (msg) => {
  bot.sendMessage(msg.chat.id, msg.chat.id.toString());
});

console.log(`bot started...`);

new cron.CronJob(config.SEND_CRON, () => api
  .getTodaysMenu()
  .then(menu => bot.sendMessage(config.TELEGRAM_CHAT, menu, { parse_mode: 'HTML' })),
)
  .start();
