import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.userEntity.create({
      data: {
        ...dto,
        firstname: dto.firstname ?? null,
        lastname: dto.lastname ?? null,
      },
    });
  }

  findAll(filter?: { email?: string }) {
    return this.prisma.userEntity.findMany({
      where: {
        email: filter?.email ?? undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.userEntity.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.userEntity.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.userEntity.delete({ where: { id } });
    return { success: true };
  }
}
