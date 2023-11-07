import convict from "convict";
import groups from './groups.json' assert { type: "json" };

const config = convict({

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
    itChat: {
        doc: "Id of the IT chat",
        default:'-4089641525',
        env: "IT_CHAT",
        arg: "itChat"
    },
    it: {
        doc: "Id of the IT chanell",
        default:'-1001963238259',
        env: "IT",
        arg: "it"
    },
    remote: {
        doc: "Id of the IT/Remote chanell",
        default:'-1001963238259',
        env: "IT",
        arg: "remote"
    },
    shabashka_odesaChat: {
        doc: "id of the shabahska odesa chat",
        default:'-4090473910',
        env: "SHABASHKA_ODESA_CHAT",
        arg: "shabashka_odesa_chat"
    },
    shabashka_odesa: {
        doc: "id of the shabahska odesa chanel",
        default:'-1001922863417',
        env: "SHABASHKA_ODESA",
        arg: "shabashka_odesa"
    },
    logsChat: {
        doc: "Id of the logs chat",
        default:'-4065832340',
        env: "LOGS_CHAT",
        arg: "logsChat"
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
	djinnyCredentialsEmail: {
		doc: "Email from djinny.co account",
		format: String,
		default: null,
		arg: "djinnyCredentialsEmail",
        env: "DJINNY_EMAIL"
	},
    djinnyCredentialsPassword: {
		doc: "Password from djinny.co account",
		format: String,
		default: null,
		arg: "djinnyCredentialsPassword",
        env: "DJINNY_PASSWORD"
	},
    hastags: {
        doc : "Hastags to use. They are cattegories from djinny",
        format: Array,
        default: null,
        arg: "hastags"
    },
    targets: {
        doc : "Parsing targets",
        format: Object,
        default: null,
        arg: "targets"
    },
    groups: {
        doc : "Groups for IT adds",
        format: Object,
        default: null,
        arg: "groups"
    }
})

config.loadFile(`./config/config.json`);
if(groups) config.load({groups: groups})

config.validate({ allowed: "strict" });

export default config;
