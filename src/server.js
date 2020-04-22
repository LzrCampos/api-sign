const app = require('./app');

const server = app.server;
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`App running in port ${port}`);
});
