module.exports = {
    mongoose: {
        host: process.env.MONGOOSE_HOST,
        port: process.env.MONGOOSE_PORT,
        db: process.env.MONGOOSE_DATABASE,
        authSource: process.env.MONGOOSE_AUTH_SOURCE,
        user: process.env.MONGOOSE_USER,
        pass: process.env.MONGOOSE_PASSWORD,
    },
};
