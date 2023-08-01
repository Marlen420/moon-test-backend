import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListDto {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Type(() => Number)
  page = 1;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  limit = 20;
}
