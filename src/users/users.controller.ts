import { Controller, Body, Post, Get, Patch, Delete, Param, Query, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto'
import { UsersService } from './users.service'
import { Serialize } from '../interceptors/serialize.interceptors'
import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    //constructor
    constructor(private usersService: UsersService, private authService: AuthService) {
    }

    @Post('/signup') // singup routing
    createUser(@Body() body: CreateUserDto) {

        return this.authService.singup(body.email, body.password)
    }

    @Get('/:id') // get a user by id
    async findUser(@Param('id') id: string) {
        console.log("Handelr is running");

        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException("User Not Found");
        }

        return user;
    }

    @Get() // find all user by email
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete("/:id") // delete user by id
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id') //update user by id
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}


