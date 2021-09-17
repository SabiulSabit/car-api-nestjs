import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        // fake user service
        const fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password })
        }
        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUsersService
            }]
        }).compile();

        service = module.get(AuthService);
    })


    it("can create an instance of auth service", async () => {
        expect(service).toBeDefined();
    })

    it("creates a new user with a salted and hashed password", async () => {

        const user = await service.singup('as@asda.com', 'asd');

        expect(user.password).not.toEqual('asd');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })
})

