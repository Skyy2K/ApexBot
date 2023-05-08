import { ClientEvents } from "discord.js";

export class Event<eventName extends keyof ClientEvents> {
    constructor(public name: eventName, public run: (...args: ClientEvents[eventName]) => any) {};
};