import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dtos/home.dto';
import { PropertyType } from '@prisma/client';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  async getHomes(
    @Query()
    query: {
      city?: string;
      minPrice?: string;
      maxPrice?: string;
      propertyType?: PropertyType;
    }
  ): Promise<HomeResponseDto[]> {
    const { minPrice, maxPrice, city, propertyType } = query;

    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) })
          }
        : undefined;

    const filters = {
      ...(city && { city }),
      price: price,
      ...(propertyType && { propertyType })
    };
    return await this.homeService.getHomes(filters);
  }

  @Get(':id')
  async getHomeById(@Param('id', ParseIntPipe) id: number) {
    return await this.homeService.getHomeById(id);
  }

  @Post()
  async createHome() {
    return {};
  }

  @Put(':id')
  async updateHome() {
    return {};
  }

  @Delete(':id')
  async deleteHome() {
    return {};
  }
}
