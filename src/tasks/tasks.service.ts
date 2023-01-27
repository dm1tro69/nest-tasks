import {Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TasksDto } from "./dto/tasks.dto";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {
  }
  getAllTasks(){

  }

  getTasksById(id: number){

  }

  createTask(dto: TasksDto){

  }

  deleteTask(id: number){

  }

  updateTaskStatus(id: number, dto: TasksDto){

  }
}
