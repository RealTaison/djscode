import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("countdown")
  .setDescription("Starts a countdown from a given number.")
  .addIntegerOption((option) =>
    option
      .setName("count")
      .setDescription("The number of seconds to count down from.")
      .setRequired(true)
  );

export const action = async (ctx) => {
  const count = ctx.options.getInteger("count");

  // Defer the reply to indicate that the bot is processing the interaction
  await ctx.deferReply();

  let countdown = count;
  const countdownInterval = setInterval(() => {
    if (countdown === 0) {
      clearInterval(countdownInterval);
      // Send a follow-up message to indicate that the countdown is complete
      ctx.followUp("Countdown complete!");
    } else {
      // Send a follow-up message with the current countdown value
      ctx.followUp(`Countdown: ${countdown}`);
      countdown--;
    }
  }, 1000);
};
