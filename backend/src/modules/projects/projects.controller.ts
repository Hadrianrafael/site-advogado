import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'projects', version: '1' })
export class ProjectsController {
  constructor(private projects: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar projetos (filtrar por clientId)' })
  @ApiQuery({ name: 'clientId', required: false })
  findAll(@Query('clientId') clientId?: string) { return this.projects.findAll(clientId); }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar projeto por ID' })
  findOne(@Param('id') id: string) { return this.projects.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Criar projeto para um cliente' })
  create(@Body() dto: CreateProjectDto) { return this.projects.create(dto); }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar projeto' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) { return this.projects.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover projeto' })
  remove(@Param('id') id: string) { return this.projects.remove(id); }
}
