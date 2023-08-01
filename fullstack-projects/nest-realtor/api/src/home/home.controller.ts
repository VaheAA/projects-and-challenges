import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeResponseDto } from './dtos/home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}
  @Get()
  async getHomes(): Promise<HomeResponseDto[]> {
    return await this.homeService.getHomes();
  }

  @Get(':id')
  async getHomeById() {
    return {};
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
