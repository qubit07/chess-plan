import { Injectable } from '@angular/core';
import { Round } from '../entity/round';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

	private roundUrl = 'http://localhost:8080/api/rounds';

	headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

	constructor(private httpClient: HttpClient) { }


	getRoundById(id: number): Observable<Round> {
		const roundDetailsUrl = `${this.roundUrl}/${id}`;
		return this.httpClient.get<Round>(roundDetailsUrl);
	}
}
