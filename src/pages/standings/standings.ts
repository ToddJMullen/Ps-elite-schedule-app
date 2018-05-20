import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	) {
		console.log("navParams:", this.navParams );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
  }

}
