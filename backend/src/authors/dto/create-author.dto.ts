import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Robert C. Martin' })
  name!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'American software engineer and author' })
  biography?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({ example: '1952-01-01' })
  birthDate?: string;
}
