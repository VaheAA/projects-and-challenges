import {
  Body,
  Controller,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProductKeyDto, SigninDto, SignupDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDto,
    @Param('userType', new ParseEnumPipe(UserType)) userType: UserType
  ) {
    if (userType !== UserType.BUYER) {
      if (!body.productKey) throw new UnauthorizedException();

      const productKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
      const isValidproductKey = await bcrypt.compare(
        productKey,
        body.productKey
      );
      if (!isValidproductKey) throw new UnauthorizedException();
    }

    return await this.authService.signup(body, userType);
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto) {
    return await this.authService.signin(body);
  }

  @Post('/key')
  async generateProductKey(@Body() { email, userType }: ProductKeyDto) {
    return await this.authService.generateProductKey(email, userType);
  }
}
