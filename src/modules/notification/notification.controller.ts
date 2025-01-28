import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { HasRoles } from "modules/auth/auth.has-roles.decorator";
import { NotificationService } from "modules/notification/notification.service";
import { Role } from "shared/constants/global.constants";

@ApiTags("Orders")
@Controller("orders")
export class NotificationController {
  constructor(private readonly notiService: NotificationService) {}

  @Get("/")
  @HasRoles(Role.PUBLIC)
  async getList() {
    const products = await this.notiService.getList();
    return { data: products };
  }

  @Get("/count")
  @HasRoles(Role.PUBLIC)
  async count() {
    return this.notiService.count();
  }

  @Get("/:id")
  @HasRoles(Role.PUBLIC)
  async getOne() {
    return "notification";
  }
}
