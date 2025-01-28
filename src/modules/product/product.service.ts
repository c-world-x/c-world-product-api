import { Injectable, NotFoundException } from "@nestjs/common";

import { ListRequestDTO } from "modules/product/product.dto";
import { ProductRepo } from "modules/product/product.repo";
import { RedisService } from "services/redis/redis.service";
import { MESSAGES } from "shared/constants/messages.constants";

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo, private readonly redisService: RedisService) {}

  async getList(query: ListRequestDTO) {
    const res = await this.redisService.redisClient.hGetAll("bull:update-shipping-status:13525");
    console.log("🚀 ~ ProductService ~ getList ~ res:", res);
    console.log("🚀 ~ ProductService ~ getList ~ query:", query);
    return this.productRepo.findAll({});
  }

  count(query: ListRequestDTO) {
    console.log("🚀 ~ ProductService ~ getList ~ query:", query);
    return this.productRepo.count({});
  }

  private async checkExistingById(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException({
        message: MESSAGES.NOT_FOUND_PRODUCT,
      });
    }

    return product;
  }
}
