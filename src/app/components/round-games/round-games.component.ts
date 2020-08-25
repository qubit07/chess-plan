import { Component, OnInit} from '@angular/core';
import { Game } from 'src/app/entity/game';
import { Round } from 'src/app/entity/round';
import { Tournament } from 'src/app/entity/tournament';
import { GameService } from 'src/app/services/game.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { RoundService } from 'src/app/services/round.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-round-games',
  templateUrl: './round-games.component.html',
  styleUrls: ['./round-games.component.css']
})
export class RoundGamesComponent implements OnInit {

  	tournament: Tournament = new Tournament();
	round: Round = new Round();

	games: Game[] = []

	constructor(private tournamentService: TournamentService, private roundService: RoundService, private gameService: GameService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.getRoundDetails();
		this.getGames();
	}

	getTournamentByRoundId(id: number) {
		this.tournamentService.searchTournamentByRoundId(id).subscribe((data) => {
			this.tournament = data;
		});
	}

	getRoundDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');

		this.roundService.getRoundById(id).subscribe(
			(data) => {
				this.round = data;
				this.getTournamentByRoundId(this.round.id);
			}
		);
	}

	getGames() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.gameService.getGamesByRoundId(id).subscribe((data) => {
			this.games = data;
			this.games.sort((a, b) => a.boardNumber - b.boardNumber)
		});
	}

	createGames() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.roundService.createGames(id).subscribe(() => {
			this.getGames();
		});
	}
}
