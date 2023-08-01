import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/auth/enums/role.enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    fullname: string;
    @Prop({ required: true, unique: true })
    phone_number: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ type: Date, default: Date.now})
    created_at: Date;
    @Prop({ required: true })
    password: string;
    @Prop({ default: 0 })
    deal_amount: number;
    @Prop({enum: Role, default: Role.manager})
    role: Role;
}

const UserSchema = SchemaFactory.createForClass(User);
export const UserEntity = { name: User.name, schema: UserSchema };