/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getFilteredUsers(filters: any): Promise<User[]> {
    const query: any = {};

    // Фильтр по полу
    if (filters.male && filters.male !== 'all') {
      query.gender = filters.male;
    }

    // Фильтр по дате
    if (filters.date && filters.date[0] && filters.date[1]) {
      query.dob = {
        $gte: new Date(Number(filters.date[0])), // начало диапазона
        $lte: new Date(Number(filters.date[1])), // конец диапазона
      };
    }

    // Определение сортировки
    const sort: any = {};
    if (filters.column === 'name') {
      sort.firstName = filters.sort === 'byorder' ? 1 : -1; // 1 — по возрастанию, -1 — по убыванию
    } else if (filters.column === 'lastname') {
      sort.lastName = filters.sort === 'byorder' ? 1 : -1;
    } else {
      sort.dob = filters.sort === 'increase' ? 1 : -1;
    }
    console.log(this.userModel.find(query).sort(sort));
    

    // Выполнение запроса с фильтрами и сортировкой
    return this.userModel.find(query).sort(sort).exec();
  }
}
