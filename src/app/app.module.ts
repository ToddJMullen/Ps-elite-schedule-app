import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { HttpModule } from "@angular/http";
import { AgmCoreModule } from "@agm/core";
import { SQLite } from "@ionic-native/sqlite";
import * as ApiKey from "../_private/ApiKeys";


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
import { MapPage } from "../pages/map/map";

import { EliteApi } from '../providers/elite-api/elite-api';
import { UserSettings } from '../providers/user-settings/user-settings';
import { SqlStorage } from '../providers/sql-storage/sql-storage';

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
	,MapPage
  ],
  imports: [
    BrowserModule,
	IonicModule.forRoot(MyApp)
	,HttpModule
	,IonicStorageModule.forRoot()
	,AgmCoreModule.forRoot({apiKey: ApiKey.KEY_AGM })
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
	,MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ,EliteApi
	,UserSettings
	,SQLite
    ,SqlStorage
  ]
})
export class AppModule {}
