const { createClient } = require("redis");

let redisClient;

const connectRedis = async () => {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  });

  redisClient.on("error", (err) =>
    console.error("Redis Client Error", err)
  );

  try {
    await redisClient.connect();
    console.log("Redis Connected ✅");
  } catch (err) {
    console.error("Redis connection failed:", err.message);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };