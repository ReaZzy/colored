import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, call$: CallHandler): Observable<any> {
    const isGraphQl = !ctx.switchToHttp().getRequest();
    let method, url, operation, fieldName, variables;

    if (isGraphQl) {
      operation = ctx.getArgs()[3].operation?.operation;
      fieldName = ctx.getArgs()[3]?.fieldName;
      variables = ctx.getArgs()[3]?.variableValues;
    } else {
      method = ctx.switchToHttp().getRequest()?.method;
      url = ctx.switchToHttp().getRequest()?.url;
    }

    const now = Date.now();
    return call$
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${method || operation?.toUpperCase()} ${url || fieldName} ${
              variables ? JSON.stringify(variables) : ''
            } ${Date.now() - now}ms`,
            ctx.getClass().name
          )
        )
      );
  }
}
