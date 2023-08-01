import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsEnum,
  IsOptional
} from 'class-validator';
import { UserType } from '@prisma/client';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @Matches(/^(091|094|094|033|095|098|096|095|043)\d{6}$/, {
    message: 'Phone must be a valid phone number'
  })
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(5)
  password: string;
  @IsOptional()
  productKey?: string;
}

export class SigninDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class ProductKeyDto {
  @IsEmail()
  email: string;
  @IsEnum(UserType)
  userType: UserType;
}
