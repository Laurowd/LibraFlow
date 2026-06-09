import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany();
  }

  create(createBookDto: CreateBookDto) {
    const totalCopies = createBookDto.totalCopies ?? 1;

    return this.prisma.book.create({
      data: {
        ...createBookDto,
        totalCopies,
        availableCopies: totalCopies,
      },
    });
  }
}
