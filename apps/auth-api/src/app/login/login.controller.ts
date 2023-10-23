import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

interface LoginBody {
  username: string;
  password: string;
}

interface User {
  username: string;
  password: string;
}

const users = require('./users.json') as User[];

@Controller('login')
export class LoginController {
  @Post('/')
  login(
    @Body() loginBody: LoginBody,
    @Res({ passthrough: true }) res: Response
  ) {
    const username = loginBody.username;
    const password = loginBody.password;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      throw new UnauthorizedException(`Couldn't find user`);
    }
    const { token } = this.parseTokens(user, res);

    return {
      accessToken: token,
    };
  }

  @Post('/refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res) {
    try {
      const user = jwt.verify(
        req.cookies['jwt'],
        process.env.REFRESH_JWT_SECRET
      ) as User;

      if (user) {
        const { token } = this.parseTokens(
          { username: user.username, password: user.password },
          res
        );
        return {
          accessToken: token,
        };
      } else {
        throw new UnauthorizedException(`Invalid token`);
      }
    } catch (err) {
      throw new UnauthorizedException(`Invalid token`);
    }
  }

  parseTokens(user: User, res) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1s',
    });

    const refreshToken = jwt.sign(user, process.env.REFRESH_JWT_SECRET, {
      expiresIn: '30d',
    });

    res.cookie('jwt', refreshToken, {
      httpOnly: false,
      sameSite: 'Strict',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      domain: undefined,
    });

    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    return { token };
  }
}
