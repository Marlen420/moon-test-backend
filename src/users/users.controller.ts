import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UpdateQuery } from "mongoose";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    // @Roles(Role.manager)
    // @UseGuards(RolesGuard)
    // @Get()
    // async findAll(): Promise<User[]> {
    //     return this.usersService.findAll();
    // }

    @Get('managers')
    async findManagers(): Promise<User[]> {
        return this.usersService.findManagers();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(id);
    }

    @Post()
    async createUser(@Body() data: CreateUserDto): Promise<Partial<User>> {
        return this.usersService.createUser(data);
    }

    @Patch(':id')
    async updateById(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<Partial<User>> {
        return this.usersService.updateById(id, data);
    }


    @Delete(':id')
    async deleteById(@Param('id') id: string): Promise<Partial<User>> {
        return this.usersService.deleteById(id);
    }
}