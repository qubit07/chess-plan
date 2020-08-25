import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/entity/game';
import { GameService } from 'src/app/services/game.service';

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

	games: Game[] = []

	constructor(private gameService: GameService) { }

	ngOnInit() {
		this.getGames();
	}

	getGames() {
		this.gameService.getGames().subscribe((data) => {
			this.games = data;
		});
	}
}
