import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/entity/game';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { Tournament } from 'src/app/entity/tournament';

@Component({
	selector: 'app-game-details',
	templateUrl: './game-details.component.html',
	styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

	tournament: Tournament = new Tournament();
	game: Game = new Game();

	constructor(private gameService: GameService, private tournamentService: TournamentService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.getGameById();
	}

	getGameById() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.gameService.getGameById(id).subscribe((data) => {
			this.game = data;
			this.getTournamentByRoundId(this.game.round.id);
		});
	}

	getTournamentByRoundId(id: number) {
		this.tournamentService.searchTournamentByRoundId(id).subscribe((data) => {
			this.tournament = data;
		});
	}


}
