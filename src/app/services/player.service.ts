import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../entity/player';
import { Observable } from 'rxjs';
import { Team } from '../entity/team';

@Injectable({
	providedIn: 'root'
})
export class PlayerService {

	constructor(private httpClient: HttpClient) { }

	private playerUrl = 'http://localhost:8080/chessplan/api/players';

	getPlayerList(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.playerUrl);
	}

	getPlayerById(id: number): Observable<Player> {
		const playerDetailsUrl = `${this.playerUrl}/${id}`;
		return this.httpClient.get<Player>(playerDetailsUrl);
	}

	getTeamByPlayerId(id: number): Observable<Team> {
		const playerTeamUrl = `${this.playerUrl}/${id}/team`;
		return this.httpClient.get<Team>(playerTeamUrl);
	}

	getPlayersByTeamId(id: number): Observable<Player[]> {
		const playerTeamUrl = `${this.playerUrl}/search/findByTeamId?id=${id}`;
		return this.httpClient.get<Player[]>(playerTeamUrl);
	}

	getPlayersByTournament(id: number): Observable<Player[]> {
		const playerTournamentUrl = `${this.playerUrl}/search/findByTournamentId?id=${id}`;
		return this.httpClient.get<Player[]>(playerTournamentUrl);
	}

	searchPlayersByName(name: string): Observable<Player[]> {
		const playerNameUrl = `${this.playerUrl}/search/findByNameContaining?name=${name}`;
		return this.httpClient.get<Player[]>(playerNameUrl);
	}

	deletePlayer(id: number): Observable<Player> {
		const playerDetailUrl = `${this.playerUrl}/${id}`;
		return this.httpClient.delete<Player>(playerDetailUrl);
	}
}
