import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll(clientId?: string) {
    return this.prisma.project.findMany({
      where: clientId ? { clientId } : undefined,
      include: { client: { select: { id: true, name: true, company: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { client: true },
    });
    if (!project) throw new NotFoundException('Projeto nao encontrado');
    return project;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: dto, include: { client: true } });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto, include: { client: true } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.project.delete({ where: { id } });
  }
}
