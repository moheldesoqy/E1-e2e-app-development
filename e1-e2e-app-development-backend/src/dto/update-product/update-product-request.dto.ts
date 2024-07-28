import { IsOptional } from 'class-validator';

export class UpdateProductRequestDto {
  id: string;
  @IsOptional()
  name?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  imageUrl?: string;
}
