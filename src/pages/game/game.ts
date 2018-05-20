import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

	public game: any	= {};

  constructor(
	  public navCtrl: NavController
	  ,public navParams: NavParams
	  ,private eliteApi: EliteApi
	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
	this.game = this.navParams.data;
  }

  onClickTeam( teamId ){
	let tour	= this.eliteApi.getCurrentTour()
	,team		= tour.teams.find( t => teamId === t.id )
	;
	this.navCtrl.push( TeamHomePage, team );
  }

}
