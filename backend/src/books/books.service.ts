import 'dotenv/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
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

  findAll(title?: string) {
    return this.prisma.book.findMany({
      where: title
        ? {
            title: {
              contains: title,
              mode: 'insensitive',
            },
          }
        : undefined,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure the book exists before trying to delete it

    return this.prisma.book.delete({
      where: { id },
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id); // Ensure the book exists before trying to update it

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }
}
