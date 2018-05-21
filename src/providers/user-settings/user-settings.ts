import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class UserSettings {

  constructor(private storage: Storage) {
    console.log('Hello UserSettings Provider');
  }

	favoriteTeam( team, tourId, tourName ){
		let item = { team, tourId, tourName }
		this.storage.set( team.id.toString(), JSON.stringify(item) );
	}
	unfavoriteTeam( team ){
	  this.storage.remove( team.id.toString() );
	}

	isFavoriteTeam( teamId: string ): Promise<boolean>{
		return this.storage.get( teamId ).then( t => t ? true: false );
	}


}
