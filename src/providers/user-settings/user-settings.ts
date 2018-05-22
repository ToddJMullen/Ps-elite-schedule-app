import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class UserSettings {

  constructor(private storage: Storage) {
    console.log('Hello UserSettings Provider');
  }

	favoriteTeam( team, tourId, tourName ){
		let fav = { team, tourId, tourName }
		console.log("favoriteTeam() saving:", fav );
		this.storage.set( team.id.toString(), JSON.stringify(fav) );
	}

	unfavoriteTeam( team ){
	  this.storage.remove( team.id.toString() );
	}

	isFavoriteTeam( teamId: string ): Promise<boolean>{
		return this.storage.get( teamId ).then( t => t ? true: false );
	}

	getAllFavorites(){
		let favAry = [];
		this.storage.forEach( team => {
			favAry.push( JSON.parse(team) );
		});
		return favAry;
	}

}
