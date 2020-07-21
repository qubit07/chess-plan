import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/entity/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teams: Team[] = []

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.listTeams();
  }

  listTeams() {
    return this.teamService.getTeamList().subscribe(this.getResult());
  }

   getResult() {
    return (data) => {
      this.teams = data._embedded.teams;
    }
  }

}
