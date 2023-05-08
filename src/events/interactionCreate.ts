import { CommandInteractionOptionResolver, PermissionResolvable } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { Interaction } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply();

        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.followUp({ content: `❌ This command does not exist.` });
        
        if (command.botPermissions) {
            if (interaction.appPermissions?.missing(command.botPermissions)) {
                const botPerms = interaction.appPermissions.toArray();
                const missingPerms: Array<PermissionResolvable> = [];
                
                command.botPermissions.forEach((permission) => {
                    if (!botPerms.includes(permission as any)) {
                        missingPerms.push(permission);
                    };
                });

                if (missingPerms.length >= 1) {
                    return interaction.followUp({ content: `❌ I am missing the following permissions: \`${missingPerms.join(` `)}\`` });
                };
            };
        };

        command.run({
            client,
            interaction: interaction as Interaction,
            opts: interaction.options as CommandInteractionOptionResolver,
        });
    };
});