import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { GetListDto } from "src/shared/dto/getList.dto";

export class GetApartmentQueryDto extends GetListDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  area: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  client_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;
  
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  floor: number;
}