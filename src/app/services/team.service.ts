import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../entity/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamUrl = 'http://localhost:8080/api/teams';

  constructor(private httpClient: HttpClient) { }

  getTeamList(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.teamUrl);
  }

  getTeamById(id: number): Observable<Team> {
    const teamDetailsUrl = `${this.teamUrl}/${id}`;
    return this.httpClient.get<Team>(teamDetailsUrl);
  }

  getTeamByPlayerId(id: number): Observable<Team> {
    const playerTeamUrl = `${this.teamUrl}/${id}/teams`;
    return this.httpClient.get<Team>(playerTeamUrl);
  }
}
