import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto, userId: number) {
    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        userId,
      },
    });
  }

  async getProducts() {
    return this.prismaService.product.findMany();
  }
}
