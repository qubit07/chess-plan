import { Injectable } from '@angular/core';
import { Game } from '../entity/game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	private gameUrl = 'http://localhost:8080/api/games';
	private roundUrl = 'http://localhost:8080/api/rounds';

	headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private httpClient: HttpClient) { }


	getGameById(id: number): Observable<Game> {
		const gameDetailsUrl = `${this.gameUrl}/${id}`;
		return this.httpClient.get<Game>(gameDetailsUrl);
	}

	getGamesByRoundId(id: number): Observable<Game[]> {
		const gameOfRoundsUrl = `${this.roundUrl}/${id}/games`;
		return this.httpClient.get<Game[]>(gameOfRoundsUrl);
	}
}
