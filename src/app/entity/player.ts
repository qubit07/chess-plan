import { Rating } from './rating';
import { Team } from './team';
import { Tournament } from './tournament';

export class Player {

	id: number;
	firstName: string;
	lastName: string;
	rating: Rating;
	teamName: string;
	tournaments: Tournament[] = [];

	constructor() {
	}
}
