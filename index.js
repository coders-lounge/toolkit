require('dotenv').config();

// discord.js sharding manager
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', {
	token: process.env.BOT_TOKEN,
});

manager.on('shardCreate', (shard) => console.log(`Sharding Manager >> Launched shard ${shard.id}`));
manager.spawn();
