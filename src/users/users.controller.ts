import { Controller, Body, Post, Get, Patch, Param, Query } from '@nestjs/common';
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

    @Get('/:id') // get a user by id
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get() // find all user by email
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }
}
