import { TokenPayload } from './../auth/token-payload.interface';
import { CurrentUser } from './../auth/current-user.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
