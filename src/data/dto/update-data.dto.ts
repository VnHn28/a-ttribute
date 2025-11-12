import { CreateDataDto } from './create-data.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateDataDto extends PartialType(CreateDataDto) {}
