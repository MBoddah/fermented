import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';
import { DrinkModule } from './drink/drink.module';
import { SensoryModule } from './sensory/sensory.module';
import { BreweryModule } from './brewery/brewery.module';
import { StatisticModule } from './statistic/statistic.module';
import { TagModule } from './tag/tag.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        DrinkModule,
        SensoryModule,
        TagModule,
        BreweryModule,
        StatisticModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
