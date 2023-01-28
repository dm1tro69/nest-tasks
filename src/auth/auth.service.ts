import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs'
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async createUser(dto: AuthDto):Promise<User>{
     const {username, password} = dto
     const hashPassword = await bcrypt.hash(password, 10)
      const user = {
       username,
        password: hashPassword
      }
      return this.prisma.user.create({data: user})


  }
  async login(dto: AuthDto){
    const {username, password} = dto
     const user = await this.prisma.user.findUnique({where: { username}})
    if (!user){
      throw new UnauthorizedException()
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword){
      throw new UnauthorizedException()
    }
    const payload: JwtPayload = {username}
    const accessToken = await this.jwtService.sign(payload)
    delete user.password
    return {accessToken }
  }
}
