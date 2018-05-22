// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';//includes json()
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

@Injectable()
export class EliteApi {

	private baseUri:string	= "https://elite-schedule-app-i3-37c3e.firebaseio.com";
	private currentTour:any	= {};
	private tournamentData: any = {};

	constructor(
		public http: Http
	) {
	// console.log('Hello EliteApiProvider Provider');
	}

	//using Promises
	getTournaments(){
		return new Promise( resolve => {
			this.http.get(`${this.baseUri}/tournaments.json`)
				.subscribe( rsp => resolve( rsp.json() ) );
		});
	}

	refreshCurrentTournament(){
		if( !this.getCurrentTour() ){
			console.error("No tournament data selected");
			return;
		}
	return this.getTournamentData( this.currentTour.tournament.id, true );
	}

	getTournamentData( tourId, forceRefresh:boolean = false ){
		if( !forceRefresh && this.tournamentData[tourId] ){
			this.currentTour = this.tournamentData[tourId];
			console.log("We already have the data & this isn't a 'force refresh' so just return it")
			return Observable.of(this.currentTour);
		}

		console.log(`We dont have the tour "${tourId}" data or is a forced refresh`, forceRefresh
			, "cached:", this.tournamentData );
		return this.http.get(`${this.baseUri}/tournaments-data/${tourId}.json`)
			.map( rsp => {
				this.tournamentData[ tourId ] = rsp.json();
				this.currentTour = this.tournamentData[ tourId ];
				return this.currentTour;
		});
	}

  //deprecated in s7.4 - "Refresher"
//using rxjs /preferred method
//   getTournamentData( tourId ): Observable<any>{
// 	return this.http.get(`${this.baseUri}/tournaments-data/${tourId}.json`)
// 			.map( rsp => {
// 				this.currentTour = rsp.json();
// 				return this.currentTour;
// 			})
//   }


	getCurrentTour(): any {
		return this.currentTour;
	}


}
