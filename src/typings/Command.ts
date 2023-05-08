import { 
    ChatInputApplicationCommandData, 
    CommandInteraction, 
    CommandInteractionOptionResolver, 
    GuildMember, 
    PermissionResolvable 
} from "discord.js";

import ApexBot from "../structures/ApexBot";

export interface Interaction extends CommandInteraction {
    member: GuildMember;
};

interface RunOptions {
    client: ApexBot;
    interaction: Interaction;
    opts: CommandInteractionOptionResolver;
};

type Run = (options: RunOptions) => any;

export type CommandType = {
    botPermissions?: PermissionResolvable[];
    run: Run;
} & ChatInputApplicationCommandData;