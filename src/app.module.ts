/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     MongooseModule.forRoot("mongodb+srv://esimgalikhamitov2005:XpdQhTa0Nx4MlMHC@cluster0.63lx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }),
//     UsersModule, // Подключаем модуль пользователей
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Для использования переменных из .env, // Подключение модуля Users
    MongooseModule.forRoot(
      'mongodb+srv://esimgalikhamitov2005:XpdQhTa0Nx4MlMHC@cluster0.63lx9.mongodb.net/sgo?retryWrites=true&w=majority&appName=Cluster0',
    ), // Подключение к MongoDB
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
