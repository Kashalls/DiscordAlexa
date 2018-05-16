'use strict';

if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const result = require('dotenv').config();

if (result.error) {
  throw result.error;
};

const Alexa = require('ask-sdk-core');
const Snekfetch = require('snekfetch');
const Discord = require('discord.js');

const Logger = require('./Logger');
const { ClientOptions } = require('./constants');

const discord = new Discord.Client({ ClientOptions });
const developers = ['112001393140723712', '201077739589992448'];

// =========================================================================================================================================
// ALEXA SKILLS: Editing anything below this line might break your skill.
// =========================================================================================================================================
var skill;

exports.handler = async function handler(event, context) {
	console.log(`REQUEST++++${JSON.stringify(event)}`);
	if (!skill) {
		skill = Alexa.SkillBuilders.custom()
			.addRequestHandlers(
				LaunchRequestHandler,
				HelloWorldIntentHandler,
				HelpIntentHandler,
				CancelAndStopIntentHandler,
				SessionEndedRequestHandler,
			)
			.addErrorHandlers(ErrorHandler)
			.create();
	}

	return skill.invoke(event, context);
};

const ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.message}`);

		return handlerInput.responseBuilder
			.speak('Sorry, I can\'t understand the command. Please say again.')
			.reprompt('Sorry, I can\'t understand the command. Please say again.')
			.getResponse();
	}
};

const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = `Welcome to Discord Alexa, you can get information on any of the ${discord.guilds.size} guilds I have access to.`;

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse();
	}
};

const GetGuilds = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'GetGuildsIntent';
	},
	handle(handlerInput) {
		var speechText = `There are ${discord.guilds.size} that I have access to. They are: `;
		discord.guilds.forEach((g) => {
			if () {

			}
		})


		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse();
	}
};

const HelloWorldIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
	},
	handle(handlerInput) {
		const speechText = 'Hello World!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse();
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput) {
		const speechText = 'You can say hello to me!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse();
	}
};

const CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		const speechText = 'Goodbye!';

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse();
	}
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput) {
		// any cleanup logic goes here
		return handlerInput.responseBuilder.getResponse();
	}
};

const onDmRecieved = (user, msg) => {

};

// =========================================================================================================================================
// DISCORD INT: Editing anything below may break anything or everything.
// =========================================================================================================================================


discord.on('ready', () => {
	Logger.log(`Discord is ready as ${discord.user.tag}.`);
});

discord.on('message', (msg) => {
	/* if (!msg.content.toLowerCase().startsWith('alexa,')) return;
	return msg.channel.send(`Thanks for testing me \`${msg.author.tag}\`, your message was \`${msg.content}\`.`); */
	if (!developers.includes(msg.author.id)) return;
	return msg.channel.send(`Hello ${msg.author.tag}`);
});

discord.login(process.env.DISCORD_BOT_TOKEN);
