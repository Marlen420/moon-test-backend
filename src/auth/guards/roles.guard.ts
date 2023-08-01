
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { JwtService } from '@nestjs/jwt'

interface UserToken {
    role: Role;
    [key: string]: any;
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
    (Role | 'ALL')[]
    >(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    try {
        const { headers }: Request = context.switchToHttp().getRequest();
        const token: string = headers.authorization.split(' ')[1];
        const decodedToken = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        }) as UserToken;
        return requiredRoles.some(
          (role) => role === 'ALL' || role === decodedToken.role,
        );
        return true;
    } catch (err) {
        throw new UnauthorizedException();
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
