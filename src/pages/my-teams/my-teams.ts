import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';
import { UserSettings } from '../../providers/user-settings/user-settings';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

	public favoriteAry	= [];

  constructor(
	  public navCtrl: NavController
	  ,public navParams: NavParams
	  ,private loadingController: LoadingController
	  ,private eliteApi: EliteApi
	  ,private userSettings: UserSettings
	) {
  }

  ionViewDidEnter(){//runs every time shown
	  this.favoriteAry = this.userSettings.getAllFavorites()
	}

	ionViewDidLoad() {//runs only on load
		console.log('ionViewDidLoad MyTeamsPage');
	}

	goToTournament(){
		this.navCtrl.push( TournamentsPage );
	}

	onClickFavorite( $event, fav ){
		console.log("clicked fav:", fav );
		let loader = this.loadingController.create({
			content: "Getting Data..."
			,dismissOnPageChange: true
		});
	loader.present();
	this.eliteApi.getTournamentData( fav.tourId )
		.subscribe( t => this.navCtrl.push( TeamHomePage, fav.team ))
  }

}
