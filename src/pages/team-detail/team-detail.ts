import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EliteApi } from '../../providers/elite-api/elite-api';
import { GamePage } from '../game/game';

import * as _ from "lodash";
import moment from "moment";

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

	public team:any = {};
	public gameAry: any[];
	public teamStanding: any = {};
	private tourData: any;
	public dateFilter:string;
	public allGames: any[];
	public useDateFilter:boolean = false;

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	  , private eliteApi: EliteApi
	) {
	// this.team = this.navParams.data;//will be an incoming Team instance
	//this is still param 2 when using nav.push() / navCtrl.push()
	// -OR- when when passed via the [rootParams] binding in <ion-tab> component markup
	// console.log("navParams:", this.navParams );
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad TeamDetailPage');
	this.team = this.navParams.data;
	this.tourData = this.eliteApi.getCurrentTour();
	console.log('ionViewDidLoad() got tourData:', this.tourData );
	this.gameAry = _.chain( this.tourData.games )
					.filter( g => this.team.id == g.team1Id || this.team.id == g.team2Id )
					.map( g => {
						let isUs		= this.team.id == g.team1Id
						,opponentName	= isUs ? g.team2 : g.team1
						,scoreDisplay	= this.getScoreDisplay( isUs, g.team1Score, g.team2Score )
						,rDate			= new Date(g.time);

						rDate.setDate( rDate.getDate() + Math.round( 3 * Math.random()) )

						return {
							gameId			: g.id
							,opponent		: opponentName
							,time			: rDate.getTime()
							,location		: g.location
							,locationUri	: g.locationUrl
							,scoreDisplay	: scoreDisplay
							,homeAway		: isUs ? "vs" : "at"
						}
					})
					.value();
		this.allGames = this.gameAry;
		this.teamStanding = _.find( this.tourData.standings, {"teamId": this.team.id});
		console.log("team standing:", this.teamStanding );
	;
  }

  dateChanged(){
	if( !this.useDateFilter ){
		this.gameAry = this.allGames;
	}
	else {
		this.gameAry = _.filter( this.allGames, g => moment(g.time).isSame( this.dateFilter, "day") );
	}
	console.log("dateChanged()", this.dateFilter, this.gameAry );
  }


  getScoreDisplay( isUs, team1Score, team2Score ){
	  if( team1Score && team2Score ){
		  let scoreUs	= isUs ? team1Score : team2Score
		  , scoreThem	= isUs ? team2Score : team1Score
		  , winMark		= scoreUs > scoreThem ? "W" : "L"
		  ;
		  return `${winMark}: ${scoreUs} - ${scoreThem}`;
	  }
	  else {
		  return "(incomplete)";
	  }
  }

  onClickGame($event, game){
	console.log('onClickGame() got tourData:', this.tourData, `, Game Clicked: `, game );
	let sourceGame = this.tourData.games.find( g => g.id === game.gameId );
	// let sourceGame = this.gameAry.find( g => g.id === game.gameId );
	//the games have been reduced already, but the objects have been coerced into 'other' objects
	//I could probably add the needed data to skip searching the entire game set
	//, but I don't know for sure where he's going with the objective
	console.log('onClickGame() found source game:', sourceGame );
	  this.navCtrl.parent.parent.push( GamePage, sourceGame );
	  //get root reference before adding to the stack
  }

//   goHome(){//for demonstration of nested stack problems
// 	// this.navCtrl.push( MyTeamsPage );
// 		// ^^^ will add the "home" page to the internal/parent tabs stack (as a child of the TeamHomePage)
// 	// this.navCtrl.popToRoot();//same fix as in the parent TeamHomePage
// 		// ^^^ does nothing bc, in context, this IS root of the tab stack already

// 		this.navCtrl.parent.parent.popToRoot();
// 		//get ref to ^tabs^ ^root^ ^^^^ go from there

//   }

}
