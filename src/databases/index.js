const mongoose = require('mongoose');

const { mongoose: mongooseConfig } = require('../config/mongo');

class Database {
    constructor() {
        this.mongodb = this.mongooseConnection();
    }

    mongooseConnection() {
        try {
            const { host, port, db, authSource, user, pass } = mongooseConfig;
            return mongoose.connect(
                `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=${authSource}`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: true,
                    useCreateIndex: true,
                }
            );
        } catch (error) {
            console.error('error:', error);
            return false;
        }
    }
}

module.exports = new Database();
