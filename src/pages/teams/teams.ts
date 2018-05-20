import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from "lodash";

@Component({
  selector: 'page-team',
  templateUrl: 'teams.html',
})
export class TeamsPage {

	public teams = [];
	private allTeams:any;
	private allTeamDivisions:any;

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	  , public eliteApi: EliteApi
	  ,private loadingController: LoadingController
	) {
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad TeamPage');
	let selectedTour = this.navParams.data;
	let loader = this.loadingController.create({
		content: "Loading Data..."
	});
	loader.present().then(() => {
		//using rxjs map
		this.eliteApi.getTournamentData( selectedTour.id ).subscribe( tournament => {
			this.allTeams = tournament.teams;
			this.allTeamDivisions = _.chain( tournament.teams )
			.groupBy("division")
			.toPairs()
			.map( team => _.zipObject(["divisionName", "divisionTeams"], team) )
			.value();
			this.teams = this.allTeamDivisions;
			console.log("All teams division:", this.allTeamDivisions );
		});
		loader.dismiss();
	});
  }

  itemTapped( $event, team ){
	this.navCtrl.push( TeamHomePage, team );
  }

}
