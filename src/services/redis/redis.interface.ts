import { Cache, Store } from "cache-manager";
import { RedisClientType } from "redis";

export interface RedisCache extends Cache<RedisStore> {
  store: RedisStore;
}

export interface RedisStore extends Store {
  name: "redis";
  getClient: () => RedisClientType;
}
