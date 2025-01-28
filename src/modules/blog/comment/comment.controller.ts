import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { HasRoles } from "modules/auth/auth.has-roles.decorator";
import { CountRequestDTO, ListRequestDTO } from "modules/product/product.dto";
import { ProductService } from "modules/product/product.service";
import { Role } from "shared/constants/global.constants";

@ApiTags("comments")
@Controller("products")
export class CommentController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  @HasRoles(Role.PUBLIC)
  async getList(@Query() query: ListRequestDTO) {
    const products = await this.productService.getList(query);
    return { data: products };
  }

  @Get("/count")
  @HasRoles(Role.PUBLIC)
  async count(@Query() query: CountRequestDTO) {
    return this.productService.count(query);
  }

  @Get("/:id")
  @HasRoles(Role.PUBLIC)
  async getOne() {
    return "product";
  }
}
