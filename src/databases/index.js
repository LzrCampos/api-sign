const mongoose = require('mongoose');

const { mongoose: mongooseConfig } = require('../config/mongo');

class Database {
    constructor() {
        this.mongodb = this.mongooseConnection();
    }

    mongooseConnection() {
        try {
            const { host, db, user, pass } = mongooseConfig;
            return mongoose.connect(
                `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            );
        } catch (error) {
            console.error('error:', error);
            return false;
        }
    }
}

module.exports = new Database();
