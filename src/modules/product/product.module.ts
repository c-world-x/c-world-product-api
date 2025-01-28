import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";

import { CommentModule } from "modules/product/comment/comment.module";
import { ProductController } from "modules/product/product.controller";
import { ProductRepo } from "modules/product/product.repo";
import { ProductService } from "modules/product/product.service";
import { PrismaModule } from "services/prisma/prisma.module";
import { RedisModule } from "services/redis/redis.module";

const routes: Routes = [
  {
    path: "/products/:productId",
    children: [
      {
        path: "/",
        module: CommentModule,
      },
    ],
  },
];

@Module({
  imports: [PrismaModule, RedisModule, RouterModule.register(routes)],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo],
  exports: [ProductService],
})
export class ProductModule {}
