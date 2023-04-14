import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("button")
  .setDescription("paper scissors stone bot with button function implemented");

export const action = async (ctx) => {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("paper")
        .setLabel("Paper!")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("scissors")
        .setLabel("Scissors!")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stone")
        .setLabel("Stone!")
        .setStyle(ButtonStyle.Primary)
    );
  await ctx.reply({
    content: "I think you should...",
    components: [row],
  });

  // Wait for the button to be clicked
  const interaction = await ctx.channel.awaitMessageComponent({
    filter: (i) =>
      i.isButton() &&
      (i.customId === "paper" ||
        i.customId === "scissors" ||
        i.customId === "stone"),
    time: 5000,
  });

  const input = interaction.customId;

  //  await interaction.update({
  //    content: `You clicked the button with value: ${interaction.customId}`,
  //    components: [],
  //  });

  const buffer = getRandomInt(3);
  if (buffer == 0) {
    await interaction.update({
      content:
        `You: ${interaction.customId}\ndjs: paper\nyou ` +
        myFunction(input, buffer),
      components: [],
    });
  } else if (buffer == 1) {
    await interaction.update({
      content:
        `You: ${interaction.customId}\ndjs: scissors\nyou ` +
        myFunction(input, buffer),
      components: [],
    });
  } else {
    await interaction.update({
      content:
        `You: ${interaction.customId}\ndjs: stone\nyou ` +
        myFunction(input, buffer),
      components: [],
    });
  }

  // Edit the original reply and send a new message with the value of the button
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
