import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Replies with your input!")
  .addStringOption((option) =>
    option.setName("input").setDescription("The input to echo back")
  );

export const action = async (ctx) => {
  ctx.reply("nei");
};
