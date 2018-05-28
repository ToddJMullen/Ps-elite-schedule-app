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
		});
	}

	set( key:string, val:string ){
		return this.db.executeSql("INSERT OR REPLACE INTO kv(key, value) VALUES (?,?)", [key,val] )
		.then( data => {
			if( data.rows.length > 0 ){
				return JSON.parse( data.rows.item(0).value );
			}
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
		return this.sqlite.create({name: "ps-elite.db", location: "default"})
			.then( db => {
				this.db = db;
				return this.db.executeSql("CREATE TABLE IF NOT EXISTS kv (key text primary key, value text",[])
					.then( data => {
						let msg = `After created table / check:\n${data}`
						,t
						console.log( msg, data );
						t = this.toast.create({
							message: msg, duration: 3000, position: "bottom"
						});
						t.present();
					})
					.catch( err => {
						let msg = "Failed to initialize SQLite DB:\n" + err
						,t;
						console.error( msg, err );
						t = this.toast.create({
							message: msg, duration: 3000, position: "bottom"
						});
						t.present();
					})
			})
			.catch( err => {
				let msg = "Failed to initialize SQLite DB:\n" + err
				console.error( msg, err );
			});
	}


}
