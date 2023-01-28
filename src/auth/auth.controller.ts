import { Body, Controller, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { PrismaClientExceptionFilter } from "../prisma-client-exception.filter";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
@UseFilters(PrismaClientExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() dto: AuthDto){
    return this.authService.createUser(dto)
  }

  @Post('login')
  login(@Body() dto: AuthDto){
    return this.authService.login(dto)
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req){
    console.log(req.user);
  }
}
