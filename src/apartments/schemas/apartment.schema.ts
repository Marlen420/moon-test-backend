import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ApartmentStatus } from "../enums/apartmentStatus.enum";

export type ApartmentDocument = HydratedDocument<Apartment>;

@Schema()
export class Apartment {
    @Prop({ required: true })
    price: number;
    @Prop( {required: false })
    client_name: string;
    @Prop( {required: false })
    client_phone: string;
    @Prop({ enum: ApartmentStatus, default: ApartmentStatus.active})
    status: ApartmentStatus
    @Prop({ type: Date, default: Date.now})
    created_at: Date;
    @Prop( { required: true })
    area: string;
    @Prop({ required: true })
    floor: number;
    @Prop({ required: true })
    location: string;
    @Prop({ default: 4})
    number: number;
    @Prop({ nullable: true, default: null })
    status_info: string;
    @Prop({ required: false })
    deal_number: string;

}

const ApartmentSchema = SchemaFactory.createForClass(Apartment);
export const ApartmentEntity = { name: Apartment.name, schema: ApartmentSchema };