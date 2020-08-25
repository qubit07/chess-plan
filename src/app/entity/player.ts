import { Rating } from './rating';
import { Team } from './team';
import { Tournament } from './tournament';

export class Player {

	id: number;
	name: string;
	rating: Rating = new Rating();
	teamName: string;
	tournaments: Tournament[] = [];


	constructor() {
	}
}
