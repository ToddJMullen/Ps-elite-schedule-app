import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-team',
  templateUrl: 'teams.html',
})
export class TeamsPage {

	public teams = [
		{ id: 1, name: "HC Elite"}
		,{ id: 2, name: "Team Takeover"}
		,{ id: 3, name: "DC Thunder"}
	]

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
  }

}
