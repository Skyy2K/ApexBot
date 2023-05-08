export default class MinecraftJavsServerData {
    /** Determines whether the server is online or offline.*/
    online: boolean;

    /** The hostname of the server that was resolved from the address string. */
    host: string;

    /** The port of the server that was resolved from the address string. */
    port: number;

    /** Whether or not this server address has been blocked by Mojang. */
    blockedByMojang: boolean;

    /** The timestamp in Unix milliseconds of when the status was retrieved from the Minecraft server itself. */
    retrieved_at: number;

    /** The Unix milliseconds timestamp at which the cache will expire for this status. */
    expires_at: number;

    /** The version data of the server. This will be null if the server version is pre-1.3.2. This property will be missing if the server is offline. */
    version?: MinecraftJavaServerVersionData;

    /** Information about the amount of players online and *some* sample players if provided. This property will be missing if the server is offline. */
    players?: MinecraftJavaServerPlayersData;

    /** The message of the day (or MOTD/description) of the server. This is the message shown below the server name in the client multiplayer menu. This property will be missing if the server is offline. */
    motd: MinecraftJavaServerMOTDData;

    icon?: string;

    mods: MinecraftJavaServerMOTDData[];

    constructor(rawData: any) {
        this.online = rawData.online;
        this.host = rawData.host;
        this.port = rawData.port;
        this.blockedByMojang = rawData.eula_blocked;
        this.retrieved_at = rawData.retrieved_at;
        this.expires_at = rawData.expires_at;
        this.version = rawData.version;
        this.players = rawData.players;
        this.motd = rawData.motd;
        this.icon = rawData.icon;
        this.mods = rawData.mods;
    };
};

export interface MinecraftJavaServerVersionData {
    /** The version name of the server, typically modified by the server itself to show version range. This value may contain special formatting characters. */
    name_raw: string;

    /** The version name of the server, typically modified by the server itself to show version range. This value will have all formatting characters removed. */
    name_clean: string;

    /** The version name of the server, typically modified by the server itself to show version range, as an HTML string with proper formatting applied. */
    name_html: string;

    /** The protocol version of the server which is used to identify what client versions are supported. */
    protocol: number;
};

export interface MinecraftJavaServerPlayersData {
    /** The amount of online players in the server. */
    online: number;
    
    max: number;

    /** Some sample players online in the server. Most (if not all) major servers disable this or modify the data for custom formatting. If you do not have any items in this array, it is because the server has disabled sample players for a reason. */
    list: MinecraftJavaServerSamplePlayer[];
};

export class MinecraftJavaServerSamplePlayer {
    /** The UUID of the player logged into the server. */
    uuid?: string;

    /** The username of the player logged into the server. The server may have plugins that modify this data to show special formatting. This value may have formatting characters. */
    name_raw?: string;

    /** The username of the player logged into the server. The server may have plugins that modify this data to show special formatting. This value will not have any formatting characters. */
    name_clean?: string;

    /** The username of the player logged into the server, as an HTML string with proper formatting applied. */
    name_html?: string;
};

export interface MinecraftJavaServerMOTDData {
    /** The raw MOTD with formatting codes. Refer to https://minecraft.fandom.com/wiki/Formatting_codes for information on how to use formatting codes. */
    raw: string;

    /** A clean text-only version of the MOTD with all formatting codes removed. */
    clean: string;

    /** An HTML representation of the MOTD with proper formatting. All formatting codes are supported and are equal to their value in the Minecraft fandom wiki. Magic/obfuscated formatting codes are a <span> with the class `.minecraft-format-obfuscated`. Line breaks are encoded as the "\n" escape code and may be replaced with <br> by the user. */
    html: string;
};

export class MinecraftJavaServerModData {
    /** The name of the mod that is loaded on the server. */
    name?: string;

    /** The version of the mod that is loaded on the server. */
    version?: string;
};