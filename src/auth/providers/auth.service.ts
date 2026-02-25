import { Injectable ,Inject, forwardRef } from '@nestjs/common';
import { UserService } from '../../users/providers/users.services';

@Injectable()
export class AuthService {
  constructor(
    //injectiong the dependency of userService
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  // Add authentication methods here
  public login(email: string, password: string, id: number): object {
    const user = this.userService.getUserById({ id });
    return { email, password, id, sampletokern: 'abcd1234', user };
  }

  public isAuth(): Boolean {
    return true;
  }
}
