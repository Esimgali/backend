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

  async findOne(id: string): Promise<User[]> {
    return this.userModel.find({id: id}).exec();
  }

  async getFilteredUsers(filters: any): Promise<{users: User[], count: number, page: number}> {
    const query: any = {};
    const limit = filters.splitter;
    const page = filters.page;

    if (filters.male && filters.male !== 'all') {
      query.gender = filters.male;
    }

    if (filters.date && filters.date[0] && filters.date[1]) {
      query.dob = {
        $gte: new Date(Number(filters.date[0])), 
        $lte: new Date(Number(filters.date[1])),
      };
    }

    const sort: any = {};
    if (filters.column === 'name') {
      sort.firstName = filters.sort === 'byorder' ? 1 : -1; 
    } else if (filters.column === 'lastname') {
      sort.lastName = filters.sort === 'byorder' ? 1 : -1;
    } else {
      sort.dob = filters.sort === 'increase' ? 1 : -1;
    }
    
    const count = await this.userModel.countDocuments(query).exec();
    const skip = (page - 1) * limit;

    const users = await this.userModel
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();

    return {
      users: users.map((user) => user.toObject()),
      count: count,
      page: 1, 
    };  
  }
}
