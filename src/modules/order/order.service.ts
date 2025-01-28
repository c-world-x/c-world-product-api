import { Injectable, NotFoundException } from "@nestjs/common";
import { NotiType, Prisma } from "@prisma/client";

import { CreateNotiRequestDTO } from "modules/notification/notification.dto";
import { NotificationService } from "modules/notification/notification.service";
import { CreateRequestDTO } from "modules/order/order.dto";
import { OrderRepo } from "modules/order/order.repo";
import { MESSAGES } from "shared/constants/messages.constants";

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepo, private readonly notiService: NotificationService) {}

  async getList() {
    return this.orderRepo.findAll({});
  }

  count() {
    return this.orderRepo.count({});
  }

  async create(body: CreateRequestDTO) {
    const { userId, orderProducts } = body;

    const totalAmount = 100; // todo: calc total amount

    const dataToCreate: Prisma.OrderUncheckedCreateInput = {
      userId,
      totalAmount,
      OrderProduct: {
        createMany: {
          data: orderProducts,
        },
      },
    };

    const order = await this.orderRepo.create(dataToCreate);

    const notiDataToCreate: CreateNotiRequestDTO = {
      content: "New order success",
      receiverId: userId,
      type: NotiType.OrderSuccess,
    };

    if (order) this.notiService.create(notiDataToCreate);
  }

  private async checkExistingById(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException({
        message: MESSAGES.NOT_FOUND_ORDER,
      });
    }

    return order;
  }
}
