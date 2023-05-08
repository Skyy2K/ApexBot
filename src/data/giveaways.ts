import { Giveaway, GiveawayData, GiveawaysManager } from "discord-giveaways";
import { GiveawayModel } from "./models/Giveaway";

export class GiveawayManager extends GiveawaysManager {
    async getAllGiveaways(): Promise<Giveaway<any>[]> {
        return await GiveawayModel.find({});
    };

    async saveGiveaway(messageId: string, giveawayData: GiveawayData<any>): Promise<boolean> {
        await GiveawayModel.create(giveawayData);
        return true;
    };

    async editGiveaway(messageId: string, giveawayData: GiveawayData<any>): Promise<boolean> {
        await GiveawayModel.updateOne({ messageId}, giveawayData).exec();
        return true;
    };

    async deleteGiveaway(messageId: string): Promise<boolean> {
        await GiveawayModel.deleteOne({ messageId }).exec();
        return true;
    };
};