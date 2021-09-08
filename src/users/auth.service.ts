import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service'

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {

    }

    async singup(email: string, password: string) {
        let users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in Use')
        }
    }

    signin() {

    }
}