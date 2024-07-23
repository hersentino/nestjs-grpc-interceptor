import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap, throwError } from 'rxjs';

@Injectable()
export default class LoggerInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler<any>) {
    const reqBody = context.switchToRpc().getData();
    const method = context.getHandler().name;
    const contextType = context.getType();
    const controllerName = context.getClass().name;

    console.info(
      `REQ: [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(reqBody)}`,
    );
    return next.handle().pipe(
      tap((data) => {
        console.info(
          `RES: [${contextType}]:[${controllerName}]:[${method}]:-> ${JSON.stringify(data)}`,
        );
      }),
      catchError((error) => {
        console.error(
          `ERR: [${contextType}]:[${controllerName}]:[${method}]:-> ${error.message}`,
          error.stack,
        );
        return throwError(() => error);
      }),
    );
  }
}
