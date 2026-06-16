import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  isbn!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  publishedYear?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalCopies?: number;
}
