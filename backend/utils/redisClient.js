const redis = require('redis');
const { promisify } = require('util');
const logger = require('../utils/logger');

const client = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
});

client.on('connect', () => {
    logger.info('Connected to Redis...');
});

client.on('error', (err) => {
    logger.error('Redis error:', err);
});

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);
client.incrAsync = promisify(client.incr).bind(client);
client.expireAsync = promisify(client.expire).bind(client);
client.delAsync = promisify(client.del).bind(client);
client.lpushAsync = promisify(client.lpush).bind(client);
client.lrangeAsync = promisify(client.lrange).bind(client);

module.exports = client;

