'use strict';

if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');
// =========================================================================================================================================
// DISCORD INT: Editing anything below may break anything or everything.
// =========================================================================================================================================

// Lets load us some settings. Woohoo!
const settings = require('../settings');

// Load DiscordJS Master for API/BOT Usage
const Discord = require('discord.js');
const { ClientOptions } = require('./constants');
const discord = new Discord.Client({ ClientOptions });

// Custom Logger anyone?
const Logger = require('./Logger');

discord.on('ready', () => {
	Logger.log(`Discord is ready as ${discord.user.tag}.`);
});

discord.on('message', (msg) => {
	if (!settings.developers.includes(msg.author.id)) return;
	return msg.channel.send(`Hello ${msg.author.tag}`);
});

discord.login(settings.discordBotToken);

// =========================================================================================================================================
// ALEXA SKILLS: Editing anything below this line might break your skill.
// =========================================================================================================================================

const express = require('express');
const { app } = require('alexa-app');
const expressApp = express();
const Alexa = new app('sample');

// DEFAULT CODE HERE
Alexa.intent('number', {
	slots: { number: 'AMAZON.NUMBER' },
	utterances: ['say the number {-|number}']
},
(request, response) => {
	var number = request.slot('number');
	response.say(`You asked for the number ${number}`);
}
);

// setup the alexa app and attach it to express before anything else
Alexa.express({ expressApp });

// now POST calls to /sample in express will be handled by the app.request() function
// GET calls will not be handled

// from here on, you can setup any other express routes or middleware as normal
