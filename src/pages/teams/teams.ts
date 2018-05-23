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
	public searchText:string;

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
	  let selectedTour = this.navParams.data;
	  console.log('ionViewDidLoad TeamPage, tour:', selectedTour );
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
			console.log("All teams:", this.allTeams );
		});
		loader.dismiss();
	});
  }

  itemTapped( $event, team ){
	this.navCtrl.push( TeamHomePage, team );
  }

  filterTeams(){
	  let query:string			= this.searchText.toLowerCase()
	  ,filteredTeams:any[]		= []
	  ;

	  _.forEach( this.allTeamDivisions, div => {
		 let divTeams = _.filter( div.divisionTeams, t => (<any>t).name.toLowerCase().includes(query) );
		 console.log("filterTeams() div teams, after:", divTeams );
		 if( divTeams.length > 0 ){
			 filteredTeams.push({divisionName: div.divisionName, divisionTeams: divTeams});
		 }
	  });
	  console.log("filterTeams() filtered:", filteredTeams );
	  this.teams = filteredTeams;
  }

}
