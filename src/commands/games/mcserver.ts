import { ApplicationCommandOptionType, EmbedBuilder, AttachmentBuilder } from "discord.js";
import { Command } from "../../structures/Command";

import fetch from "node-fetch";
import MinecraftJavaServerData from "../../structures/games/MinecraftJavaServerData";
import MinecraftBedrockServerData from "../../structures/games/MinecraftBedrockServerData";

export default new Command({
    name: "mcserver",
    description: "Retrieve information on a specific Minecraft: Java/Bedrock Edition server.",
    options: [
        {
            name: "address",
            description: "The IP Address of the Minecraft server.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "type",
            description: "The type of server it is. (Default: Java Edition)",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Java Edition",
                    value: "java",
                },
                {
                    name: "Bedrock Edition",
                    value: "bedrock",
                },
            ],
            required: false,
        }
    ],
    run: async ({ interaction, opts }) => {
        const address = opts.getString("address");
        const type = opts.getString("type") || "java";
        
        if (type === "java") {
            const msg = await interaction.followUp({ content: `⏸️ Please wait... **Fetching server data**` });
            
            const rawData = await fetch(`https://api.mcstatus.io/v2/status/java/${address}`, {
                method: "GET",
            }).then((res: any) => res.json());

            const data = new MinecraftJavaServerData(rawData);

            if (data.online == false || !data.version) return msg.edit({ content: `🔴 This server is currently offline or could not be found.` });
        
            const serverIcon = `https://api.mcstatus.io/v2/icon/${address}`;
            const serverWidget = `https://api.mcstatus.io/v2/widget/java/${address}?dark=true`;

            const serverEmbed = new EmbedBuilder()
            .setAuthor({ name: `${data.host} (${data.port})`, iconURL: serverIcon })
            .setColor("Green")
            .setThumbnail(serverIcon)
            .setImage(serverWidget)
            .setDescription(`Server information has been displayed below.`)
            .addFields(
                { name: "🎮 Type", value: `Minecraft: Java Edition Server`, inline: true },
                { name: "👥 Players", value: `**${data.players?.online}**/**${data.players?.max}**`, inline: true },
                { name: "▶️ Version", value: `${data.version?.name_clean} (**${data.version.protocol}**)`, inline: true },
                { name: "Ⓜ️ MOTD", value: `${data.motd.clean}`, inline: false },
                { name: "🎈 Mods", value: `${data.mods.length} mods loaded`, inline: true },
            )
            .setFooter({ text: "Data from mcstatus.io" });

            msg.edit({ content: "✅ **Retrieved!**", embeds: [serverEmbed] });
        } else if (type === "bedrock") {
            const msg = await interaction.followUp({ content: `⏸️ Please wait... **Fetching server data**` });
        
            const rawData = await fetch(`https://api.mcstatus.io/v2/status/bedrock/${address}`, {
                method: "GET",
            }).then((res: any) => res.json());

            const data = new MinecraftBedrockServerData(rawData);

            if (data.online == false || !data.version) return msg.edit({ content: `🔴 This server is currently offline or could not be found.` });
        
            const serverIcon = `https://api.mcstatus.io/v2/icon/${address}`;

            const serverEmbed = new EmbedBuilder()
            .setAuthor({ name: `${data.host} (${data.port})`, iconURL: serverIcon })
            .setColor("Green")
            .setThumbnail(serverIcon)
            .setDescription(`Server information has been displayed below.`)
            .addFields(
                { name: "🎮 Type", value: `Minecraft: Bedrock Edition Server (${data.edition})`, inline: false },
                { name: "🔢 Server ID", value: `${data.serverId}`, inline: true },
                { name: "👥 Players", value: `**${data.players?.online}**/**${data.players?.max}**`, inline: true },
                { name: "▶️ Version", value: `${data.version.name} (**${data.version.protocol}**)`, inline: true },
                { name: "Ⓜ️ MOTD", value: `${data.motd.clean}`, inline: false },
                { name: "🕹️ Default Gamemode", value: `${data.gamemode}`, inline: true },
            )
            .setFooter({ text: "Data from mcstatus.io" });

            msg.edit({ content: "✅ **Retrieved!**", embeds: [serverEmbed] });
        };
    },
});