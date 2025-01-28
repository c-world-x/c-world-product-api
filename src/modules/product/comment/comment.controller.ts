import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateRequestDTO, ListRequestDTO } from "modules/product/comment/comment.dto";
import { CommentService } from "modules/product/comment/comment.service";

@ApiTags("Products")
@Controller("/comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("/")
  async create(@Body() body: CreateRequestDTO, @Param("productId") productId: number) {
    body.productId = productId;
    return this.commentService.create(body);
  }

  @Get("/")
  async getList(@Query() query: ListRequestDTO, @Param("productId") productId: number) {
    query.productId = productId;
    const comments = await this.commentService.getList(query);
    return { data: comments };
  }

  @Get("/count")
  async count() {
    return "this.productService.count(query)";
  }

  @Delete("/:commentId")
  async delete(@Param("productId") productId: number, @Param("commentId") commentId: number) {
    return this.commentService.delete({ productId, commentId });
  }

  @Get("/:id")
  async getOne() {
    return "product";
  }
}
