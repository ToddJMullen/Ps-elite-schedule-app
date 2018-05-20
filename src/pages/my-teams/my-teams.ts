import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentsPage } from '../tournaments/tournaments';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

	favoriteAry	= [
		{
			team: {id: 234, name: "Boo 7", coach: "Michelotti"}
			,tournamentId: "3dd50aaf-6b03-4497-b074-d81703f07ee8"
			,tournamentName: "March Madness Tournament"
		}
		,
		{
			team: {id: 456, name: "dfg 7", coach: "Michelotti"}
			,tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63"
			,tournamentName: "April Madness Tournament"
		}
	]

  constructor(
	  public navCtrl: NavController
	  ,public navParams: NavParams
	  ,private loadingController: LoadingController
	  ,private eliteApi: EliteApi
	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournament(){
	  this.navCtrl.push( TournamentsPage );
  }

  onClickFavorite( $event, fav ){
	let loader = this.loadingController.create({
		content: "Getting Data..."
		,dismissOnPageChange: true
	});
	loader.present();
	this.eliteApi.getTournamentData( fav.tournamentId )
		.subscribe( t => this.navCtrl.push( TeamHomePage, fav.team ))
  }

}
