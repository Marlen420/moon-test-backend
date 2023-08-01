import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signin')
    async signin(@Body() { login, password }): Promise<any> {
        return this.authService.signin(login, password);
    }
}