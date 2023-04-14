import { SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("2sum")
  .setDescription("return sum of 2 values")
  .addIntegerOption((option) =>
    option.setName("input1").setDescription("first integer")
  )
  .addIntegerOption((option) =>
    option.setName("input2").setDescription("second integer")
  );

export const action = async (ctx) => {
  const input1 = ctx.options.getInteger("input1");
  const input2 = ctx.options.getInteger("input2");
  await ctx.reply("result = " + myFunction(input1, input2));
  /*setTimeout(async () => {
    await ctx.editReply("hi");
  }, 2000);*/
};

function myFunction(x, y) {
  return x + Number(y);
}
