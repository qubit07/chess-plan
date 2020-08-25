import { Injectable } from '@angular/core';
import { Game } from '../entity/game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	private gamesUrl = 'http://localhost:8080/chessplan/api/games';
	private roundUrl = 'http://localhost:8080/chessplan/api/rounds';

	headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private httpClient: HttpClient) { }


	getGames(): Observable<Game[]> {
		return this.httpClient.get<Game[]>(this.gamesUrl);
	}

	getGameById(id: number): Observable<Game> {
		const gameDetailsUrl = `${this.gamesUrl}/${id}`;
		return this.httpClient.get<Game>(gameDetailsUrl);
	}

	getGamesByRoundId(id: number): Observable<Game[]> {
		const gameOfRoundsUrl = `${this.roundUrl}/${id}/games`;
		return this.httpClient.get<Game[]>(gameOfRoundsUrl);
	}

	createGame(game: Game): Observable<Game> {
		return this.httpClient.post<Game>(
			this.gamesUrl,
			JSON.stringify(game),
			{ headers: this.headers }
		);
	}
}
