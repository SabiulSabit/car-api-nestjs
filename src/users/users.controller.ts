import { Controller, Body, Post, Get, Patch, Delete, Param, Query, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto'
import { UsersService } from './users.service'
import { SerializeInterceptor } from '../interceptors/serialize.interceptors'
import { UserDto } from './dtos/user.dto'

@Controller('auth')
export class UsersController {

    //constructor
    constructor(private usersService: UsersService) {

    }


    @Post('/signup') // singup routing
    createUser(@Body() body: CreateUserDto) {

        this.usersService.create(body.email, body.password);

    }

    @UseInterceptors(new SerializeInterceptor(UserDto))
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


