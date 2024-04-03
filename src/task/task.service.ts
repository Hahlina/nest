import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  private TASKS = [
    {
      id: 1,
      name: 'Task 1',
      isDone: false,
    },
  ];

  getAll() {
    return this.prisma.task.findMany();
  }

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        name: createTaskDto.name,
      },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: +id,
      },
    });
    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async toggleDone(id: number) {
    const task = await this.findOne(id);
    return this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        isDone: !task.isDone,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
