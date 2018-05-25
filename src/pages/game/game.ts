import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { TeamHomePage } from '../team-home/team-home';
import { MapPage } from '../map/map';

declare var window: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

	public game: any	= {};

  constructor(
	  public navCtrl: NavController
	  ,public navParams: NavParams
	  ,private eliteApi: EliteApi
	) {
  }

  ionViewDidLoad() {
	this.game = this.navParams.data;
	console.log('ionViewDidLoad GamePage, game:', this.game );
	//convert the game datetime from string
	this.game.time = Date.parse( this.game.time );
  }

  onClickTeam( teamId ){
	let tour	= this.eliteApi.getCurrentTour()
	,team		= tour.teams.find( t => teamId === t.id )
	;
	this.navCtrl.push( TeamHomePage, team );
  }

  getWinnerClass( scoreUs, scoreThem ){
	  return +scoreUs > +scoreThem ? "gameW" : "gameL";
  }

  goToMap(){
	  console.log("goToMap()");
	  this.navCtrl.push( MapPage, this.game );
  }

  goToDirections(){
	  console.log("goToDirections()");
	  let tour	= this.eliteApi.getCurrentTour()
	  ,location	= tour.locations[ this.game.locationId ]
	  ;
	  window.location = `geo:${location.latitude},${location.longitude};u-35`;
  }

}
