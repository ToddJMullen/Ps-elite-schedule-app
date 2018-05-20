import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { StandingsPage } from '../standings/standings';
// import { MyTeamsPage } from '../my-teams/my-teams';


@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

	public team:any			= {};

	public tabTeamDetails	= TeamDetailPage;
	public tabStandings		= StandingsPage;


  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams) {

		this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome(){
	//this.navCtrl.push( MyTeamsPage );
	// ^^^ adds to stack, which creates a back btn on the home page which isn't appropriate
	this.navCtrl.popToRoot();//removes all stack back to root
  }

}
