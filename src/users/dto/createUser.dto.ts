import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;
    
    @IsNotEmpty()
    @IsPhoneNumber('KG')
    phone_number: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}