import { Module } from "@nestjs/common";

import { NotificationModule } from "modules/notification/notification.module";
import { OrderRepo } from "modules/order/order.repo";
import { OrderService } from "modules/order/order.service";
import { PrismaModule } from "services/prisma/prisma.module";

@Module({
  imports: [PrismaModule, NotificationModule],
  controllers: [],
  providers: [OrderService, OrderRepo],
  exports: [OrderService],
})
export class OrderModule {}
