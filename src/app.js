require('./config/dotenv');
require('./databases');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(helmet());
        this.server.use(cors());

        // if (process.env.NODE_ENV === 'development') this.server.use(...swagger);
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App();
