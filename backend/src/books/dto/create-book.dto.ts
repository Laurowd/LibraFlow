import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'Clean Code',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: '9780134685991',
  })
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @ApiPropertyOptional({
    example: 'A book about clean code practices.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 2008,
  })
  @IsInt()
  @IsOptional()
  publishedYear?: number;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  totalCopies?: number;
}
