import { client } from "..";
import { Event } from "../structures/Event";

export default new Event("ready", () => {
    client.logger.info(`Logged in as ${client.user?.tag}`);
});