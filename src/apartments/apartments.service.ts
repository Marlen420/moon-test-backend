import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { stringify } from "querystring";
import { CreateApartmentDto } from "./dto/createApartment.dto";
import { UpdateApartmentDto } from "./dto/updateApartment.dto";
import { Apartment } from "./schemas/apartment.schema";

export class ApartmentsService {
    constructor(
        @InjectModel(Apartment.name)
        private readonly apartmentModel: Model<Apartment>
    ) {}

    async findAll(): Promise<Apartment[]> {
        return this.apartmentModel.find();
    }

    async findById(id: string): Promise<Apartment> {
        return this.apartmentModel.findOne({_id: id});
    }

    async createApartment(data: CreateApartmentDto): Promise<Apartment> {
        const apartment = new this.apartmentModel(data);
        return new this.apartmentModel(data).save();
    }

    async updateApartment(id: string, data: UpdateApartmentDto): Promise<Apartment> {
        return this.apartmentModel.findOneAndUpdate({_id: id}, data, { new: true});
    }

    async deleteApartmentById(id: string): Promise<Apartment> {
        return this.apartmentModel.findOneAndDelete({_id: id});
    }

}