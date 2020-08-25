import { Injectable } from '@angular/core';
import { Round } from '../entity/round';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../entity/game';

@Injectable({
	providedIn: 'root'
})
export class RoundService {

	private roundUrl = 'http://localhost:8080/chessplan/api/rounds';

	headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private httpClient: HttpClient) { }

	getRoundById(id: number): Observable<Round> {
		const roundDetailsUrl = `${this.roundUrl}/${id}`;
		return this.httpClient.get<Round>(roundDetailsUrl);
	}

	createGames(id: number): Observable<Game[]> {
		const roundGamesUrl = `${this.roundUrl}/${id}/games`;
		return this.httpClient.post<Game[]>(
			roundGamesUrl,
			'',
			{ headers: this.headers }
		);
	}
}
