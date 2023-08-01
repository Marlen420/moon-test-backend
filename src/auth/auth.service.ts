import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async signin(login: string, password: string): Promise<any> {
        const user: User = this.isEmail(login)
        ? await this.usersService.findByEmail(login)
        : await this.usersService.findByPhone(login);
        
        if (user) {
            const passwordValid = await bcrypt.compare(password, user.password);
            if (passwordValid) {
                delete user.password;
                return { access_token: this.jwtService.sign({ ...user }) };
            }
        }
        throw new BadRequestException('Неправильный логин или пароль');
    }

    private isEmail(login: string): boolean {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (reg.test(login)) {
        return true;
        }
        return false;
    } 
}