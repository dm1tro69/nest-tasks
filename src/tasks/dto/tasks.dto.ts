import { IsString } from "class-validator";

export class TasksDto {

  @IsString()
  title: string

  @IsString()
  description:string
}
