import { Controller, Body, Post, Get, Patch, Delete, Param, Query, NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto'
import { UsersService } from './users.service'
import { Serialize } from '../interceptors/serialize.interceptors'
import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from './user.entity'

@Controller('auth')
@Serialize(UserDto)

export class UsersController {

    //constructor
    constructor(private usersService: UsersService, private authService: AuthService) {
    }

    // @Get('/currentuser')
    // currentUser(@Session() session: any) {
    //     return this.usersService.findOne(session.userId);
    // }

    @Get('/currentuser')
    currentUser(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup') // singup routing
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.singup(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Post('/signin') // signin a user
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id;
        return user;
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


