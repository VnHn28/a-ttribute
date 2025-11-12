import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Injectable()
export class DataService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateDataDto) {
    return this.prisma.dataEntity.create({
      data: {
        userId,
        ...dto,
      },
    });
  }

  findAll(filter?: { userId?: string }) {
    return this.prisma.dataEntity.findMany({
      where: {
        userId: filter?.userId ?? undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.dataEntity.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException('DataEntity not found');
    }
    return item;
  }

  async update(id: string, dto: UpdateDataDto) {
    await this.findOne(id);
    return this.prisma.dataEntity.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.dataEntity.delete({ where: { id } });
    return { success: true };
  }
}
