const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
// const redis = new Redis({
//     host: '127.0.0.1',
//     port: 6379
// });

module.exports = redis