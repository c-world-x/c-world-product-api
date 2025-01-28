import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";

import { PrismaService } from "services/prisma/prisma.service";

@Injectable()
export class ProductRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(params: { where: Prisma.ProductWhereUniqueInput }): Promise<Product | null> {
    const { where } = params;

    return this.prisma.product.findUnique({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async count(where?: Prisma.ProductWhereInput): Promise<number> {
    return this.prisma.product.count({ where });
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async update(params: { where: Prisma.ProductWhereUniqueInput; data: Prisma.ProductUpdateInput }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async updateMany(params: { where: Prisma.ProductWhereInput; data: Prisma.ProductUpdateInput }) {
    const { where, data } = params;
    return this.prisma.product.updateMany({
      where,
      data,
    });
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }

  async deleteMany(where: Prisma.ProductWhereInput) {
    return this.prisma.product.deleteMany({
      where,
    });
  }
}
