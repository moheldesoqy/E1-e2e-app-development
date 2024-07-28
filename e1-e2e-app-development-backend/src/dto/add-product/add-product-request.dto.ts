import { IsNumber, IsString } from "class-validator";

export class AddProductRequestDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsString()
    imageUrl: string;
}