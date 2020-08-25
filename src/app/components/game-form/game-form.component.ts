import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { Game } from 'src/app/entity/game';
import { Tournament } from 'src/app/entity/tournament';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-game-form',
	templateUrl: './game-form.component.html',
	styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

	tournament = new Tournament();
	game: Game = new Game();

	scorePattern: string = '^(1|0(\\.[5]+)?)-(1|0(\\.[5]+)?)$';

	gameFormGroup = new FormGroup({
		id: new FormControl(),
		boardNumber: new FormControl(),
		score: new FormControl([Validators.required,
		Validators.pattern(this.scorePattern),]),
		whitePlayer: new FormGroup({
			id: new FormControl(),
		}),
		blackPlayer: new FormGroup({
			id: new FormControl(),
		}),
		round: new FormControl()
	});


	constructor(private gameService: GameService, private tournamentService: TournamentService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		this.getGameById();
	}

	getGameById() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.gameService.getGameById(id).subscribe((data) => {
			this.game = data;
			this.getTournamentByRoundId(this.game.round.id);
			this.initFormValues();
		});
	}

	getTournamentByRoundId(id: number) {
		this.tournamentService.searchTournamentByRoundId(id).subscribe((data) => {
			this.tournament = data;
		});
	}

	onSubmit() {
		this.gameService.createGame(this.gameFormGroup.value).subscribe(
			(data) => {
				this.game = data;
				this.router.navigate(['/games', this.game.id]);
			}
		);
	}

	initFormValues() {
		this.gameFormGroup.get('id').setValue(this.game.id);
		this.gameFormGroup.get('whitePlayer.id').setValue(this.game.whitePlayer.id);
		this.gameFormGroup.get('blackPlayer.id').setValue(this.game.blackPlayer.id);
		this.gameFormGroup.get('round').setValue(this.game.round);
		this.gameFormGroup.get('score').setValue(this.game.score);
		this.gameFormGroup.get('boardNumber').setValue(this.game.boardNumber);
	}

	get score() { return this.gameFormGroup.get('score'); }
}
