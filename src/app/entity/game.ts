import { Player } from './player';
import { Round } from './round';

export class Game {
	id: number;
	score: string;
	boardNumber: number;
	whitePlayer: Player = new Player();
	blackPlayer: Player = new Player();
	round: Round = new Round();
}
