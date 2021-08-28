import { Controller, Body, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service'

@Controller('auth')
export class UsersController {

    //constructor
    constructor(private usersService: UsersService) {

    }


    @Post('/signup') // singup routing
    createUser(@Body() body: CreateUserDto) {

        this.usersService.create(body.email, body.password);

    }
}
