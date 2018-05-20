import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";


import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { GamePage } from '../pages/game/game';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TeamsPage } from '../pages/teams/teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';
import { EliteApi } from '../providers/elite-api/elite-api';

@NgModule({
  declarations: [
	MyApp
	,MyTeamsPage
	,GamePage
	,TeamDetailPage
	,TeamsPage
	,TournamentsPage
	,StandingsPage
	,TeamHomePage
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp)
	,HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
	,MyTeamsPage
	,GamePage
	,TeamDetailPage
	,TeamsPage
	,TournamentsPage
	,StandingsPage
	,TeamHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApi
  ]
})
export class AppModule {}
