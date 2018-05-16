module.exports.ClientOptions = {
	disabledEvents: [
		'GUILD_SYNC',
		'CHANNEL_PINS_UPDATE',
		'MESSAGE_REACTION_ADD',
		'MESSAGE_REACTION_REMOVE',
		'MESSAGE_REACTION_REMOVE_ALL',
		'USER_NOTE_UPDATE',
		'USER_SETTINGS_UPDATE',
		'TYPING_START',
		'RELATIONSHIP_ADD',
		'RELATIONSHIP_REMOVE'
	],
	disableEveryone: true,
	messageCacheMaxSize: 100,
	messageCacheLifetime: 240,
	messageSweepInterval: 300,
	fetchAllMembers: true
};
