import { Telegraf } from 'telegraf';
import { initCommandSystem } from './command-system';

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!botToken ||!chatId) {
  console.warn("Telegram bot token or chat ID not configured. Commander is disabled.");
}

const bot = botToken? new Telegraf(botToken) : null;

// Inicijalizacija sistema komandi
if (bot) {
  initCommandSystem(bot);
}

export async function sendTelegramMessage(message: string) {
  if (!bot ||!chatId) {
    return { success: false, error: "Telegram bot not configured." };
  }
  try {
    await bot.telegram.sendMessage(chatId, message);
    return { success: true };
  } catch (error: any) {
    console.error("Telegram API Error:", error.response?.data |

| error.message);
    return { success: false, error: error.message };
  }
}