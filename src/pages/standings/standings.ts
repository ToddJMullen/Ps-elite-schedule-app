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
	public divisionFilter:string = "division";
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
//		this.standings = tour.standings;
		this.allStandings = tour.standings;
		this.filterDivision();//populates the appropriate standings on load / replaces above & below
//		this.allStandings = _.chain( this.standings )
//								.groupBy("division")
//								.toPairs()
//								.map( game => _.zipObject(["divisionName","divisionStandings"], game ))
//								.value();
		console.log("Standings:", this.standings );
		console.log("All Standings:", this.allStandings );
  }

	getHeaderFn( record, recordIdx, allRecordAry ):void{
		console.log("getHeaderFn(), returning scroll header for:", record );

		if( recordIdx == 0 || record.division != allRecordAry[recordIdx - 1].division ){
			return record.division;
		}
		return null;
	}//getHeaderFn



	filterDivision(){
		if( this.divisionFilter == "all" ){
			this.standings = this.allStandings;
		}
		else {
			this.standings = _.filter( this.allStandings, s => { return s.division == this.team.division} );
//			this.standings = this.allStandings.filter( s => { return s.division == this.team.division} );
		}
	}


}
