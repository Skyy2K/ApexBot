import chalk from "chalk";

export default new class {
    info(message: string) {
        console.info(`${chalk.blueBright("[INFO]")} ${message}`);
    };

    warn(message: string) {
        console.warn(`${chalk.yellowBright("[WARN]")} ${message}`);
    };

    error(message: string) {
        console.error(`${chalk.redBright("[ERROR]")} ${message}`);
    };
}