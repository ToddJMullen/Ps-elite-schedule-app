import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, ToastController } from 'ionic-angular';
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
	  ,private toast: ToastController
	) {
    this.initializeApp();

  }

  pop( msg, duration = 0, position = "bottom" ){
	let t = this.toast.create({
		message: `App::${msg}`, duration, position
		,showCloseButton: true
	});
	t.present();
  }

  initializeApp() {
	this.pop("initializeApp()");
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
	  // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
	  this.splashScreen.hide();
	  this.userSettings.initStorage()
	  	.then( () => {
			this.rootPage = MyTeamsPage
			this.refreshFavs();//I hope this is the culprit (being outside callback / before db init)
		});//don't think we need this?
	});
  }

  refreshFavs(){
	  this.pop("refreshFavs()");
	  console.log("refreshFavs()")
	//   this.favoriteTeams = this.userSettings.getAllFavorites();
		this.userSettings.getAllFavorites().then(
			favAry => this.favoriteTeams = favAry
		);
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
