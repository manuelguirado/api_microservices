import { Injectable } from '@nestjs/common';

export type User = {
  userId: string;
  gmail: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  addUser(gmail: string, password: string): void {
    console.log('Attempting to add user:', gmail);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].gmail === gmail) {
        throw new Error('User already exists');
      }
    }
    console.log('Adding user:', gmail);
    this.users.push({ userId: this.generateId(), gmail, password });
  }
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  findOne(gmail: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((user) => user.gmail === gmail));
  }
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
