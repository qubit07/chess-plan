import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/entity/team';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/entity/player';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  team: Team = new Team();
  players: Player[] = [];

  constructor(private teamService: TeamService, private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeamDetails();
    this.getPlayersByTeamId();
  }

  getTeamDetails() {
    const teamId: number = +this.route.snapshot.paramMap.get('id');

    this.teamService.getTeamById(teamId).subscribe(
      data => {
        this.team = data;
      }
    );
  }

  getPlayersByTeamId() {
    const teamId: number = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayersByTeamId(teamId).subscribe(this.getResult());
  }

  getResult() {
    return (data) => {
      this.players = data._embedded.players;
    }
  }

}
