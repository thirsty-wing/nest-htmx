import { Controller, Get, Headers, Res, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  redirect(@Res() res) {
    return res.redirect('/users');
  }

  @Get('/users')
  getUsers(
    @Query('q') q?: string,
    @Query('size') size?: string,
    @Query('page') page?: string,
    @Query('xstee') xstee?: string,
    @Query('stee') stee?: string,
    @Query('mtee') mtee?: string,
    @Query('ltee') ltee?: string,
    @Query('xltee') xltee?: string,
    @Query('xxltee') xxltee?: string,
    @Query('xxxltee') xxxltee?: string,
    @Headers('hx-request') hxRequest?: string,
  ): string {
    const nPage = page ? parseInt(page) : undefined;
    const nSize = page ? parseInt(size) : undefined;

    const tees = new Set<string>();
    if (xstee) {
      tees.add('xstee');
    }
    if (stee) {
      tees.add('stee');
    }
    if (mtee) {
      tees.add('mtee');
    }
    if (ltee) {
      tees.add('ltee');
    }
    if (xltee) {
      tees.add('xltee');
    }
    if (xxltee) {
      tees.add('xxltee');
    }
    if (xxxltee) {
      tees.add('xxxltee');
    }

    return this.appService.getUsers({
      hxRequest,
      page: nPage,
      q,
      size: nSize,
      tees,
    });
  }

  @Get('/users/:id')
  getUser(@Param('id') id: string): string {
    return this.appService.getUser(id);
  }

  @Get('/stuff')
  getStuff(): string {
    return this.appService.getStuff();
  }
}