import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { ProductService } from "modules/product/product.service";
import { CreateProductDto } from "modules/product/dto";

@ApiTags("Products")
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: "get-products" })
  getProducts() {
    return [1, 2, 3];
  }

  @MessagePattern({ cmd: "create-product" })
  createProduct(@Payload() data: CreateProductDto) {
    console.log("data", data);
    return true;
  }
}
