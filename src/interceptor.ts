import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

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
    return next.handle();
  }
}
