import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/entity/game';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-game-details',
	templateUrl: './game-details.component.html',
	styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

	game: Game = new Game();

	constructor(private gameService: GameService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.getGameById();
	}

	getGameById() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.gameService.getGameById(id).subscribe((data) => {
			this.game = data;
		});
	}


}
