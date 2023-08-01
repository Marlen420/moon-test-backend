import { IsNumber, IsString } from "class-validator";

export class CreateApartmentDto {
    @IsString()
    client_name: string;
    @IsString()
    location: string;
    @IsString()
    area: number;
    @IsNumber()
    price: number;
    @IsNumber()
    floor: number;
}