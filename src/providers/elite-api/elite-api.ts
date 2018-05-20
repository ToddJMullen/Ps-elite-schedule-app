import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';//includes json()
import { Injectable } from '@angular/core';

@Injectable()
export class EliteApi {

	private baseUri:string = "https://elite-schedule-app-i3-37c3e.firebaseio.com";

  constructor(
	  public http: Http
	) {
	// console.log('Hello EliteApiProvider Provider');
  }

  getTournaments(){
	  return new Promise( resolve => {
		  this.http.get(`${this.baseUri}/tournaments.json`)
				.subscribe( rsp => resolve( rsp.json() ) );
	  });
  }

}
