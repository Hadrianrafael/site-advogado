import { IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectType, ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty() @IsString() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ enum: ProjectType }) @IsEnum(ProjectType) type: ProjectType;
  @ApiPropertyOptional({ enum: ProjectStatus }) @IsOptional() @IsEnum(ProjectStatus) status?: ProjectStatus;
  @ApiPropertyOptional({ example: 'https://meusite.com.br' }) @IsOptional() @IsUrl() url?: string;
  @ApiPropertyOptional({ example: 'https://github.com/user/repo' }) @IsOptional() @IsUrl() repoUrl?: string;
  @ApiProperty({ description: 'ID do cliente' }) @IsString() clientId: string;
}
