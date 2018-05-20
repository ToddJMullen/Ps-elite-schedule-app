import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage } from '../my-teams/my-teams';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

	public team:any = {};

  constructor(
	  public navCtrl: NavController
	  , public navParams: NavParams
	) {
	this.team = this.navParams.data;//will be an incoming Team instance
	//this is still param 2 when using nav.push() / navCtrl.push()
	// -OR- when when passed via the [rootParams] binding in <ion-tab> component markup
	console.log("navParams:", this.navParams );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
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
