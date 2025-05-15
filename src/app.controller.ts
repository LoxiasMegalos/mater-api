import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
//import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}
  //private readonly appService: AppService
  /*
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }*/

  @ApiExcludeEndpoint()
  @Get()
  async redirect(@Res() resposta: any){
    return resposta.redirect('/swagger')
 }
}
