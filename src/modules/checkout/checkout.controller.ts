import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { HasRoles } from "modules/auth/auth.has-roles.decorator";
import { CheckoutService } from "modules/checkout/checkout.service";
import { Role } from "shared/constants/global.constants";

@ApiTags("Checkout")
@Controller("checkout")
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post("/")
  @HasRoles(Role.PUBLIC)
  async getList(@Body() body: any) {
    // todo: create dto
    const products = await this.checkoutService.checkout();
    return { data: products };
  }
}
