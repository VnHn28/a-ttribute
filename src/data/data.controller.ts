import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDataDto } from './dto/create-data.dto';
import { UpdateDataDto } from './dto/update-data.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(@Body() userId:string, dto: CreateDataDto) {

    return this.dataService.create(userId, dto);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.dataService.findAll({ userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDataDto) {
    return this.dataService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
