import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => UseGuards(AuthGuard('jwt'));
