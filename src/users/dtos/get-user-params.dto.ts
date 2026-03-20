import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    example: 2324,
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
