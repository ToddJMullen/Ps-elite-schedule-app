// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';//includes json()
import { Injectable } from '@angular/core';

import "rxjs/add/operator/map";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

	private baseUri:string	= "https://elite-schedule-app-i3-37c3e.firebaseio.com";
	private currentTour:any	= {};

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


  //using rxjs /preferred method
  getTournamentData( tourId ): Observable<any>{
	return this.http.get(`${this.baseUri}/tournaments-data/${tourId}.json`)
			.map( rsp => {
				this.currentTour = rsp.json();
				return this.currentTour;
			})
  }


	getCurrentTour(): any {
		return this.currentTour;
	}


}
