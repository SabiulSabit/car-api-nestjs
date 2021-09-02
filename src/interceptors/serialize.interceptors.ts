import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer'
import { nextTick } from 'process';

export class SerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, handeler: CallHandler): Observable<any> {

        console.log("Running Before the Handeler", context);
        return handeler.handle().pipe(map((data: any) => {
            console.log("Running Before response is sent");

        }));
    }
}