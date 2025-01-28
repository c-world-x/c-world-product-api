import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CountRequestDTO, ListRequestDTO } from "modules/product/product.dto";
import { ProductService } from "modules/product/product.service";

@ApiTags("Products")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  async getList(@Query() query: ListRequestDTO) {
    const products = await this.productService.getList(query);
    return { data: products };
  }

  @Get("/count")
  async count(@Query() query: CountRequestDTO) {
    return this.productService.count(query);
  }

  @Get("/:id")
  async getOne() {
    return "product";
  }
}
