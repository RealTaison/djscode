import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("button")
  .setDescription("button command");

export const action = async (ctx) => {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("button1")
        .setLabel("Click me!")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("button2")
        .setLabel("Click me!")
        .setStyle(ButtonStyle.Primary)
    );

  await ctx.reply({
    content: "I think you should...",
    components: [row],
  });

  // Wait for the button to be clicked
  const interaction = await ctx.channel.awaitMessageComponent({
    filter: (i) => i.isButton() && i.customId === "button1",
    filter: (i) => i.isButton() && i.customId === "button2",
    time: 10000,
  });

  // Edit the original reply and send a new message with the value of the button
  await interaction.update({
    content: `You clicked the button with value: ${interaction.customId}`,
    components: [],
  });
};
