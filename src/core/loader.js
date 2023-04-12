import { REST, Routes } from "discord.js";
import fg from "fast-glob";

const updateSlashCommands = async (commands) => {
  const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);
  const result = await rest.put(
    Routes.applicationGuildCommands(
      process.env.APPLICATIION_ID,
      "892083736244523048"
    ),
    {
      body: commands,
      /*[
        { name: "ping", description: "this is a ping slash command" },
        { name: "pong", description: "this is a pong slash command" },
      ]*/
    }
  );

  console.log(result);
};

export const loadCommands = async () => {
  const commands = [];
  const files = await fg("./src/commands/**/index.js");
  for (const file of files) {
    const cmd = await import(file);
    commands.push(cmd.command);
    //console.log(cmd.command);
  }

  await updateSlashCommands(commands);
};
