import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { TournamentsPage } from '../pages/tournaments/tournaments';
import { UserSettings } from '../providers/user-settings/user-settings';
import { EliteApi } from '../providers/elite-api/elite-api';
import { TeamHomePage } from '../pages/team-home/team-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeamsPage;

  pages: Array<{title: string, component: any}>;

  constructor(
	  public platform: Platform
	  , public statusBar: StatusBar
	  , public splashScreen: SplashScreen
	  , private userSettings: UserSettings
	  , private eliteApi: EliteApi
	  , private loadingController: LoadingController
	) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	});
	this.refreshFavs();
  }

  refreshFavs(){
	  console.log("refreshFavs()")
	  this.favoriteTeams = this.userSettings.getAllFavorites();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome(){
	  this.nav.push( MyTeamsPage );
  }

  goToTeam( fav ){
	  let loader = this.loadingController.create({
		  content: "Getting Data..."
		  ,dismissOnPageChange: true
	  });
	  loader.present();
	  console.log("goToTeam()", fav );
	  this.eliteApi.getTournamentData(fav.tourId)
	  				.subscribe( tour => this.nav.push( TeamHomePage, fav.team ) )
  }


  goToTournament(){
	  this.nav.push( TournamentsPage );
  }


}
