import { Logger } from "@nestjs/common/services";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { stringify } from "querystring";
import { CreateApartmentDto } from "./dto/createApartment.dto";
import { UpdateApartmentDto } from "./dto/updateApartment.dto";
import { Apartment } from "./schemas/apartment.schema";
import { GetApartmentQueryDto } from "./dto/getApartmentQuery.dto";

export class ApartmentsService {
    private logger = new Logger();
    constructor(
        @InjectModel(Apartment.name)
        private readonly apartmentModel: Model<Apartment>
    ) {}

    async findAll(queryData: GetApartmentQueryDto): Promise<Apartment[]> {
        return this.apartmentModel.find(queryData);
    }

    async findById(id: string): Promise<Apartment> {
        return this.apartmentModel.findOne({_id: id});
    }

    async createApartment(data: CreateApartmentDto): Promise<Apartment> {
        try {
            const apartment = new this.apartmentModel(data);
            return apartment.save();
        } catch (err){
            this.logger.error('Не удалось создать квартиру', err);
            throw err;
        }
    }

    async updateApartment(id: string, data: UpdateApartmentDto): Promise<Apartment> {
        try {
            return this.apartmentModel.findOneAndUpdate({_id: id}, data, { new: true});
        } catch (err) {
            this.logger.error('Не удалось обновить квартиру', err);
            throw err;
        }
    }

    async deleteApartmentById(id: string): Promise<Apartment> {
        return this.apartmentModel.findOneAndDelete({_id: id});
    }

}