import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EliteApi {

	private baseUri:string = "https://elite-schedule-app-i3-37c3e.firebaseio.com";

  constructor(public http: HttpClient) {
	// console.log('Hello EliteApiProvider Provider');


  }

}
