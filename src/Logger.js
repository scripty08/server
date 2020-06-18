import log4js from 'log4js';
import fs from 'fs';
import path from 'path';

export class Logger {
    static async init() {

        const rootDir = path.resolve("./");
        const configFile = fs.readFileSync(rootDir + '/config.json', "utf8");
        const parsedConfig = JSON.parse(configFile);
        const { logger } = parsedConfig;
        const { logPrefix, logLevel = 'WARN' } = logger;

        if (!global.logger) {
            const prefix = logPrefix ? `[${logPrefix}] ` : '';

            log4js.configure({
                appenders: {
                    out: {
                        type: 'stdout',
                        layout: {
                            type: 'pattern',
                            pattern: `%d{dd.MM.yyyy hh:mm:ss} ${prefix}[%p] - %m`
                        }
                    }
                },
                categories: {
                    default: {
                        appenders: ['out'],
                        level: logLevel
                    }
                }
            });

            global.logger = log4js.getLogger(prefix);
        }
    }

    static warn(msg) {
        this.init();
        return global.logger.warn(msg);
    }

    static error(msg) {
        this.init();
        return global.logger.error(msg);
    }

    static info(msg) {
        this.init();
        return global.logger.info(msg);
    }

    static trace(msg) {
        this.init();
        return global.logger.trace(msg);
    }

    static debug(msg) {
        this.init();
        return global.logger.debug(msg);
    }

    static fatal(msg) {
        this.init();
        return global.logger.fatal(msg);
    }
}
