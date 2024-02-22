import { Injectable } from '@nestjs/common';
import * as Html from '@kitajs/html';
import UsersRoute from './components/usersRoute';
import TableData from './components/usersRoute/TableData';
import User from './components/user';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers({
    hxRequest,
    hxTrigger,
    page,
    q = '',
    size,
    tees,
  }: {
    hxRequest?: string;
    hxTrigger?: string;
    page?: number;
    q?: string;
    size?: number;
    tees?: Set<string>;
  }): string {
    if (hxRequest && hxTrigger !== 'filters' && hxTrigger !== 'searchform') {
      return (
        <TableData page={page} size={size} q={q} tees={tees} />
      ) as string;
    }
    return (<UsersRoute q={q} tees={tees} />) as string;
  }

  getUser(id: string): string {
    return (<User id={id} />) as string;
  }

  getStuff(): string {
    return (<h1>stuff!</h1>) as string;
  }
}
