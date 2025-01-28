import { Injectable } from "@nestjs/common";

import { CreateNotiRequestDTO } from "modules/notification/notification.dto";
import { NotificationRepo } from "modules/notification/notification.repo";

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepo: NotificationRepo) {}

  async getList() {
    return this.notificationRepo.findAll({});
  }

  count() {
    return this.notificationRepo.count({});
  }

  async create(body: CreateNotiRequestDTO) {
    return this.notificationRepo.create(body);
  }
}
