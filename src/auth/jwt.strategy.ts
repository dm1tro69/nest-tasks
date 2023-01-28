import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";
import { JwtPayload } from "./dto/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKey: 'qwerty',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }
  async validate(payload: JwtPayload){
    const {username} = payload
    const user = await this.prisma.user.findUnique({where: {username}})
    if (!user){
      throw new UnauthorizedException()
    }
    return user
  }
}
