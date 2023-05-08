import { ApplicationCommandOptionType, ChannelType, GuildTextBasedChannel } from "discord.js";
import { Command } from "../../structures/Command";
import ms from "ms";

export default new Command({
    name: "giveaway",
    description: `Manage Giveaways in this server.`,
    defaultMemberPermissions: ["ManageMessages"],
    options: [
        {
            name: "create",
            description: `Create a giveaway.`,
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "prize",
                    description: `What should the giveaway's prize be?`,
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
                {
                    name: "time",
                    description: `How long should the giveaway last? (e.g 1h 35m)`,
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "winners",
                    description: `The amount of winners to choose at the end of the giveaway.`,
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                },
                {
                    name: "channel",
                    description: `What channel should the giveaway be hosted in?`,
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: false,
                }
            ],
        },

        {
            name: "reroll",
            description: `Reroll a giveaway.`,
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    
                }
            ],
        },
    ],
    run: async ({ client, interaction, opts }) => {
        const subCommand = opts.getSubcommand();

        if (subCommand === "create") {
            const prize = opts.getString("prize") as string;
            const time = opts.getString("time") as string;
            const winners = opts.getInteger("winners") as number;
            const channelData = opts.getChannel("channel") || interaction.channel;
            
            const channel = await client.channels.fetch(`${channelData?.id}`) as GuildTextBasedChannel;

            const msg = await interaction.followUp({ content: `⏸️ | Creating giveaway...` });

            client.giveawayManager.start(channel, {
                duration: ms(time),
                winnerCount: winners,
                prize,

                messages: {
                    giveaway: "",
                },
            })
            .then(async () => {
                await msg.edit({ content: `:tada: | Giveaway **${prize}** started!` });
            })
            .catch(async (err) => {
                await msg.edit({ content: `:x: | Error: **${err}**` });
            });
        };
    },
});