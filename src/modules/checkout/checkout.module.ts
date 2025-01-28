import { Module } from "@nestjs/common";

import { CheckoutController } from "modules/checkout/checkout.controller";
import { CheckoutService } from "modules/checkout/checkout.service";
import { OrderModule } from "modules/order/order.module";
import { PrismaModule } from "services/prisma/prisma.module";
import { RedisModule } from "services/redis/redis.module";

@Module({
  imports: [PrismaModule, RedisModule, OrderModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [],
})
export class CheckoutModule {}
