import { Body, Controller, Delete, Get, Param, Patch, Post, UseFilters, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { PrismaClientExceptionFilter } from "../prisma-client-exception.filter";
import { TasksDto } from "./dto/tasks.dto";
import { Tasks} from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";

@Controller('tasks')
@UseFilters(PrismaClientExceptionFilter)
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(){
    return this.tasksService.getAllTasks()
  }


  @Get(':id')
  getTasksById(@Param('id') id: number){
    return this.tasksService.getTasksById(id)
  }

  @Post()
  createTask(@Body() dto: TasksDto){
    return this.tasksService.createTask(dto)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number){
    return this.tasksService.deleteTask(id)
  }

  @Patch(':id')
  updateTaskStatus(@Param('id') id: number, @Body() dto: Tasks){
    return this.tasksService.updateTaskStatus(+id, dto)
  }
}
