import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import * as _ from "lodash";

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {


	public allStandings: any[];
	public standings: any[];

	public team:any		= {};

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	  , private eliteApi: EliteApi
	) {
		console.log("navParams:", this.navParams );
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StandingsPage');
		this.team = this.navParams.data;
		let tour = this.eliteApi.getCurrentTour();
		this.standings = tour.standings;
		this.allStandings = _.chain( this.standings )
								.groupBy("division")
								.toPairs()
								.map( game => _.zipObject(["divisionName","divisionStandings"], game ))
								.value();
		console.log("Standings:", this.standings );
		console.log("All Standings:", this.allStandings );
  }

}
