import pkg from 'sequelize';
const { Sequelize, DataTypes } = pkg;

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database.sqlite',
});

export const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		xp: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		level: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
		},
		lock: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{ timestamps: false }
);

export const Case = sequelize.define(
	'Case',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		member: {
			type: DataTypes.STRING,
		},
		moderator: {
			type: DataTypes.STRING,
		},
		type: {
			type: DataTypes.ENUM('warn', 'mute', 'unmute', 'kick', 'ban', 'unban'),
		},
		reason: {
			type: DataTypes.STRING,
		},
		url: {
			type: DataTypes.STRING,
		},
		timestamp: {
			type: DataTypes.INTEGER,
		},
	},
	{ timestamps: false }
);

export const Mute = sequelize.define(
	'Mute',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		reason: {
			type: DataTypes.STRING,
		},
		case_id: {
			type: DataTypes.INTEGER,
		},
		timestamp: {
			type: DataTypes.DATE,
		},
	},
	{ timestamps: false }
);

Mute.hasOne(Case, { foreignKey: 'case_id' });

sequelize.sync();
