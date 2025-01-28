import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "redis";

import { RedisCache } from "services/redis/redis.interface";

@Injectable()
export class RedisService {
  private _redisClient: RedisClientType;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: RedisCache) {
    this._redisClient = this.cacheManager.store.getClient();
  }

  public get redisClient() {
    return this._redisClient;
  }

  async acquireProductLock(productId: number) {
    const key = `lock_product_${productId}`;
    const retryTimes = 10;

    for (let i = 0; i < retryTimes; i++) {
      const result = await this._redisClient.setNX(key, "");
      if (result) {
        return key;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  }

  async releaseProductLock(lockKey: string) {
    return this._redisClient.del(lockKey);
  }
}
