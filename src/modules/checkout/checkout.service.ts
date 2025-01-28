import { Injectable } from "@nestjs/common";

import { CreateRequestDTO } from "modules/order/order.dto";
import { OrderService } from "modules/order/order.service";
import { RedisService } from "services/redis/redis.service";

@Injectable()
export class CheckoutService {
  constructor(private readonly redisService: RedisService, private readonly orderService: OrderService) {}

  async checkout() {
    const productId = 1;
    // acquire product lock
    const lock = await this.redisService.acquireProductLock(productId);

    // todo: update quantity and create order
    const orderBody: CreateRequestDTO = {
      userId: 1,
      orderProducts: [{ productId, quantity: 1 }],
    };

    await this.orderService.create(orderBody);
    // release product lock
    await this.redisService.releaseProductLock(lock);
  }
}
