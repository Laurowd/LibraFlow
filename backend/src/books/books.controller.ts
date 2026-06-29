import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @ApiOperation({ summary: 'List all books, optionally filtered by title' })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter books by title',
  })
  @Get()
  findAll(@Query('title') title?: string) {
    return this.booksService.findAll(title);
  }

  @ApiOperation({ summary: 'Create a new book' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Find a book by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the book to retrieve',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the book to delete',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the book to update',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }
}
