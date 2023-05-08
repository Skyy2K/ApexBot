export default class MinecraftBedrockServerData {
    /** Determines whether the server is online or offline. */
    online: boolean;

    /** The hostname of the server that was resolved from the address string. */
    host: string;

    /** The port of the server that was resolved from the address string. */
    port: number;

    /** Whether or not this server address has been blocked by Mojang. If this is true, Notchian clients will not be able to connect to the server via the Minecraft client because it previously violated the EULA. */
    blockedByMojang: boolean;

    /** The timestamp in Unix milliseconds of when the status was retrieved from the Minecraft server itself. */
    retrieved_at: number;

    /** The Unix milliseconds timestamp at which the cache will expire for this status. The first proceeding request made after this timestamp will return an up-to-date status of the server. */
    expires_at: number;

    /** The version data of the server. This property will be missing if the server is offline. */
    version: MinecraftBedrockServerVersionData;

    /** Information about the amount of online and max players. This property will be missing if the server is offline. */
    players: MinecraftBedrockServerPlayersData;

    /** The message of the day (or MOTD/description) of the server. This is the message shown below the server name in the client multiplayer menu. This property will be missing if the server is offline. */
    motd: MinecraftBedrockServerMOTDData;

    /** The default gamemode that players will spawn into when joining the server. */
    gamemode: string;

    /** The ID of the server itself. There is little to no documentation online about the use of this value. */
    serverId: string;

    /** The type of server that was retrieved. Possible values are "MCPE" for Bedrock and Pocket Edition, or "MCEE" for Education Edition. */
    edition: string;

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
        this.gamemode = rawData.gamemode;
        this.serverId = rawData.server_id;
        this.edition = rawData.edition;
    };
};

export interface MinecraftBedrockServerVersionData {
    /** The version name of the server. */
    name: string;

    /** The protocol version of the server which is used to identify what client versions are supported. */
    protocol: number;
};

export interface MinecraftBedrockServerPlayersData {
    /** The amount of online players in the server. */
    online: number;

    /** The maximum number of allowed players in the server. */
    max: number;
};

export interface MinecraftBedrockServerMOTDData {
    /** The raw MOTD with formatting codes. Refer to https://minecraft.fandom.com/wiki/Formatting_codes for information on how to use formatting codes. */
    raw: string;

    /** A clean text-only version of the MOTD with all formatting codes removed. */
    clean: string;

    /** An HTML representation of the MOTD with proper formatting. All formatting codes are supported and are equal to their value in the Minecraft fandom wiki. Magic/obfuscated formatting codes are a <span> with the class `.minecraft-format-obfuscated`. Line breaks are encoded as the "\n" escape code and may be replaced with <br> by the user. */
    html: string;
};