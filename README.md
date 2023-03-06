# Ostfalia-Mensa-Bot
sends the current menu of the [ostfalia](https://www.ostfalia.de)-cantine to a telegram chat

## Development
```bash
# install dependencies
npm install
# run
npm run dev
```

## Configuration Variables

| Name           | Description                                                  | Required |
| -------------- | ------------------------------------------------------------ | -------- |
| SEND_CRON      | Describes when to automatically send the menu into the telegram chat.<br />Formatted as [cron schedule expression](https://crontab.guru/). | x        |
| TELEGRAM_TOKEN | Token of the telegram bot that was created for running an instance of this project. ([telegram documentation](https://core.telegram.org/bots/features#creating-a-new-bot)) | x        |
| TELEGRAM_CHAT  | ID of the telegram chat that the menu should automatically sent to.<br />Can be obtained with the [telegram `/chatid` command](#commands). | x        |

## Usage via Telegram

### Commands

- `/menu`: bot replies with the current menu
- `/chatid`: bot replies with the chatid this command was sent in