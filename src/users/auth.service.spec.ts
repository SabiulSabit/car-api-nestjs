import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

jest.useRealTimers();

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        // fake user service
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
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

    // it('throws an error if user sign up with an exsisting email', (done) => {
    //     fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: 'ads' } as User])

    //     try {
    //         service.singup('test@test.com', 'asdf')
    //     } catch (err) {
    //         done();
    //     }
    // })

    // it('throws if signin is called with an unused email', (done) => {
    //     try {
    //         service.signin('test@test.com', 'asdf')
    //     } catch (err) {
    //         done();

    //     }
    // })

    // it("throws if an invalid password is provided", (done) => {
    //     fakeUsersService.find = () => Promise.resolve([{ email: 'asdf@asdf.com', password: "asd" } as User])

    //     try {
    //         service.signin('asdfasd@asdf.com', 'aasdfdf');
    //     } catch (err) {
    //         done();
    //     }
    // })
})

