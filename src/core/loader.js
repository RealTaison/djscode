import { REST, Routes, Collection } from "discord.js";
import fg from "fast-glob";
import { useAppStore } from "@/store/app";

const updateSlashCommands = async (commands, guild) => {
  const rest = new REST({ version: 10 }).setToken(process.env.TOKEN);
  const result = await rest.put(
    Routes.applicationGuildCommands(process.env.APPLICATIION_ID, guild),
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

export const loadCommands = async (guildID) => {
  const appStore = useAppStore();
  const commands = [];
  const actions = new Collection();
  const files = await fg("./src/commands/**/index.js");
  for (const file of files) {
    const cmd = await import(file);
    if (cmd.command && cmd.command.name && cmd.command.description) {
      commands.push(cmd.command);
      actions.set(cmd.command.name, cmd.action);
    }
  }
  let guild = await updateSlashCommands(commands, guildID);
  appStore.commandsActionMap = actions;
};

export const loadEvents = async () => {
  const appStore = useAppStore();
  const client = appStore.client;
  const files = await fg("./src/events/**/index.js");
  for (const file of files) {
    console.log(file);
    const eventFile = await import(file);

    if (eventFile.event.once) {
      client.once(eventFile.event.name, eventFile.action);
    } else {
      client.on(eventFile.event.name, eventFile.action);
      //console.log(eventFile.action);
    }
  }
};

//export const loadCommands = async () => {
//  const commands = [];
//  const files = await fg("./src/commands/**/index.js");
//  for (const file of files) {
//    const cmd = await import(file);
//    commands.push(cmd.command);
//    //console.log(cmd.command);
//  }
//
//  await updateSlashCommands(commands);
//};
