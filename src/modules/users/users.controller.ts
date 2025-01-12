/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //   @Get()
  //   async getAllUsers(): Promise<User[]> {
  //     return this.usersService.getAllUsers();
  //   }

  @Get()
  async getUsers(@Query() filters: any): Promise<{users: User[], count: number, page: number}> {

      console.log("Filters received:", filters);

  // Если filters уже объект, JSON.parse не нужен
      if (typeof filters === 'string') {
        filters = JSON.parse(filters); // Парсим только строку
      }

    return this.usersService.getFilteredUsers(filters);
  }
  
  @Get(':id')
  async getUsersById(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

}
