import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'clients', version: '1' })
export class ClientsController {
  constructor(private clients: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search?: string) { return this.clients.findAll(search); }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID (com projetos)' })
  findOne(@Param('id') id: string) { return this.clients.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Criar novo cliente' })
  create(@Body() dto: CreateClientDto) { return this.clients.create(dto); }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) { return this.clients.update(id, dto); }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover cliente' })
  remove(@Param('id') id: string) { return this.clients.remove(id); }
}
