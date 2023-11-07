import convict from "convict";
import groups from './groups.json' assert { type: "json" };

const config = convict({
    env: {
		doc: "Environoment for application",
		format: ["development", "production"],
		default: null,
		env: "NODE_ENV",
	},
    logsChat: {
		doc: "Id of the logs chat",
		format: String,
		default: null,
		env: "LOGS_CHAT",
        arg: "logsChat"
	},
    botToken: {
        doc: "API token of tg bot",
        format: String,
        default: null,
        env: "BOT_TOKEN",
        arg: "botToken"
    },
    it: {
        doc: "Id of the IT chanell",
        format: String,
        default: null,
        env: "IT",
        arg: "it"
    },
    remote: {
        doc: "Id of the IT/Remote chanell",
        format: String,
        default: null,
        env: "IT",
        arg: "remote"
    },
    shabashka_odesa: {
        doc: "id of the shabahska odesa chanel",
        default: null,
        env: "SHABASHKA_ODESA",
        arg: "shabashka_odesa"
    },
	logsFile: {
		doc: "The name of the logs file",
		format: String,
		default: "logs.txt",
		arg: "logsFile"
	},
	workUaSchedule: {
		doc: "Schedule for work.ua cron job",
		format: String,
		default: "* * * * * *",
		arg: "workUaSchedule"
	},
	workUaTimezone: {
		doc: "Time Zone for work ua cron job",
		format: String,
		default: "Europe/Kiev",
		arg: "workUaTimezone",
	},
	djinnyCoSchedule: {
		doc: "Schedule for djinny.co cron job",
		format: String,
		default: "* * * * * *",
		arg: "djinnyCoSchedule"
	},
    djinnyTimezone: {
		doc: "Time Zone for djinny cron job",
		format: String,
		default: "Europe/Kiev",
		arg: "djinnyTimezone",
	},
    targets: {
        doc : "Parsing targets",
        format: Object,
        default: null,
        arg: "targets"
    },
    hastags: {
        doc : "Hastags to use. They are cattegories from djinny",
        format: Array,
        default: null,
        arg: "hastags"
    },
    groups: {
        doc : "Groups for IT adds",
        format: Object,
        default: null,
        arg: "groups"
    }
})
const env = config.get("env");
config.loadFile(`./config/${env}.json`);
if(groups) config.load({groups: groups})

config.validate({ allowed: "strict" });

export default config;
