import { Address } from './address';

export class Tournament {
	id: number;
	name: string;
	type: string;
	system: string;
	numberOfPlayers: number;
	startDate: number;
	endDate: number;
	address: Address = new Address();
	participants: number;
}
