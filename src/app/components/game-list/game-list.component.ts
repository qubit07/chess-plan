import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Game } from 'src/app/entity/game';
import { Round } from 'src/app/entity/round';
import { Tournament } from 'src/app/entity/tournament';
import { GameService } from 'src/app/services/game.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { RoundService } from 'src/app/services/round.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
	selector: 'app-game-list',
	templateUrl: './game-list.component.html',
	styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

	tournament: Tournament = new Tournament();
	round: Round = new Round();

	games: Game[] = []

	constructor(private tournamentService: TournamentService, private roundService: RoundService, private gameService: GameService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.getTournamentDetails();
		this.getRoundDetails();
		this.getGames();
	}


	getTournamentDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');

		this.tournamentService.getTournamentById(id).subscribe(
			(data) => {
				this.tournament = data;
			}
		);
	}

	getRoundDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');

		this.roundService.getRoundById(id).subscribe(
			(data) => {
				this.round = data;
			}
		);
	}

	getGames() {
		const id: number = +this.route.snapshot.paramMap.get('id');
		this.gameService.getGamesByRoundId(id).subscribe(this.getGameResult());
	}

	getGameResult() {
		return (data) => {
			this.games = data._embedded.games;
			this.games.sort((a, b) => {
				return a.boardNumber - b.boardNumber;
			});
		}
	}

	@ViewChild('tableTitle', { static: false }) content: ElementRef;
	public savePdf(): void {
		var doc = new jsPDF('p', 'pt');

		let content = this.content.nativeElement;
		let _elementHandlers =
		{
			'#editor': function(element, renderer) {
				return true;
			}
		};
		doc.fromHTML(content.innerHTML, 0, 0, {

			'width': 200,
			'elementHandlers': _elementHandlers
		});
		doc.autoTable({ html: '#gameTable' })

		doc.save('table.pdf');
	}

}
