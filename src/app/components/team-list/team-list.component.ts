import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/entity/team';
import { TeamService } from 'src/app/services/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-team-list',
	templateUrl: './team-list.component.html',
	styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

	teams: Team[] = []

	searchMode: boolean = false;

	constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.route.paramMap.subscribe(() => {
			this.listTeams();
		});
	}

	listTeams() {
		this.searchMode = this.route.snapshot.paramMap.has('keyword')
		if (this.searchMode) {
			this.handleSearchTeams();
		}
		else {
			this.handleListTeams();
		}
	}

	handleListTeams() {
		this.teamService.getTeamList().subscribe((data) => {
			this.teams = data;
		});
	}

	handleSearchTeams() {
		const keyword = this.route.snapshot.paramMap.get('keyword')
		this.teamService.searchTeamsByName(keyword).subscribe((data) => {
			this.teams = data;
		});
	}

	search(value: string) {
		this.router.navigateByUrl(`/teams/search/${value}`);
	}

}
