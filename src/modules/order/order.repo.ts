import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "services/prisma/prisma.service";

@Injectable()
export class OrderRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(params: { where: Prisma.OrderWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.order.findUnique({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async count(where?: Prisma.OrderWhereInput) {
    return this.prisma.order.count({ where });
  }

  async create(data: Prisma.OrderUncheckedCreateInput) {
    return this.prisma.order.create({
      data,
    });
  }

  async update(params: { where: Prisma.OrderWhereUniqueInput; data: Prisma.OrderUpdateInput }) {
    const { where, data } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async updateMany(params: { where: Prisma.OrderWhereInput; data: Prisma.OrderUpdateInput }) {
    const { where, data } = params;
    return this.prisma.order.updateMany({
      where,
      data,
    });
  }

  async delete(where: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.delete({
      where,
    });
  }
}
