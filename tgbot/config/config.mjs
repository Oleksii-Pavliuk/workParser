import convict from "convict";
import groups from './groups.json' assert { type: "json" };

const config = convict({
    env: {
		doc: "Environoment for application",
		format: ["development", "production"],
		default: null,
		env: "NODE_ENV",
	},
	port: {
		doc: "The port to bind.",
		format: "port",
		default: 3000,
		env: "PORT",
		arg: "port",
	},
  logsChat: {
		doc: "Id of the logs chat",
		format: String,
		default: null,
		env: "LOGS_CHAT",
    arg: "logsChat"
	},
	itChanelId: {
		doc: "Id of the IT chanel",
		format: String,
		default: null,
		env: "IT",
		arg: "itChanelId"
	},
	devOpsChanelId: {
		doc: "Id of the DevOps chanel",
		format: String,
		default: null,
		env: "DEVOPS",
		arg: "DevdevOpsChanelIdOps"
	},
	botToken: {
			doc: "API token of tg bot",
			format: String,
			default: null,
			env: "BOT_TOKEN",
			arg: "botToken"
	},

	logsFile: {
		doc: "The name of the logs file",
		format: String,
		default: "logs.txt",
		arg: "logsFile"
	},

	parsers: {
		doc : "List of parsers",
		format: Array,
		default: null,
		arg: "parsers"
	},

	groups: {
			doc : "Groups for IT adds",
			format: Object,
			default: null,
			arg: "groups"
	},
	ServiceName: {
		doc: "The name by which the service is registered in Consul. If not specified, the service is not registered",
		format: "*",
		default: "Telegram Bot Service",
		env: "SERVICE_NAME",
	},
	consulHost: {
		doc: "The host where the Consul server runs",
		format: String,
		default: "consul-client",
		env: "CONSUL_HOST",
		arg: "consulhost"
	},
	consulPort: {
		doc: "The port for the Consul client",
		format: "port",
		default: 8500,
		env: "CONSUL_PORT",
	},
	jaegerHost: {
		doc: "The host where the Jaeger UI",
		format: String,
		default: "jaeger",
		env: "JAEGER_HOST",
		arg: "jaegerhost"
	},
	jaegerPort: {
		doc: "The port for Jaeger UI",
		format: "port",
		default: 4318,
		env: "JAEGER_PORT",
	},
})
const env = config.get("env");
config.loadFile(`./config/${env}.json`);
if(groups) config.load({groups: groups})

config.validate({ allowed: "strict" });

export default config;
