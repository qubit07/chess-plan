import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/entity/player';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
	selector: 'app-player-list',
	templateUrl: './player-list.component.html',
	styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

	players: Player[] = [];

	searchMode: boolean = false;

	constructor(private playerService: PlayerService, private router: ActivatedRoute, private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.paramMap.subscribe(() =>{
			this.listPlayers();
		});
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
		this.playerService.getPlayerList().subscribe(this.getResult());
	}

	handleSearchPlayers() {
		const keyword = this.route.snapshot.paramMap.get('keyword')
		this.playerService.searchPlayersByName(keyword).subscribe(this.getResult());
	}


	getResult() {
		return (data) => {
			this.players = data._embedded.players;
		}
	}
}
