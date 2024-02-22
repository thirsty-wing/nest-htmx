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
    @Headers('hx-trigger') hxTrigger?: string,
  ): string {
    const nPage = page ? parseInt(page) : undefined;
    const nSize = page ? parseInt(size) : undefined;

    const tees = new Set<string>();
    if (xstee) {
      tees.add('XS');
    }
    if (stee) {
      tees.add('S');
    }
    if (mtee) {
      tees.add('M');
    }
    if (ltee) {
      tees.add('L');
    }
    if (xltee) {
      tees.add('XL');
    }
    if (xxltee) {
      tees.add('2XL');
    }
    if (xxxltee) {
      tees.add('3XL');
    }

    return this.appService.getUsers({
      hxRequest,
      hxTrigger,
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
