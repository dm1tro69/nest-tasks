import {Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TasksDto } from "./dto/tasks.dto";
import { Tasks } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {
  }
  async getAllTasks(): Promise<Tasks[]>{
    return this.prisma.tasks.findMany()
  }

  async getTasksById(id: number): Promise<Tasks>{
    return this.prisma.tasks.findUnique({where: {id}})
  }

  async createTask(dto: TasksDto): Promise<Tasks>{
    return this.prisma.tasks.create({data: dto})
  }

  async deleteTask(id: number): Promise<Tasks>{
     return this.prisma.tasks.delete({where: {id}})
  }

  async updateTaskStatus(id: number, dto: TasksDto): Promise<Tasks>{
      return this.prisma.tasks.update({where: {id}, data: dto})
  }
}
