import { Model, UpdateQuery } from 'mongoose';
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserEntity } from "./schemas/user.schema";
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly userModel: Model<User>
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async findManagers(): Promise<User[]> {
        return this.userModel.find({role: 'manager'});
    }

    async findById(id: string): Promise<User> {
        return this.userModel.findOne({_id: id});
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({email});
    }

    async findByPhone(phone: string): Promise<User> {
        return this.userModel.findOne({phone_number: phone});
    }

    async createUser(data: CreateUserDto): Promise<Partial<User>> {
        const filter = {
            $or: [
                {email: data.email}, 
                {phone_number: data.phone_number}
            ]
        };
        const user: User = await this.userModel.findOne(filter);
        if (user) {
            throw new BadRequestException('Пользователь уже зарегистрирован');
        }
        data.password = await bcrypt.hash(data.password, 12);
        return new this.userModel(data).save().then((savedUser) => {
            const { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        });
    }

    async updateById(id: string, data: UpdateUserDto): Promise<Partial<User>> {
        const user: User = await this.userModel.findOne({_id: id});
        if (!user) {
            throw new BadRequestException('Пользователь не найден');
        }
        return this.userModel.findOneAndUpdate({_id: id}, data, { new: true }).then((savedUser) => {
            const  { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        });
    }

    async deleteById(id: string): Promise<Partial<User>> {
        console.log(id);
        return this.userModel.findOneAndDelete({_id: id}).then((deletedUser) => {
            const { password, ...userWithoutPassword } = deletedUser;
            return userWithoutPassword;
        })
    }
}