require("dotenv").config();

import ApexBot from "./structures/ApexBot";
import config from "../config";

import mongoose from "mongoose";

export const client = new ApexBot();

mongoose.connect(config.mongoURI)
.then(() => client.logger.info(`Connected to the Database.`))
.catch((err) => client.logger.error(`Unable to connect to the database: ${err}`));

client.build();