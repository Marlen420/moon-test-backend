import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDto {
    @IsString()
    fullname: string;
    
    @IsPhoneNumber('KG')
    phone_number: string;

    @IsEmail()
    email: string;
}