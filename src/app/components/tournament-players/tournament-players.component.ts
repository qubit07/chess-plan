import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/entity/player';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tournament } from 'src/app/entity/tournament';

@Component({
	selector: 'app-tournament-players',
	templateUrl: './tournament-players.component.html',
	styleUrls: ['./tournament-players.component.css']
})
export class TournamentPlayersComponent implements OnInit {

	showMsg: boolean = false;
	errorMsg: boolean = false;
	msg: string;


	tournament: Tournament = new Tournament();
	participants: number = 0;
	players: Player[] = [];
	searchMode: boolean = false;

	constructor(private tournamentService: TournamentService, private playerService: PlayerService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.getTournamentDetails();
		this.route.paramMap.subscribe(() => {
			this.listPlayers();
		});
	}

	getTournamentDetails() {
		const id: number = +this.route.snapshot.paramMap.get('id');

		this.tournamentService.getTournamentById(id).subscribe(
			(data) => {
				this.tournament = data;
				this.participants = data.participants;
			}
		);
	}

	listPlayers() {
		this.searchMode = this.route.snapshot.paramMap.has('keyword')
		if (this.searchMode) {
			this.handleSearchPlayers();
		}
		else {
			this.handleListPlayers();
		}
	}

	handleListPlayers() {
		const id = +this.route.snapshot.paramMap.get('id')
		this.playerService.getPlayersByTournament(id).subscribe((data) => {
			this.players = data;
		});
	}

	handleSearchPlayers() {
		const keyword = this.route.snapshot.paramMap.get('keyword')
		this.playerService.searchPlayersByName(keyword).subscribe((data) => {
			this.players = data;
		});
	}

	addPlayerToTournament(player: Player) {
		const id = +this.route.snapshot.paramMap.get('id')
		const currentPlayer = new Player();
		currentPlayer.id = player.id;
		currentPlayer.name = player.name;

		this.tournamentService.addPlayerToTournament(id, currentPlayer).subscribe(
			(data) => {
				this.showMsg = true;
				this.errorMsg = false;
				this.msg = "SUCCESS! Add: " + data.name;
				this.participants++;
			},
			error => {
				this.showMsg = false;
				this.errorMsg = true;
				this.msg = "Error! " + error.error.message;
			});
	}

	removePlayerFromTournament(player: Player) {
		const id = +this.route.snapshot.paramMap.get('id')
		const currentPlayer = new Player();
		currentPlayer.id = player.id;
		currentPlayer.name = player.name;

		this.tournamentService.removePlayerFromTournament(id, currentPlayer).subscribe(
			(data) => {
				this.showMsg = true;
				this.errorMsg = false;
				this.msg = "SUCCESS! Remove: " + data.name;
				this.participants--;
			},
			error => {
				this.showMsg = false;
				this.errorMsg = true;
				this.msg = "Error! " + error.error.message;
			});
	}

	search(value: string) {
		const id = +this.route.snapshot.paramMap.get('id')
		this.router.navigateByUrl(`/tournaments/${id}/players/search/${value}`);
	}

}
