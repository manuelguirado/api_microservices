import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  name: string;
  password: string;
}
@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      userId: 1,
      name: 'john',
      password: 'changeme',
    },
  ];

  findOne(userName: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((user) => user.name === userName));
  }
}
