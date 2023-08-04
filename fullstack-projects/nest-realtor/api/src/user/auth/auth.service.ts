import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

interface SignupParams {
  email: string;
  name: string;
  phone: string;
  password: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup(
    { email, password, phone, name }: SignupParams,
    userType: UserType
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email: email
      }
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        phone,
        user_type: userType
      }
    });

    return await this.generateJWT(user.name, user.id);
  }
  async signin({ email, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email
      }
    });
    if (!user) throw new HttpException('Invalid credentials', 400);

    const hashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordCorrect) throw new HttpException('Invalid credentials', 400);

    return await this.generateJWT(user.name, user.id);
  }
  private async generateJWT(name: string, id: number) {
    const token = jwt.sign(
      {
        name,
        id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600000
      }
    );
    return token;
  }

  generateProductKey(email: string, userType: UserType) {
    const string = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hash(string, 10);
  }
}
