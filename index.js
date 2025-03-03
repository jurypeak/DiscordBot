// Load environment variables from .env file
require("dotenv").config();
// Retrieve the Discord bot token from environment variables
const { token } = process.env.DISCORD_TOKEN;
// Import necessary classes from discord.js library
const { Client, Collection, GatewayIntentBits } = require("discord.js");
// Import the file system module to read directories and files
const fs = require("fs");
// Create a new Discord client instance with specified gateway intents
const client = new Client({ intents: GatewayIntentBits.Guilds });

// Initialize a collection to store bot commands
client.commands = new Collection();
// Initialize an empty array to store command data
client.commandArray = [];
// Initialize a collection to store buttons.
client.buttons = new Collection();
// Initialize a collection to store select menus.
client.selectMenus = new Collection();

// Read the functions directory to dynamically load function files
const functionFolders = fs.readdirSync('./functions');
for (const folder of functionFolders) {
    // Filter only JavaScript files within each function subfolder
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter((file) => file.endsWith(".js"));

    // Require each function file and pass the client instance to it
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

// Call functions to handle events, components and commands
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Log in to Discord using the bot token
client.login(process.env.DISCORD_TOKEN);