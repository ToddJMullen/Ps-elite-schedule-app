import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApi } from "../../providers/elite-api/elite-api";
import { AgmCoreModule } from "@agm/core";

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

  }

}
