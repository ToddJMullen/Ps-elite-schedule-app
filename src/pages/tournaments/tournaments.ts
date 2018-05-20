import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { EliteApi } from '../../providers/elite-api/elite-api';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

	tournamentAry: any;

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	  , public eliteApi: EliteApi
	) {
  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad LOADED TournamentsPage (first time loaded)');
	this.eliteApi.getTournaments().then( tourAry => this.tournamentAry = tourAry );
  }

  itemTapped( $event, tourney ){
	this.navCtrl.push( TeamsPage, tourney );
  }


//   ionViewWillEnter(){
//     console.log('ionViewWillEnter just BEFORE ENTERING TournamentsPage');
//   }

//   ionViewWillLeave(){
//     console.log('ionViewWillLeave just BEFORE leaving TournamentsPage');
//   }

//   ionViewDidLeave(){
//     console.log('ionViewDidLeave just after leaving TournamentsPage');
//   }

//   ionViewWillUnload(){
//     console.log('ionViewWillUnload just BEFORE UNLOAD TournamentsPage');
//   }

//   ionViewCanEnter(){
//     console.log('ionViewCanEnter run/guard just BEFORE LOADING TournamentsPage (check auth etc.)');
//   }

//   ionViewCanLeave(){
//     console.log('ionViewCanLeave run/guard just BEFORE UNLOADING TournamentsPage (check forms/changes etc)');
//   }


}
