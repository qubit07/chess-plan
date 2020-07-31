import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/entity/tournament';
import { TournamentService } from 'src/app/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/entity/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
	selector: 'app-tournament-player-list',
	templateUrl: './tournament-player-list.component.html',
	styleUrls: ['./tournament-player-list.component.css']
})
export class TournamentPlayerListComponent implements OnInit {

	tournament: Tournament = new Tournament();
	players: Player[] = [];
	tournamentPlayers: Player[] = [];

	constructor(private tournamentService: TournamentService, private route: ActivatedRoute, private playerService: PlayerService) { }

	ngOnInit() {
		this.getTournament();
		this.listPlayers();
		this.getPlayersByTournamentId();
	}

	getTournament() {
		const tournamentId: number = +this.route.snapshot.paramMap.get('id');

		this.tournamentService.getTournamentById(tournamentId).subscribe(
			data => {
				this.tournament = data;
			}
		);
	}

	getPlayersByTournamentId() {
		const tournamentId: number = +this.route.snapshot.paramMap.get('id');
		this.playerService.getPlayersByTournament(tournamentId).subscribe(this.getTournamentPlayerResult());
	}

	listPlayers() {
		this.playerService.getPlayerList().subscribe(this.getPlayerResult());
	}

	getPlayerResult() {
		return (data) => {
			this.players = data._embedded.players;
		}
	}

	getTournamentPlayerResult() {
		return (data) => {
			this.tournamentPlayers = data._embedded.players;
		}
	}

	hasPlayerJoinedTournament(player: Player) {
		let numberContains = 0;
		this.tournamentPlayers.forEach(e => {
			if (e.id == player.id) {
				numberContains++;
			}
		});
		return numberContains;
	}
}
