import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'The ID of the user',
    example: 2324,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
