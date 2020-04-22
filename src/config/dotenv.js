const { resolve } = require('path');

const dotenv = require('dotenv').config({
    path:
        process.env.NODE_ENV === 'test'
            ? resolve(process.cwd(), '.env.test')
            : resolve(process.cwd(), '.env'),
});

module.exports = dotenv;
