import { cleanEnv, makeValidator, num, str } from 'envalid';

require('dotenv').config();

const numArrayValidator = makeValidator<number[]>((input: string) => input.split(',').map(e => parseInt(e)).filter(e => !isNaN(e)));

export type BotConfig = {
  SEND_CRON: string;
}

export type TelegramConfig = {
  TELEGRAM_TOKEN: string;
  TELEGRAM_CHAT: string;
}  

export type Config = BotConfig & TelegramConfig;

export const config = cleanEnv(process.env, {
  SEND_CRON: str(),
  TELEGRAM_TOKEN: str(),
  TELEGRAM_CHAT: str(),
}) as Config;
