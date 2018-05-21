import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserSettings {

  constructor(public http: HttpClient) {
    console.log('Hello UserSettings Provider');
  }

}
