import { Address } from './address';
import { Round } from './round';
import { Player } from './player';

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
	players: Player[] = [];
	rounds: Round[] = [];
}
