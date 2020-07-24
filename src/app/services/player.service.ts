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

	private playerUrl = 'http://localhost:8080/api/players';

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
		const playerTeamUrl = `${this.playerUrl}/search/findByTournaments_Id?id=${id}`;
		return this.httpClient.get<Player[]>(playerTeamUrl);
	}

	deletePlayer(id: number): Observable<Player> {
		const playerDetailUrl = `${this.playerUrl}/${id}`;
		return this.httpClient.delete<Player>(playerDetailUrl);
	}

}
