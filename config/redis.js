const Redis = require('ioredis');
const fs = require('fs');

// const redis = new Redis({
//     host: 'redis-14489.c54.ap-northeast-1-2.ec2.cloud.redislabs.com',
//     port: 14489,
//     password: 'kBJ1QM71st0DbSvw2VFnXyxTQVSKOt5S'
// });
const redis = new Redis({
    host: '127.0.0.1',
    port: 6379
});

module.exports = redis