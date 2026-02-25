import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        //injecting the dependency of auth services
        private readonly authService: AuthService
    ) {}
    
}
