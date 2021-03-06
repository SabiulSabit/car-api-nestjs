import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service'
import { User } from './user.entity'

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {

    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "asdfas@asdf.com", password: "asdf" } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "asd" } as User])
      },
      // remove: () => {

      // },
      // update: () => {

      // }
    };
    fakeAuthService = {
      // singup: () => {

      // },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User)
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: fakeUsersService
      }, {
        provide: AuthService,
        useValue: fakeAuthService
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all user with email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com')
  })

  it('signin update sessoion object and retunr user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin({ email: 'asd@asdf.com', password: "sdf" }, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1)
  })
});
