import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util'
import { UsersService } from './users.service'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {

    }

    async singup(email: string, password: string) {

        //check if the email is in use
        let users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in Use')
        }

        //hash the password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

    }

    signin() {

    }
}