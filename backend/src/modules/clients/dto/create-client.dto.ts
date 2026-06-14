import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateClientDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty({ example: 'cliente@empresa.com.br' }) @IsEmail() email: string;
  @ApiPropertyOptional({ example: '(11) 99999-9999' }) @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional({ example: 'Empresa LTDA' }) @IsOptional() @IsString() company?: string;
}
