import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';
import { AuthService } from '../../auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto?.email },
    });

    // if (existUser) {
    //   return { message: 'User already exist with this email' };
    // }

    const newUser = this.userRepository.create(createUserDto);
    console.log(newUser, 'this is an  instance of new User');
    await this.userRepository.save(newUser);
    return newUser;
  }

  getAllUsers(
    getUserParamsDto?: GetUserParamsDto,
    limit?: number,
    page?: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth, 'this is from is Auth in user Service');
    console.log(getUserParamsDto, limit, page);

    return isAuth;
  }

  getUserById(getUserParamsDto: GetUserParamsDto): number | undefined {
    console.log(getUserParamsDto);
    return getUserParamsDto?.id;
  }
}
