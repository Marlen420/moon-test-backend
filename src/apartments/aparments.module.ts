import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ApartmentsController } from "./apartments.controller";
import { ApartmentsService } from "./apartments.service";
import { ApartmentEntity } from "./schemas/apartment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([ApartmentEntity])
    ],
    controllers: [ApartmentsController],
    providers: [ApartmentsService],
})
export class ApartmentsModule {}