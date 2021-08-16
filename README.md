# 🤖 Programmer's Toolkit Discord Bot

The bot for [discord.gg/rGYDCPkUmU](https://discord.com/invite/rGYDCPkUmU). Built for programmers, moderation, and community management. Created with **Node** and **discord.js**. Command/Event handler based on https://github.com/MattA-Official/bot.

## Features

- Slash Commands
- Message Commands
- Full API coverage (using [discord.js](https://discord.js.org))
- Runs on Node
- `es6` syntax
- Functional over Object Oriented

## Contributing

Contributions are always welcome! Contributing will grant you a special role on our Discord server.

See [`contributing.md`](/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [`code of conduct`](/CODE_OF_CONDUCT.md).

## Feedback

If you have any feedback, please reach out to us via Discord.

## Contributors

- [@MattA-Official](https://www.github.com/MattA-Official) - MattA#6011
- [@THE-SIMPLE-MARK](https://www.github.com/THE-SIMPLE-MARK) - SIMPLE MARK#3941

# Reference

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

1. `BOT_TOKEN` - Your bot token found at the [Discord Developer Portal](https://discord.com/developers)
2. `GUILD_ID` - The ID of the guild you want to run the bot in.
3. `DATABASE_URI` - The mongodb URI, this allows for the storage and retrieval of data.

## Commands

All commands require the following exports:

```js
export const data = {
	name: 'name',
	description: 'a description of what the command does',
	options: [], // optional - array of #ApplicationCommandOption
	defaultPermissions: false, // optional - boolean whether to allow access by default
};

export const permissions = []; // optional - array of #ApplicationCommandPermission

export const execute = async (client, interaction) => {
	// command logic in here
};
```

## Context Menus

Context menus are the same as [commands](#commands), other than the inclusion of a type field in the data export.

```js
export const data = {
	name: 'name',
	description: 'a description of what the command does',
	options: [], // optional - array of #ApplicationCommandOption
	type: 'USER' // optional - string 'USER' or 'MESSAGE'
	defaultPermissions: false, // optional - boolean whether to allow access by default
};
```

## Components

Components are are a framework for adding interactive elements to messages. All components require the following exports:

```js
export const data = {
	id: 'id',
};

export const execute = async (client, interaction) => {
	// component logic in here
};
```

## Events

Events have a different number of arguments passed, check the discord.js documentation for information on each. Always pass the client before any additional arguments.

```js
export const name = 'name';
export const once = true;

export const execute = async (client, ...args) => {
	// event logic in here
};
```
