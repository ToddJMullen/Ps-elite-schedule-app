import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

	public team:any		= {};

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	) {
		console.log("navParams:", this.navParams );
		this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
  }

}
