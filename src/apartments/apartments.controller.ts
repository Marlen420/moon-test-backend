import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApartmentsService } from "./apartments.service";
import { CreateApartmentDto } from "./dto/createApartment.dto";
import { UpdateApartmentDto } from "./dto/updateApartment.dto";
import { Apartment } from "./schemas/apartment.schema";
import { ApiTags } from "@nestjs/swagger";
import { GetApartmentQueryDto } from "./dto/getApartmentQuery.dto";

@ApiTags('Apartments')
@Controller('apartments')
export class ApartmentsController {
    constructor(
        private readonly apartmentsService: ApartmentsService
    ) {}

    @Get()
    async findAll(@Query() queryData: GetApartmentQueryDto): Promise<Apartment[]> {
        return this.apartmentsService.findAll(queryData);
    }

    @Get(':id')
    async findById(@Param('id')id: string): Promise<Apartment> {
        return this.apartmentsService.findById(id);
    }
    
    @Post()
    async createApartment(@Body() data: CreateApartmentDto): Promise<Apartment> {
        return this.apartmentsService.createApartment(data);
    }

    @Patch(':id')
    async updateApartment(@Param('id') id: string, @Body() data: UpdateApartmentDto): Promise<Apartment> {
        return this.apartmentsService.updateApartment(id, data);
    }

    @Delete(':id')
    async deleteApartmentById(@Param('id') id: string): Promise<Apartment> {
        return this.apartmentsService.deleteApartmentById(id);
    }
}