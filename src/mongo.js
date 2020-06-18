import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Logger } from '../logger';

dotenv.config();

const {
    MONGO_DB: db,
    MONGO_SERVER: server,
    MONGO_USER: user,
    MONGO_PASSWORD: password,
    MONGO_PORT: port
} = process.env;

const config = {
    db,
    server,
    user,
    password,
    port: Number(port),
    options: {
        encrypt: true
    }
};

let connection;

const setConnection = (connections) => {
    connection = connections;
};

export const getConnection = () => {
    if (typeof connection === 'undefined') {

        const connectionUrl = `mongodb://${config.user}:${config.password}@${config.server}/${config.db}`;

        return new Promise((resolve, reject) => {

            const options = {
                autoIndex: false, // Don't build indexes
                reconnectTries: Number.MAX_VALUE, // Retry up to 30 times
                reconnectInterval: 500, // Reconnect every 500ms
                poolSize: 10, // Maintain up to 10 socket connections
                bufferMaxEntries: 0
            };

            mongoose.connection.on('error', function(err){
                Logger.error(`${connectionUrl} error: ${err}`);
            });

            mongoose.connection.on('disconnected', function(){
                Logger.info('mongoose default connection is disconnected');
                setTimeout(connectWithRetry, 5000);
            });

            mongoose.connection.on('connected', function(){
                Logger.info('mongoose default connection is open');
            });

            mongoose.connection.on('reconnected', function () {
                Logger.info('mongoose reconnected!');
            });

            const connectWithRetry = () => {
                setConnection(mongoose.connect(connectionUrl, options).then((rec) => {
                    Logger.info('mongoose is connected!');
                    resolve(rec);
                }).catch(err=>{
                    Logger.error('mongoose connection unsuccessful, retry after 5 seconds.');
                    resolve(false);
                    setTimeout(connectWithRetry, 5000);
                }));
            };

            connectWithRetry()
        })

    } else {
        return connection;
    }
};
