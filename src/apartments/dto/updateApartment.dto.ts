import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateApartmentDto {
    @IsOptional()
    @IsString()
    client_name: string;
    @IsOptional()
    @IsString()
    location: string;
    @IsOptional()
    @IsString()
    area: number;
    @IsOptional()
    @IsNumber()
    price: number;
    @IsOptional()
    @IsNumber()
    floor: number;
}