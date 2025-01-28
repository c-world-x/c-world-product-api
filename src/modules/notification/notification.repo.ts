import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "services/prisma/prisma.service";

@Injectable()
export class NotificationRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(params: { where: Prisma.NotificationWhereUniqueInput }) {
    const { where } = params;

    return this.prisma.notification.findUnique({
      where,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NotificationWhereUniqueInput;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.notification.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async count(where?: Prisma.NotificationWhereInput) {
    return this.prisma.notification.count({ where });
  }

  async create(data: Prisma.NotificationUncheckedCreateInput) {
    return this.prisma.notification.create({
      data,
    });
  }

  async update(params: { where: Prisma.NotificationWhereUniqueInput; data: Prisma.NotificationUpdateInput }) {
    const { where, data } = params;
    return this.prisma.notification.update({
      data,
      where,
    });
  }

  async updateMany(params: { where: Prisma.NotificationWhereInput; data: Prisma.NotificationUpdateInput }) {
    const { where, data } = params;
    return this.prisma.notification.updateMany({
      where,
      data,
    });
  }

  async delete(where: Prisma.NotificationWhereUniqueInput) {
    return this.prisma.notification.delete({
      where,
    });
  }
}
