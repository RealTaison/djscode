import { Client, Events, GatewayIntentBits } from "discord.js";
import vueInit from "@/core/vue";
import dotenv from "dotenv";
import { useAppStore } from "@/store/app";

import { loadCommands, loadEvents } from "@/core/loader";

vueInit();
dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore();
appStore.client = client;
//console.log(client);

loadEvents();

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

// Load commands for a specific guild ID
const guildID = "892083736244523048"; // Replace with your guild ID
//const myGuild = client.guilds.cache.get(guildId);
loadCommands(guildID);
