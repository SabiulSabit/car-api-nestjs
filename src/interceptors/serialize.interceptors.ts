import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer'
import { UserDto } from '../users/dtos//user.dto'

export class SerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, handeler: CallHandler): Observable<any> {

        return handeler.handle().pipe(map((data: any) => {
            return plainToClass(UserDto, data, {
                excludeExtraneousValues: true,
            })

        }));
    }
}