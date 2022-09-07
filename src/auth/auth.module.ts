import { CatsModule } from './../cats/cats.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }), //jwt 모듈은 jwt만들어주는 목적의 모듈
    forwardRef(() => CatsModule), //providers를 통하여 주입 CatsRepository를 주입 받을 수 있지만... 이는 모듈의 남용으로 이어질 수 있고 이를 위하여 모듈을 임포트하여 export로 열어준 인스턴스?만 사용 가능하게 만들어주자.
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
