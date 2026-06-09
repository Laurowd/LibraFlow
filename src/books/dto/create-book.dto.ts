export class CreateBookDto {
  title!: string;
  isbn!: string;
  description?: string;
  publishedYear?: number;
  totalCopies?: number;
}
