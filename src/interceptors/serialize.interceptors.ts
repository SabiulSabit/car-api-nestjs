import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer'

interface ClasConstructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClasConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {

    constructor(private dto: any) {

    }

    intercept(context: ExecutionContext, handeler: CallHandler): Observable<any> {

        return handeler.handle().pipe(map((data: any) => {
            return plainToClass(this.dto, data, {
                excludeExtraneousValues: true,
            })

        }));
    }
}