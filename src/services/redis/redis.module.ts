import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { RedisClientOptions } from "redis";
import { redisStore } from "cache-manager-redis-store";

import { RedisService } from "services/redis/redis.service";

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore as never,
      url: "redis://127.0.0.1:6379",

      database: 0,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
