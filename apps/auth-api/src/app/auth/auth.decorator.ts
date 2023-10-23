
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard),
  );
}