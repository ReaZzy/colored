import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
export class GqgAuthGuard extends AuthGuard('jwt') {
  getRequest(ctx: ExecutionContext): any {
    const context = GqlExecutionContext.create(ctx);
    return context.getContext().req;
  }
}
