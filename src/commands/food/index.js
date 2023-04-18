import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("food")
  .setDescription("food command");

export const action = async (ctx) => {
  const food = [];
  food.push("M記", "屎", "杯麵");

  await ctx.reply(food[getRandomInt(food.length)]);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
