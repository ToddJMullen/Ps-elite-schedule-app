import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

@Injectable()
export class SqlStorage {

	private db:SQLiteObject;

  constructor(
	  private sqlite: SQLite
	  ,private toast: ToastController
  ) {

  }


	getAll(){
		return this.db.executeSql("SELECT key, value FROM kv", []).then( data =>{
			let results = []
			,l = data.rows.length
			;
			for( let i = 0; i < l; i++ ){
				return results.push(
					 JSON.parse(data.rows.item(i).value)
				)
			}
			return results;
		});
	}

	get( key: string ){
		return this.db.executeSql("SELECT key, value FROM kv WHERE key = ? LIMIT 1", [key])
		.then( data => {
			if( data.rows.legnth > 0 ){
				return JSON.parse(data.rows.item(0).value);
			}
		})
		.catch( err => {
			let msg = `There was a problem getting "${key}": ${err}`;
			this.pop(msg);
		});
	}

	set( key:string, val:string ){
		return this.db.executeSql("INSERT OR REPLACE INTO kv(key, value) VALUES (?,?)", [key,val] )
		.then( data => {
			if( data.rows.length > 0 ){
				return JSON.parse( data.rows.item(0).value );
			}
		})
		.catch( err => {
			let msg = `There was a problem saving: ${err}`;
			this.pop(msg);
		});
	}

	remove( key:string){
		return this.db.executeSql("DELETE FROM kv WHERE key = ?", [key] );
	}


  	/**
	 * Only needs to be called once at application startup.
	 * Must be called AFTER device ready is fired.
	 */
	initializeDb(){
		this.pop("initializeDb()...")
		return this.sqlite.create({
			name: "ps-elite.db"
			, location: "default"
		})
		.then( (db: SQLiteObject) => {
			this.db = db;
			db.executeSql("CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)",[])
			.then( data => {
				let msg = `After created table / check: ${JSON.stringify(data)}`;
				console.log( msg, data );
				this.pop(msg);
			})
			.catch( err => {
				let msg = `Failed to execute CREATE Table in SQLite DB: ${JSON.stringify(err)}`;
				console.error( msg, err );
				this.pop(msg);
			})
		})
		.catch( err => {
			let msg = `Failed to initialize SQLite DB File: ${JSON.stringify(err)}`
			this.pop(msg);
			console.error( msg, err );
		});
	}

	pop( msg, duration = 0, position = "bottom" ){
		let t = this.toast.create({
			message: `SqlStorage ${msg}`, duration, position
			,showCloseButton: true
		});
		t.present();
	  }


}
