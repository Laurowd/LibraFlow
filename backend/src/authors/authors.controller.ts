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
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @ApiOperation({ summary: 'List all authors, optionally filtered by name' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter authors by name',
  })
  @Get()
  findAll(@Query('name') name?: string) {
    return this.authorService.findAll(name);
  }

  @ApiOperation({ summary: 'Create a new author' })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Author ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the author to delete',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }

  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the author to update',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }
}
