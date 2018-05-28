import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { SqlStorage } from '../sql-storage/sql-storage';
import { ToastController } from 'ionic-angular';

const win:any = window;

@Injectable()
export class UserSettings {

	private sqlMode:boolean = false;

  constructor(
	  private storage: Storage
	  ,private sql:SqlStorage
	  ,private toast: ToastController
	) {
    if( win.sqlitePlugin ){
		console.log("Found sqlite plugin:", win.sqlitePlugin );
		this.sqlMode = true;
		// this.pop("UserSettings() SQL Storage Enabled");
	}
	else {
		this.pop(`SQLite Plugin Not Available\nFallback to Ionic Storage`);
	}
  }

  pop( msg, duration = 0, position = "bottom" ){
	let t = this.toast.create({
		message: `UserSettings ${msg}`, duration, position
		,showCloseButton: true
	});
	t.present();
  }

	favoriteTeam( team, tourId, tourName ){
		let fav = { team, tourId, tourName }
		console.log("favoriteTeam() saving:", fav );
		if( this.sqlMode ){
			this.sql.set( team.id.toString(), JSON.stringify(fav));
		}
		else {
			this.storage.set( team.id.toString(), JSON.stringify(fav) );
		}
	}

	unfavoriteTeam( team ){
		if( this.sqlMode ){
			this.sql.remove( team.id.toString() );
		}
		else {
			this.storage.remove( team.id.toString() );
	  }
	}

	isFavoriteTeam( teamId: string ): Promise<boolean>{
		if( this.sqlMode ){
			return this.sql.get( teamId ).then( t => t ? true : false );
		}
		else {
			return new Promise( resolve => resolve(
				 this.storage.get( teamId ).then( t => t ? true: false )
			));
		}
	}

	getAllFavorites():Promise<any>{


		if( this.sqlMode ){
			return this.sql.getAll()
		}
		else {
			return new Promise( resolve => {
				let favAry = [];
				this.storage.forEach( team => {
					favAry.push( JSON.parse(team) );
				});
				return resolve(favAry);
			})
		}
	}

	initStorage():Promise<any>{
		this.pop(`initStorage()`);
		if( this.sqlMode ){
			this.pop(`initStorage() in SQL Mode `);
			return this.sql.initializeDb();
		}
		else {
			this.pop(`initStorage() in non-SQL Mode `);
			return new Promise( resolve => resolve() );
		}
	}

}
