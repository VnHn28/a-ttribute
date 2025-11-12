import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// This enum should be kept in sync with your prisma/schema.prisma
export enum Category {
  FOOD = 'FOOD',
  TRANSPORTATION = 'TRANSPORTATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  UTILITIES = 'UTILITIES',
  HOUSING = 'HOUSING',
  HEALTHCARE = 'HEALTHCARE',
  SALARY = 'SALARY',
  FREELANCE = 'FREELANCE',
  INVESTMENT = 'INVESTMENT',
  OTHER = 'OTHER',
}

export class CreateDataDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}