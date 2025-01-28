import { Module } from "@nestjs/common";

import { NotificationController } from "modules/notification/notification.controller";
import { NotificationRepo } from "modules/notification/notification.repo";
import { NotificationService } from "modules/notification/notification.service";
import { PrismaModule } from "services/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepo],
  exports: [NotificationService],
})
export class NotificationModule {}
