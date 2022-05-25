import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  //Ejemplo:
  //Forma_1
  // @Get('users/:id')
  // getUser(@Param() params: any) {
  //   return `Este es el usuario: ${params.id}`;
  // }

  //Forma_2 ****
  //Las url dinamicas van al final para que no se confundan con el id
  // @Get('users/:id')
  // getUser(@Param('id') id: number) {
  //   return `Este es el usuario: ${id}`;
  // }
  //****
  // @Get('skill/:name/users/:id')
  // getSkill(@Param('name') name: string, @Param('id') id: number) {
  //   return `Tu skill es el: ${name} y tu usuario ${id}`;
  // }

  //Forma_1
  // @Get('users/')
  // getUsers(@Query() params: any) {
  //   const { limit, offset } = params;
  //   return `Users: limit=> ${limit} offset=> ${offset}`;
  // }

  //Forma_2 ****
  // @Get('users/')
  // getUsers(
  //   @Query('limit') limit: number,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return `Users: limit=> ${limit} offset=> ${offset} brand=> ${brand}`;
  // }
}
