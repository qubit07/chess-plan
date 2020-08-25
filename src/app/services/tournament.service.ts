import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tournament } from '../entity/tournament';
import { Round } from '../entity/round';
import { Player } from '../entity/player';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TournamentService {

	private tournamentUrl = 'http://localhost:8080/chessplan/api/tournaments';

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

	addPlayerToTournament(id: number, player: Player): Observable<Player> {
		const tournamentPlayersUrl = `${this.tournamentUrl}/${id}/players`;
		return this.httpClient.post<Player>(
			tournamentPlayersUrl,
			JSON.stringify(player),
			{ headers: this.headers }
		);
	}

	removePlayerFromTournament(id: number, player: Player) {
		const tournamentPlayersUrl = `${this.tournamentUrl}/${id}/players`;
		const options = {
			headers: this.headers,
			body: JSON.stringify(player),
		}
		return this.httpClient.delete<Player>(
			tournamentPlayersUrl,
			options
		);
	}

	addRoundToTournament(id: number, round: Round): Observable<Round> {
		const tournamentRoundsUrl = `${this.tournamentUrl}/${id}/rounds`;
		return this.httpClient.post<Round>(
			tournamentRoundsUrl,
			JSON.stringify(round),
			{ headers: this.headers }
		);
	}

	searchTournamentByRoundId(id: number): Observable<Tournament> {
		const tournamentDetailsUrl = `${this.tournamentUrl}/search/findByRoundId?id=${id}`;
		return this.httpClient.get<Tournament>(tournamentDetailsUrl);
	}
}

