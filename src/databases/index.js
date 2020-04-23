const mongoose = require('mongoose');

const { mongoose: mongooseConfig } = require('../config/mongo');

class Database {
    constructor() {
        this.mongodb = this.mongooseConnection();
    }

    mongooseConnection() {
        try {
            const { host, port, db, user, pass } = mongooseConfig;
            return mongoose.connect(
                `mongodb://${user}:${pass}@${host}:${port}/${db}`,
                {
                    useNewUrlParser: true,
                }
            );
        } catch (error) {
            console.error('error:', error);
            return false;
        }
    }
}

module.exports = new Database();
