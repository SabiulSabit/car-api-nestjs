import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {

    //constructor
    constructor(@InjectRepository(User) private repo: Repository<User>) {

    }

    // create user instance
    create(email: string, password: string) {
        const user = this.repo.create({ email, password });

        return this.repo.save(user);
    }


    //find one user
    findOne(id: number) {
        return this.repo.findOne(id)
    }

    //find user with mail
    find(email: string) {
        return this.repo.find({ email })
    }

    //update user data
    async update(id: number, attrs: Partial<User>) {
        //find the user
        const user = await this.findOne(id);

        //if the id is not valid
        if (!user) {
            throw new Error("User Not Found!")
        }

        //update the user property
        Object.assign(user, attrs);

        //save the updated user value
        return this.repo.save(user);
    }

    remove() {


    }

}
