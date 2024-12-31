'use strict'

const app = require('./src/app');
const PORT = process.env.PORT_WS;
const server = app.listen(PORT, () => {
    console.log(`*****Application server starting on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log(`*****Application server exit ...................`);
    });
})