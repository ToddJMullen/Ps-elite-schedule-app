import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApi } from "../../providers/elite-api/elite-api";
import { AgmCoreModule } from "@agm/core";

declare var window:any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

	public map:any =  {};

  constructor(
	  public eliteApi: EliteApi
	, public navParams: NavParams
	) {
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad MapPage');
	try{

		let games = this.navParams.data
		,tour		= this.eliteApi.getCurrentTour()
		,location	= tour.locations[ games.locationId ]
		;

		this.map = {
			lat: location.latitude
			,lng: location.longitude
			,zoom: 12
			,markerLabel: games.location
		}
	} catch (err){
		console.log("Locaiton not found or other error");
	}

  }

  goToDirections(){
	  window.location = `geo:${this.map.lat},${this.map.lng}:u-35`;
  }

}
