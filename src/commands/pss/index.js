import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("pps")
  .setDescription("pps command")
  .addStringOption((option) =>
    option.setName("input1").setDescription("paper scissors stone")
  );

export const action = async (ctx) => {
  const input = ctx.options.getString("input1");
  const buffer = getRandomInt(3);
  if (buffer == 0) {
    await ctx.reply(`You: ${input} \ndjs: paper`);
  } else if (buffer == 1) {
    await ctx.reply(`You: ${input} \ndjs: scissors`);
  } else {
    await ctx.reply(`You: ${input} \ndjs: stone`);
  }
  await ctx.followUp("you " + myFunction(input, buffer));
  //await ctx.reply("you " + myFunction(input, buffer));
};

function myFunction(input, buffer) {
  let ans;

  if (input == "paper") {
    ans = 0;
  } else if (input == "scissors") {
    ans = 1;
  } else {
    ans = 2;
  }

  if (ans == buffer) {
    return "draw";
  } else if (ans == 2 && buffer == 0) {
    return "lose";
  } else if (ans == 0 && buffer == 2) {
    return "win";
  } else if (ans > buffer) {
    return "win";
  } else {
    return "lose";
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
