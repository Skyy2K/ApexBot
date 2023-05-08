import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: "Check to see if the bot is alive.",
    run: async ({ interaction }) => {
        interaction.followUp({ content: `🏓 Pong!` });
    },
});