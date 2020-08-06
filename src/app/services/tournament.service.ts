import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tournament } from '../entity/tournament';
import { Round } from '../entity/round';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TournamentService {

	private tournamentUrl = 'http://localhost:8080/api/tournaments';

	headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private httpClient: HttpClient) { }


	getTournamentList(): Observable<Tournament[]> {
		return this.httpClient.get<Tournament[]>(this.tournamentUrl);
	}

	createTournament(tournament: Tournament): Observable<Tournament> {
		return this.httpClient.post<Tournament>(
			this.tournamentUrl,
			JSON.stringify(tournament),
			{ headers: this.headers }
		);
	}

	getTournamentById(id: number): Observable<Tournament> {
		const tournamentDetailsUrl = `${this.tournamentUrl}/${id}`;
		return this.httpClient.get<Tournament>(tournamentDetailsUrl);
	}
	
	getRoundById(id: number): Observable<Round[]> {
		const roundUrl = `${this.tournamentUrl}/${id}/rounds`;
		return this.httpClient.get<Round[]>(roundUrl);
	}

	deleteTournament(id: number): Observable<Tournament> {
		const tournamentDetailsUrl = `${this.tournamentUrl}/${id}`;
		return this.httpClient.delete<Tournament>(tournamentDetailsUrl);
	}

}

