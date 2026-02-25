import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Req,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UserService } from './providers/users.services';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get('{/:id}')
  @ApiOperation({ summary: 'Get users with optional id, pagination supported' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of users.' })
  //   @Get(':id?') //this is not working as optional param
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit number of users returned, default is 10',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'page number of users returned, default is 1',
    example: 1,
  })
  public getUser(
    @Param() getUserParamsDto: GetUserParamsDto,
    // @Param('optional') optional: any,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): object {
    console.log(typeof getUserParamsDto);
    console.log(getUserParamsDto);
    // console.log(typeof optional);
    // console.log(optional);
    console.log(typeof limit);
    console.log(limit);
    console.log(typeof page);
    console.log(page);

    return this.userService.getAllUsers(getUserParamsDto, limit, page);
  }
  // @Get()
  // public getUsers(): Object {
  //   return this.userService.getAllUsers();
  // }
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = this.userService.createUser(createUserDto);
    return createdUser;
  }

  // @Post()
  // public loginUser(
  //   @Req() req: Request,
  //   @Headers() headers: any,
  //   @Ip() ip: any,
  // ) {
  //   console.log(req);
  //   console.log(headers);
  //   console.log(ip);
  //   return req.body;
  // }
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(typeof patchUserDto);
    console.log(patchUserDto);
    return patchUserDto;
  }
}
