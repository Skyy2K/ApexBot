import { Client, ApplicationCommandDataResolvable, Collection, ClientEvents } from "discord.js";
import { glob } from "glob";
import { promisify } from "util";

import { RegisterCommandsOptions } from "../typings/client";
import { CommandType } from "../typings/Command";
import { Event } from "./Event";

import config from "../../config";
import Logger from "../utils/Logger";
import { GiveawayManager } from "../data/giveaways";

const globPromise = promisify(glob);

export default class ApexBot extends Client {
    commands: Collection<string, CommandType> = new Collection();

    logger = Logger;

    giveawayManager: GiveawayManager = new GiveawayManager(this, {
        default: {
            botsCanWin: false,
            embedColor: 'Blurple',
            embedColorEnd: 'DarkButNotBlack',
            reaction: '🎉',
            lastChance: {
                enabled: true,
                content: "⚠️ **ENDING...** ⚠️",
                threshold: 5000,
                embedColor: "Red",
            },
        }
    });

    constructor() {
        super({ intents: 32767 });
    };

    // Commands

    async loadCommands() {
        const commands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*.ts`);

        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            
            this.commands.set(command.name, command);
            commands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({ commands });
        });
    };

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            this.logger.info(`${commands.length} commands registered to guild ${guildId} (locally).`);
        } else {
            this.application?.commands.set(commands);
            this.logger.info(`${commands.length} commands registered globally.`);
        };
    };

    // Events

    async loadEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/*.ts`);
        eventFiles.forEach(async (filePath) => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.name, event.run);
        });
    };

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    };

    build() {
        this.loadCommands();
        this.loadEvents();

        this.login(config.bot.token);
    };
};