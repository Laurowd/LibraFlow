import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: {
        ...createAuthorDto,
        birthDate: createAuthorDto.birthDate
          ? new Date(createAuthorDto.birthDate)
          : undefined,
      },
    });
  }

  findAll(name?: string) {
    return this.prisma.author.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }
        : undefined,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.author.delete({
      where: { id },
    });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    await this.findOne(id);

    return this.prisma.author.update({
      where: { id },
      data: {
        ...updateAuthorDto,
        birthDate: updateAuthorDto.birthDate
          ? new Date(updateAuthorDto.birthDate)
          : undefined,
      },
    });
  }
}
