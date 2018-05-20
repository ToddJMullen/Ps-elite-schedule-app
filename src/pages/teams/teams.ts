import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-team',
  templateUrl: 'teams.html',
})
export class TeamsPage {

	public teams = [];

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	  , public eliteApi: EliteApi
	) {
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad TeamPage');
	let selectedTour = this.navParams.data;
	//using rxjs map
	this.eliteApi.getTournamentData( selectedTour.id ).subscribe( tournament => {
		this.teams = tournament.teams;
	});
  }

  itemTapped( $event, team ){
	this.navCtrl.push( TeamHomePage, team );
  }

}
